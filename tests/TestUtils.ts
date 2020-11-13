import { Readable, PassThrough } from "stream";

export function streamFromString(data: string): Readable {
  var bufferStream = new PassThrough();
  bufferStream.end(Buffer.from(data));
  return bufferStream;
}
