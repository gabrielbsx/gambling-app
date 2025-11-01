import type { Validator } from "@/shared/presentation/contracts/validator.js";
import type {
  CreateProductInput
} from "../usecases/createProductUseCase.js";

export interface CreateProductValidator extends Validator<CreateProductInput> {}
