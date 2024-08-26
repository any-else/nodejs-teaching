/// <reference types="jest" />
import { returnTransferString, toUpCase } from "../toUpCase";

describe("toUpCase function", () => {
  it("should convert string to uppercase", () => {
    // nguyên tắc 3 A 
    /**
     * A1: Arrange => thiet lap nhung du lieu can thiet
     * 
     * A: Act => thuc hien viec can thiet 
     *  
     * A: Assert => kiem tra ket qua
     */
    const str = "hello";
    const mockFnToUpCase = toUpCase
    const expected = "HELLO";

    // act 
    const result = mockFnToUpCase(str);

    // assert
    expect(result).toBe(expected);
  });

  it.only("should return info for invalid input", () => {
    const mockFnInfoString = returnTransferString
    const str = "Hello-World"

    const result = mockFnInfoString(str)

    expect(result.lowerCase).toBe('hello-world')
    expect(result.upperCase).toBe('HELLO-WORLD')  

    expect(result.character.length).toBe(11)
    expect(result.character).toEqual(['H', 'e', 'l', 'l', 'o', '-', 'W', 'o', 'r', 'l', 'd'])
    expect(result.character).toContain<string>('H')

    expect(result.extraInfo).toEqual({})

  })
})

describe.only("Example param toUpCase string", () => {
  it.each([{
    input: 'hello',
    expected: "HELLO"
  }, {
    input: 'world',
    expected: "WORLD"
    }])("should return $expected when input is $input", ({ input, expected }) => { 
      const mockFnToUpCase = toUpCase
      expect(mockFnToUpCase(input)).toBe(expected)
    })
})  