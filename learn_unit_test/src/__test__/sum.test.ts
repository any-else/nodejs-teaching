/// <reference types="jest" />
import { sum } from "../sum";

describe("sum function", () => {
  it("should add two numbers", () => {
    expect(sum(1, 2)).toBe(3);
  });
})