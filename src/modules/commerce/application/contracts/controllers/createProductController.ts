import type { Controller } from "@/shared/application/contracts/controller.js";
import type { CreateProductOutput } from "../usecases/createProductUseCase.js";

export interface CreateProductController
  extends Controller<CreateProductOutput> {}
