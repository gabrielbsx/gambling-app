import { BadRequestException } from "@/shared/application/http/errors.js";
import type { Validator } from "@/shared/presentation/contracts/validator.js";
import { z, type ZodType } from "zod";

export class ZodValidator<TSchema extends ZodType>
  implements Validator<z.infer<TSchema>>
{
  constructor(protected readonly schema: TSchema) {}

  async validate(input: unknown): Promise<z.infer<TSchema>> {
    const result = await this.schema.safeParseAsync(input);

    if (!result.success) {
      const message = result.error.issues
        .map((e) =>
          e.path.length ? `${e.path.join(".")}: ${e.message}` : e.message
        )
        .join("; ");
      throw new BadRequestException(message);
    }

    return result.data;
  }
}
