import { isAlpha, isDigit, isUppercaseAlpha } from "./Utils";

describe("Utils", () => {
  describe("isDigit", () => {
    it("should exist", () => {
      expect(isDigit).toBeDefined();
    });
    it("should return true if numeric string", () => {
      expect(isDigit("2323")).toBeTruthy();
      expect(isDigit("123")).toBeTruthy();
      expect(isDigit("123234")).toBeTruthy();
    });
    it("should return false if empty string", () => {
      expect(isDigit("")).toBeFalsy();
    });
    it("should return false if alphanumeric", () => {
      expect(isDigit("a")).toBeFalsy();
      expect(isDigit("123a")).toBeFalsy();
      expect(isDigit("123a")).toBeFalsy();
      expect(isDigit("1233a.aef.aewrga")).toBeFalsy();
    });
  });
  describe("isUpperCaseAlpha", () => {
    it("should exist", () => {
      expect(isUppercaseAlpha).toBeDefined();
    });
    it("should return true if uppercase alpha string", () => {
      expect(isUppercaseAlpha("ABCD")).toBeTruthy();
      expect(isUppercaseAlpha("ASDFADSF")).toBeTruthy();
      expect(isUppercaseAlpha("AERGRAGR")).toBeTruthy();
    });
    it("should return false if empty string", () => {
      expect(isUppercaseAlpha("")).toBeFalsy();
    });
    it("should return false if lowercase alpha", () => {
      expect(isUppercaseAlpha("aaasda")).toBeFalsy();
      expect(isUppercaseAlpha("awefaewg")).toBeFalsy();
      expect(isUppercaseAlpha("awega")).toBeFalsy();
      expect(isUppercaseAlpha("aweg")).toBeFalsy();
      expect(isUppercaseAlpha("aweg")).toBeFalsy();
    });
    it("should return false if numeric", () => {
      expect(isUppercaseAlpha("1234")).toBeFalsy();
      expect(isUppercaseAlpha("123")).toBeFalsy();
      expect(isUppercaseAlpha("ASDAS23")).toBeFalsy();
      expect(isUppercaseAlpha("123123")).toBeFalsy();
      expect(isUppercaseAlpha("234f")).toBeFalsy();
    });
  });
  describe("isAlpha", () => {
    it("should exist", () => {
      expect(isAlpha).toBeDefined();
    });
    it("should return false if numeric string", () => {
      expect(isAlpha("2")).toBeFalsy();
      expect(isAlpha("234ad")).toBeFalsy();
      expect(isAlpha("3434")).toBeFalsy();
    });
    it("should return false if empty string", () => {
      expect(isAlpha("")).toBeFalsy();
    });
    it("should return true if alphanumeric", () => {
      expect(isAlpha("a")).toBeTruthy();
      expect(isAlpha("aaewe")).toBeTruthy();
    });
  });
});
