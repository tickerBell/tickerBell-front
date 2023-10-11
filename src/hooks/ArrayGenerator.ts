export function ArrayGenerator(start: number, end: number, prefix?: string) {
  return Array.from({ length: end - start + 1 }, (_, index) => `${prefix}${start + index}`);
}
