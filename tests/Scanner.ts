import { Token } from "./Token";
import { TokenType } from "./TokenType";
import { isAlpha, isAlphaNumeric, isDigit, isUppercaseAlpha } from "./Utils";

const keywords = new Map<string, TokenType>([
  ["allow", TokenType.RULE_ALLOW],
  ["deny", TokenType.RULE_DENY],
]);

export class Scanner {
  private readonly tokens: Token[] = [];

  private line = 1;
  private start = 0;
  private current = 0;

  constructor(private readonly source: string) {}

  private isAtEnd() {
    return this.current >= this.source.length;
  }

  scan() {
    while (!this.isAtEnd()) {
      this.start = this.current;
      this.scanToken();
    }
    this.tokens.push(new Token(TokenType.EOF, "", this.line));
    return this.tokens;
  }

  private scanToken() {
    const c = this.advance();
    switch (c) {
      case "#":
        // A comment goes until the end of the line.
        while (this.peek() != "\n" && !this.isAtEnd()) this.advance();
        break;
      case " ":
      case "\r":
      case "\t":
        // Ignore whitespace.
        break;
      case "\n":
        this.line++;
        break;
      case "{":
        this.addToken(TokenType.OPEN_BRAKET);
        break;
      case "}":
        this.addToken(TokenType.CLOSE_BRAKET);
        break;
      case "(":
        this.addToken(TokenType.OPEN_PARENTHESIS);
        break;
      case ")":
        this.addToken(TokenType.CLOSE_PARENTHESIS);
        break;
      case "[":
        this.addToken(TokenType.ATTRIBUTE_OPEN_BRACKET);
        break;
      case "]":
        this.addToken(TokenType.ATTRIBUTE_CLOSE_BRACKET);
        break;
      case "=":
        this.addToken(TokenType.EQUAL);
        break;
      case ",":
        this.addToken(TokenType.COMMA);
        break;
      case ":":
        if (this.match(":")) {
          this.classModifier();
        }
        break;
      case ".":
        this.class();
        break;
      default:
        if (isAlphaNumeric(c)) {
          this.identifier();
        } else {
          throw new Error("ERROR!");
        }
    }
  }

  private identifier() {
    while (isAlphaNumeric(this.peek())) this.advance();
    const text = this.source.substring(this.start, this.current);

    let type = keywords.get(text);
    if (type === undefined) {
      type = TokenType.IDENTIFIER;
    }
    this.addToken(type);
  }
  private class() {
    while (isAlpha(this.peek())) this.advance();
    this.addToken(
      TokenType.CLASS,
      this.source.substring(this.start + 1, this.current)
    );
  }
  private classModifier() {
    while (isAlpha(this.peek())) this.advance();
    this.addToken(
      TokenType.CLASS_MODIFIER,
      this.source.substring(this.start + 2, this.current)
    );
  }

  private addToken<T>(type: TokenType, lexeme?: string) {
    this.tokens.push(
      new Token(
        type,
        lexeme ?? this.source.substring(this.start, this.current),
        this.line
      )
    );
  }

  private match(expected: string): boolean {
    if (this.isAtEnd()) return false;
    if (this.source.charAt(this.current) != expected) return false;

    this.current++;
    return true;
  }
  private peek(): string {
    if (this.isAtEnd()) return "\0";
    return this.source.charAt(this.current);
  }
  private advance(): string {
    this.current++;
    return this.source.charAt(this.current - 1);
  }
}
