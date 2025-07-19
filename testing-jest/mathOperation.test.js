import { mathOperation } from "./dummyFolder/fortesting";

describe("Test suite: mathOperation(n) = n² + 5", () => {
  // ✅ Correct test cases
  it("Works with 0", () => {
    expect(mathOperation(0)).toBe(5);
  });

  it("Works with 1", () => {
    expect(mathOperation(1)).toBe(6);
  });

  it("Works with 2", () => {
    expect(mathOperation(2)).toBe(9);
  });

  it("Works with 3", () => {
    expect(mathOperation(3)).toBe(14);
  });

  it("Works with 4", () => {
    expect(mathOperation(4)).toBe(21);
  });

  it("Works with 5", () => {
    expect(mathOperation(5)).toBe(30);
  });

  it("Works with 6", () => {
    expect(mathOperation(6)).toBe(41);
  });

  it("Works with 10", () => {
    expect(mathOperation(10)).toBe(105);
  });

  it("Works with -2", () => {
    expect(mathOperation(-2)).toBe(9);
  });

  it("Works with -5", () => {
    expect(mathOperation(-5)).toBe(30);
  });

  it("Works with 7", () => {
    expect(mathOperation(7)).toBe(54);
  });

  it("Works with 8", () => {
    expect(mathOperation(8)).toBe(69);
  });

  // ❌ Failing test cases (intentional)
  it("Fails with 9 (wrong expected value)", () => {
    expect(mathOperation(9)).toBe(100); // Actually 86
  });

  it("Fails with 11 (wrong expected value)", () => {
    expect(mathOperation(11)).toBe(110); // Actually 126
  });

  it("Fails with -3 (wrong expected value)", () => {
    expect(mathOperation(-3)).toBe(0); // Actually 14
  });

  it("Fails with 1 (wrong expected value again)", () => {
    expect(mathOperation(1)).toBe(16); // Actually 6
  });
});
