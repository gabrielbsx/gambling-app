import type { CreateUserInput } from "@/modules/identity/domain/usecases/createUserUseCase.js";
import type { CreateUserValidator } from "@/modules/identity/presentation/contracts/validators/createUserValidator.js";
import { ZodValidator } from "@/shared/infrastructure/validators/zod/zodValidator.js";
import { z, ZodType } from "zod";

export class ZodCreateUserValidator
  extends ZodValidator<typeof ZodCreateUserValidator.schema>
  implements CreateUserValidator
{
  static schema: ZodType<CreateUserInput> = z
    .object({
      name: z.string().min(1, "Name is required"),
      username: z.string().min(1, "Username is required"),
      email: z.email("Invalid email address"),
      password: z
        .string()
        .min(6, "Password must be at least 6 characters long"),
      passwordConfirmation: z
        .string()
        .min(6, "Password confirmation must be at least 6 characters long"),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "Passwords do not match",
      path: ["passwordConfirmation"],
    });

  constructor() {
    super(ZodCreateUserValidator.schema);
  }
}
