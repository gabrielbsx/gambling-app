import type { UseCase } from "@/shared/domain/usecases/usecase.js";

export type CreateProductInput = Readonly<{
  name: string;
  description: string;
  value: number;
  amount: number;
}>;

export type CreateProductOutput = Readonly<{
  id: string;
}>;

export interface CreateProductUseCase
  extends UseCase<CreateProductInput, CreateProductOutput> {}
