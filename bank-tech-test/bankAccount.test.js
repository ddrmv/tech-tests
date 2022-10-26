const Transaction = require("./transaction");
const BankAccount = require("./bankAccount");

jest.mock("./transaction");

afterEach(() => {
  Transaction.mockClear();
});

describe("BankAccount", () => {
  it("creates account", () => {
    const account = new BankAccount();
    expect(account.getEntries()).toEqual([]);
    expect(account.getBalance()).toEqual(0);
  });

  it("credits the account and updates entries", () => {
    const account = new BankAccount();
    const mockTransaction = {
      getType: () => "credit",
      getAmount: () => 200,
      getResultingBalance: () => 0 + 200,
      getDate: () => new Date(2022, 0, 1),
    };
    Transaction.mockImplementationOnce(() => {
      return mockTransaction;
    });

    account.credit(200);
    expect(account.getBalance()).toEqual(200);
    expect(account.getEntries().length).toEqual(1);
    expect(account.getEntries()[0]).toEqual(mockTransaction);
  });

  it("keeps track of multiple credits", () => {
    const account = new BankAccount();
    expect(account.getEntries()).toEqual([]);
    expect(account.getBalance()).toEqual(0);

    const mockTransaction1 = {
      // is this actually needed, or should I do as in the next test?
      getType: () => "credit",
      getAmount: () => 200,
      getResultingBalance: () => 0 + 200,
      getDate: () => new Date(2022, 0, 1),
    };

    const mockTransaction2 = {
      getType: () => "credit",
      getAmount: () => 100,
      getResultingBalance: () => 200 + 100,
      getDate: () => new Date(2022, 0, 2),
    };

    Transaction.mockImplementationOnce(() => {
      return mockTransaction1;
    }).mockImplementationOnce(() => {
      return mockTransaction2;
    });

    account.credit(200);
    account.credit(100);
    expect(account.getBalance()).toEqual(300);
    expect(account.getEntries().length).toEqual(2);
    expect(account.getEntries()[1]).toEqual(mockTransaction2);
  });

  it("credits and debits the account", () => {
    const account = new BankAccount();
    expect(account.getEntries()).toEqual([]);
    expect(account.getBalance()).toEqual(0);

    const mockCredit = {
      // skipping any internal functionality as it's unimportant to bankAccount
      notRelevant: "notRelevant",
    };

    const mockDebit = {
      notRelevant: "notRelevant",
    };

    Transaction.mockImplementationOnce(() => {
      return mockCredit;
    }).mockImplementationOnce(() => {
      return mockDebit;
    });

    account.credit(200);
    account.debit(50);
    expect(account.getBalance()).toEqual(150);
    expect(account.getEntries().length).toEqual(2);
    expect(account.getEntries()[0]).toEqual(mockCredit);
    expect(account.getEntries()[1]).toEqual(mockDebit);
  });
});
