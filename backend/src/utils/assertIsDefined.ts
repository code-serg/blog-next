// Typescript assert function to check if a value is defined
export default function assertIsDefined<T>(value: T): asserts value is NonNullable<T> {
  if (!value) {
    throw new Error(`Expected 'value' to be defined, but received ${value}`);
  }
}
