import { TokenType } from "./TokenType";

export class Token {
  constructor(
    public type: TokenType,
    public lexeme: string,
    public line: number
  ) {}
}
