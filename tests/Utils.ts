export function isAlpha(input: string): boolean {
  return !!/^[a-zA-Z\-]+$/.exec(input);
}

export function isUppercaseAlpha(input: string): boolean {
  return !!/^[A-Z\-]+$/.exec(input);
}

export function isDigit(input: string): boolean {
  return !!/^[0-9]+$/.exec(input);
}

export function isAlphaNumeric(input: string): boolean {
  return !!/^[a-zA-Z0-9]+$/.exec(input);
}
