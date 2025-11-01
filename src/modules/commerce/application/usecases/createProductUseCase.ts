import { Product } from "../../domain/entities/product.js";
import type { ProductRepository } from "../../domain/repositories/productRepository.js";
import type {
  CreateProductInput,
  CreateProductOutput,
  CreateProductUseCase,
} from "../../domain/usecases/createProductUseCase.js";

export class CreateProductUseCaseImpl implements CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: CreateProductInput): Promise<CreateProductOutput> {
    const productId = await this.productRepository.generateId();

    const product = new Product({
      id: productId,
      ...input,
      createdBy: "system",
      createdAt: new Date(),
    });

    await this.productRepository.save(product);

    return { ...product.props };
  }
}
