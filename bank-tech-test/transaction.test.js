const Transaction = require("./transaction");

describe("Transaction", () => {
  it("creates a debit", () => {
    const type = "debit";
    const amount = 10; // 0.10 of the currency
    const transaction = new Transaction(type, amount);
    expect(transaction.isDebit()).toEqual(true);
    expect(transaction.getAmount()).toBe(10);
    expect(transaction.getTimeCreated()).toBeDefined();
  });

  it("creates a credit", () => {
    const transaction = new Transaction("credit", 10);
    expect(transaction.isCredit()).toEqual(true);
    expect(transaction.getAmount()).toBe(10);
    expect(transaction.getTimeCreated()).toBeDefined();
  });

  it("raises an error when passing invalid transaction type", () => {
    expect(() => {
      new Transaction("foo", 10);
    }).toThrow("Type has to be either 'debit' or 'credit'");
  });

  it("raises an error when passing non-number", () => {
    expect(() => {
      new Transaction("credit", "1000");
    }).toThrow("Amount has to be integer");
  });

  it("raises an error when passing a negative number", () => {
    expect(() => {
      new Transaction("credit", -5);
    }).toThrow("Amount has to be positive");
  });

  it("raises an error when passing a zero", () => {
    expect(() => {
      new Transaction("credit", 0);
    }).toThrow("Amount has to be positive");
  });
});
