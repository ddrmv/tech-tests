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

  it("throws an error when receiving invalid transaction type", () => {
    expect(() => {
      new Transaction("foo", 10);
    }).toThrow("Type has to be either 'debit' or 'credit'");
  });

  it("throws an error when receiving non-number", () => {
    expect(() => {
      new Transaction("credit", "1000");
    }).toThrow("Amount has to be integer");
  });

  it("throws an error when receiving a float", () => {
    expect(() => {
      new Transaction("credit", 5.5);
    }).toThrow("Amount has to be integer");
  });

  it("throws an error when receiving a negative number", () => {
    expect(() => {
      new Transaction("credit", -5);
    }).toThrow("Amount has to be positive");
  });

  it("throws an error when receiving a zero", () => {
    expect(() => {
      new Transaction("credit", 0);
    }).toThrow("Amount has to be positive");
  });
});
