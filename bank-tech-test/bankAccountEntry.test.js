const Transaction = require("./transaction");
const BankAccountEntry = require("./bankAccountEntry");

jest.mock("./transaction");

afterEach(() => {
  Transaction.mockClear();
});

describe("BankAccountEntry", () => {
  it("raises error if amount is a string", () => {
    expect(() => {
      new BankAccountEntry(0, "debit", "5");
    }).toThrow("Error: Amount should be an integer");
  });

  it("raises error if amount is a float", () => {
    expect(() => {
      new BankAccountEntry(0, "debit", 5.5);
    }).toThrow("Error: Amount should be an integer");
  });

  it("raises error if amount is negative", () => {
    expect(() => {
      new BankAccountEntry(0, "debit", -10);
    }).toThrow("Error: Amount should be positive");
  });

  it("raises error if amount is zero", () => {
    expect(() => {
      new BankAccountEntry(0, "debit", 0);
    }).toThrow("Error: Amount should be positive");
  });

  it("raises error if type is not 'credit' or 'debit'", () => {
    expect(() => {
      new BankAccountEntry(0, "invalid value", 10);
    }).toThrow("Error: Type should be 'debit' or 'credit'");
  });

  it("creates a credit account entry", () => {
    const initialBalance = 1000;
    const type = "credit";
    const amount = 200;

    Transaction.mockImplementation(() => {
      return {
        isDebit: () => false,
        isCredit: () => true,
        getAmount: () => 200,
      };
    });

    entry = new BankAccountEntry(initialBalance, type, amount);
    expect(entry.getType()).toEqual("credit");
    expect(entry.getAmount()).toEqual(200);
    expect(entry.getResultingBalance()).toEqual(1200);
  });

  it("creates a debit account entry", () => {
    const initialBalance = 1000;
    const type = "debit";
    const amount = 200;

    Transaction.mockImplementation(() => {
      return {
        isDebit: () => true,
        isCredit: () => false,
        getAmount: () => 200,
        getTimeCreated: () => new Date(2022, 0, 1),
      };
    });

    entry = new BankAccountEntry(initialBalance, type, amount);
    expect(entry.getType()).toEqual("debit");
    expect(entry.getAmount()).toEqual(200);
    expect(entry.getResultingBalance()).toEqual(800);
    expect(entry.getDate()).toEqual(new Date(2022, 0, 1));
  });
});
