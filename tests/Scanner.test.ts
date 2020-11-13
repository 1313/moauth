import { Readable } from "stream";
import { streamFromString } from "./TestUtils";
import { Scanner } from "./Scanner";
import { Token } from "./Token";

describe("Scanner", () => {
  it("should exist", () => {
    expect(Scanner).toBeDefined();
  });
  it("should take a stream object as first param", () => {
    expect(new Scanner(new Readable())).toBeDefined();
  });

  describe("#read", () => {
    it("should exist", () => {
      expect(new Scanner(new Readable()).read).toBeDefined();
    });
    it("should return Tokens", async () => {
      const scanner = new Scanner(streamFromString("DATA"));
      const [token] = await scanner.read();
      expect(token).toBeInstanceOf(Token);
    });
  });
});
