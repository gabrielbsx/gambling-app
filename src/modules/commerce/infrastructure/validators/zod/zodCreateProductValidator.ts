import type { CreateProductInput } from "@/modules/commerce/domain/usecases/createProductUseCase.js";
import type { CreateProductValidator } from "@/modules/commerce/presentation/contracts/validators/createProductValidator.js";
import { ZodValidator } from "@/shared/infrastructure/validators/zod/zodValidator.js";
import z, { ZodType } from "zod";

export class ZodCreateProductValidator
  extends ZodValidator<typeof ZodCreateProductValidator.schema>
  implements CreateProductValidator
{
  static schema: ZodType<CreateProductInput> = z.object({
    name: z.string(),
    amount: z.number().positive(),
    value: z.number().positive(),
    description: z.string(),
  });

  constructor() {
    super(ZodCreateProductValidator.schema);
  }
}
