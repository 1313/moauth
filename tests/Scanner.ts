import { Readable } from "stream";
import { Token } from "./Token";

export class Scanner {
  constructor(private stream: Readable) {}
  async read() {
    return [new Token()];
  }
}
