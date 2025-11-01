export interface Validator<TOutput = unknown> {
  validate(input: unknown): Promise<TOutput>;
}
