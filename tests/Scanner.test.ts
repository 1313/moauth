import { Scanner } from "./Scanner";
import { Token } from "./Token";
import { TokenType } from "./TokenType";

describe("Scanner", () => {
  it("should exist", () => {
    expect(Scanner).toBeDefined();
  });
  it("should take a stream object as first param", () => {
    expect(new Scanner("")).toBeDefined();
  });

  it("should throw on invalid input", () => {
    expect(() => new Scanner("A$f@R!").scan()).toThrow();
    expect(() => new Scanner("A$@c!").scan()).toThrow();
  });

  describe("#scan", () => {
    it("should exist", () => {
      expect(new Scanner("test")).toBeDefined();
    });

    it("should ignore comments", () => {
      const scanner = new Scanner("# Comment");
      const [EOFToken] = scanner.scan();
      expect(EOFToken.type).toBe(TokenType.EOF);
    });
    it("should scan Role", () => {
      const source = `
      Admin {
        
      }`;
      const scanner = new Scanner(source);
      const tokens = scanner.scan();

      assertAdminTokens(tokens);
    });
    it("should scan class-literal", () => {
      const source = `
        .classTest {

        }
      `;
      const scanner = new Scanner(source);
      const tokens = scanner.scan();
      assertClassName(tokens);
    });
    it("should scan class modifier", () => {
      const source = `
        ::specialModifier {

        }
      `;
      const scanner = new Scanner(source);
      const tokens = scanner.scan();
      assertClassModifier(tokens);
    });

    it("should scan attributes", () => {
      const source = `
        [a=2] {

        }
      `;
      const scanner = new Scanner(source);
      const tokens = scanner.scan();
      assertAttribute(tokens);
    });

    describe("rules", () => {
      it("should scan allow rule", () => {
        const source = `
          allow(read, write)
        `;
        const scanner = new Scanner(source);
        const [
          ALLOW,
          OPEN_PARENTHESIS,
          READ,
          COMMA,
          WRITE,
          CLOSE_PARENTHESIS,
        ] = scanner.scan();

        assertToken(ALLOW, "allow", TokenType.RULE_ALLOW);
        assertToken(OPEN_PARENTHESIS, "(", TokenType.OPEN_PARENTHESIS);
        assertToken(READ, "read", TokenType.IDENTIFIER);
        assertToken(COMMA, ",", TokenType.COMMA);
        assertToken(WRITE, "write", TokenType.IDENTIFIER);
        assertToken(CLOSE_PARENTHESIS, ")", TokenType.CLOSE_PARENTHESIS);
      });
      it("should scan deny rule", () => {
        const source = `
          deny(read, write)
        `;
        const scanner = new Scanner(source);
        const [
          DENY,
          OPEN_PARENTHESIS,
          READ,
          COMMA,
          WRITE,
          CLOSE_PARENTHESIS,
        ] = scanner.scan();

        assertToken(DENY, "deny", TokenType.RULE_DENY);
        assertToken(OPEN_PARENTHESIS, "(", TokenType.OPEN_PARENTHESIS);
        assertToken(READ, "read", TokenType.IDENTIFIER);
        assertToken(COMMA, ",", TokenType.COMMA);
        assertToken(WRITE, "write", TokenType.IDENTIFIER);
        assertToken(CLOSE_PARENTHESIS, ")", TokenType.CLOSE_PARENTHESIS);
      });
    });
  });
  describe("full spec", () => {
    it("should not throw", () => {
      const source = `
          Admin {
            .journal-entry {
              allow(read, write)
              deny(write)
            }
            .journal-entry[id=30] {
              deny(write)
            }
          }
          Nurse {
            .journal-entry::owns .entry {
              deny(read, write)
            }
            
          }
        `;
      const scanner = new Scanner(source);
      const tokens = scanner.scan();

      expect(tokens.map((token) => token.lexeme).join("")).toBe(
        source.replace(/[\s\.:]+/g, "")
      );
    });
  });
});

function assertAttribute([
  ATTRIBUTE_OPEN_BRACKET,
  IDENTIFIER,
  EQUAL,
  ID,
  ATTRIBUTE_CLOSE_BRACKET,
  CLASS_OPEN_BRACKET,
  CLASS_CLOSE_BRACKET,
]: Token[]) {
  assertToken(ATTRIBUTE_OPEN_BRACKET, "[", TokenType.ATTRIBUTE_OPEN_BRACKET);
  assertToken(IDENTIFIER, "a", TokenType.IDENTIFIER);
  assertToken(EQUAL, "=", TokenType.EQUAL);
  assertToken(ID, "2", TokenType.IDENTIFIER);
  assertToken(ATTRIBUTE_CLOSE_BRACKET, "]", TokenType.ATTRIBUTE_CLOSE_BRACKET);
  assertToken(CLASS_OPEN_BRACKET, "{", TokenType.OPEN_BRAKET);
  assertToken(CLASS_CLOSE_BRACKET, "}", TokenType.CLOSE_BRAKET);
}

function assertClassModifier([
  CLASS_MODIFIER,
  CLASS_OPEN_BRACKET,
  CLASS_CLOSE_BRACKET,
]: Token[]) {
  assertToken(CLASS_MODIFIER, "specialModifier", TokenType.CLASS_MODIFIER);
  assertToken(CLASS_OPEN_BRACKET, "{", TokenType.OPEN_BRAKET);
  assertToken(CLASS_CLOSE_BRACKET, "}", TokenType.CLOSE_BRAKET);
}

function assertClassName([
  CLASS_LITERAL,
  CLASS_OPEN_BRACKET,
  CLASS_CLOSE_BRACKET,
  EOF,
]: Token[]) {
  assertToken(CLASS_LITERAL, "classTest", TokenType.CLASS);
  assertToken(CLASS_OPEN_BRACKET, "{", TokenType.OPEN_BRAKET);
  assertToken(CLASS_CLOSE_BRACKET, "}", TokenType.CLOSE_BRAKET);
  expect(EOF.type).toBe(TokenType.EOF);
}

function assertAdminTokens([
  IDENTIFIER,
  OPEN_BRACKET,
  CLOSE_BRACKET,
  EOF,
]: Token[]) {
  assertToken(IDENTIFIER, "Admin", TokenType.IDENTIFIER);
  assertToken(OPEN_BRACKET, "{", TokenType.OPEN_BRAKET);
  assertToken(CLOSE_BRACKET, "}", TokenType.CLOSE_BRAKET);
  expect(EOF.type).toBe(TokenType.EOF);
}

function assertToken(token: Token, lexeme: string, type: TokenType) {
  expect(token.type).toBe(type);
  expect(token.lexeme).toBe(lexeme);
}
