const BankAccountEntry = require("./bankAccountEntry");

const testMockDate = (className, instance) => {
  let mockDate = jest
    .spyOn(className.prototype, "getDate")
    .mockImplementationOnce(() => new Date(2022, 0, 1));

  expect(instance.getDate()).toEqual(new Date(2022, 0, 1));

  mockDate.mockRestore();
};

describe("BankAccountEntry", () => {
  it("throws an error if amount is a string", () => {
    expect(() => {
      new BankAccountEntry(0, "debit", "5");
    }).toThrow("Amount should be an integer");
  });

  it("throws an error if amount is a float", () => {
    expect(() => {
      new BankAccountEntry(0, "debit", 5.5);
    }).toThrow("Amount should be an integer");
  });

  it("throws an error if amount is negative", () => {
    expect(() => {
      new BankAccountEntry(0, "debit", -10);
    }).toThrow("Amount should be positive");
  });

  it("throws an error if amount is zero", () => {
    expect(() => {
      new BankAccountEntry(0, "debit", 0);
    }).toThrow("Amount should be positive");
  });

  it("throws an error if type is not 'credit' or 'debit'", () => {
    expect(() => {
      new BankAccountEntry(0, "invalid value", 10);
    }).toThrow("Type should be 'debit' or 'credit'");
  });

  it("creates a credit account entry", () => {
    const initialBalance = 1000;
    const type = "credit";
    const amount = 200;
    entry = new BankAccountEntry(initialBalance, type, amount);

    expect(entry.getType()).toEqual("credit");
    expect(entry.getAmount()).toEqual(200);
    expect(entry.getResultingBalance()).toEqual(1200);
    expect(entry.getDate()).toBeDefined();
    testMockDate(BankAccountEntry, entry);
  });

  it("creates a debit account entry", () => {
    const initialBalance = 1000;
    const type = "debit";
    const amount = 200;
    entry = new BankAccountEntry(initialBalance, type, amount);

    expect(entry.getType()).toEqual("debit");
    expect(entry.getAmount()).toEqual(200);
    expect(entry.getResultingBalance()).toEqual(800);
    expect(entry.getDate()).toBeDefined();
    testMockDate(BankAccountEntry, entry);
  });
});
