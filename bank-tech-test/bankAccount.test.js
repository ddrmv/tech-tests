const BankAccountEntry = require("./bankAccountEntry");
const BankAccount = require("./bankAccount");

jest.mock("./bankAccountEntry");

afterEach(() => {
  BankAccountEntry.mockClear();
});

describe("BankAccount", () => {
  it("creates account", () => {
    const account = new BankAccount();
    expect(account.getEntries()).toEqual([]);
    expect(account.getBalance()).toEqual(0);
  });

  it("credits the account and updates entries", () => {
    const account = new BankAccount();
    expect(account.getEntries()).toEqual([]);
    expect(account.getBalance()).toEqual(0);

    BankAccountEntry.mockImplementation(() => {
      return {
        getType: () => "credit",
        getAmount: () => 200,
        getResultingBalance: () => 0 + 200,
        getDate: () => new Date(2022, 0, 1),
      };
    });

    account.credit(200);
    expect(account.getBalance()).toEqual(200);
    expect(account.getEntries().length).toEqual(1);
    expect(account.getEntries()[0].getType()).toEqual("credit");
    expect(account.getEntries()[0].getAmount()).toEqual(200);
    expect(account.getEntries()[0].getResultingBalance()).toEqual(200);
    expect(account.getEntries()[0].getDate()).toEqual(new Date(2022, 0, 1));
  });

  it("keeps track of multiple credits", () => {
    const account = new BankAccount();
    expect(account.getEntries()).toEqual([]);
    expect(account.getBalance()).toEqual(0);

    BankAccountEntry.mockImplementationOnce(() => {
      return {
        getType: () => "credit",
        getAmount: () => 200,
        getResultingBalance: () => 0 + 200,
        getDate: () => new Date(2022, 0, 1),
      };
    });

    BankAccountEntry.mockImplementationOnce(() => {
      return {
        getType: () => "credit",
        getAmount: () => 100,
        getResultingBalance: () => 200 + 100,
        getDate: () => new Date(2022, 0, 2),
      };
    });

    account.credit(200);
    account.credit(100);
    expect(account.getBalance()).toEqual(300);
    expect(account.getEntries().length).toEqual(2);
    expect(account.getEntries()[1].getType()).toEqual("credit");
    expect(account.getEntries()[1].getAmount()).toEqual(100);
    expect(account.getEntries()[1].getResultingBalance()).toEqual(300);
    expect(account.getEntries()[1].getDate()).toEqual(new Date(2022, 0, 2));
  });

  it("credits and debits the account", () => {
    const account = new BankAccount();
    expect(account.getEntries()).toEqual([]);
    expect(account.getBalance()).toEqual(0);

    BankAccountEntry.mockImplementationOnce(() => {
      return {
        getType: () => "credit",
        getAmount: () => 200,
        getResultingBalance: () => 0 + 200,
        getDate: () => new Date(2022, 0, 1),
      };
    });

    BankAccountEntry.mockImplementationOnce(() => {
      return {
        getType: () => "debit",
        getAmount: () => 50,
        getResultingBalance: () => 200 - 50,
        getDate: () => new Date(2022, 0, 2),
      };
    });

    account.credit(200);
    account.debit(50);
    expect(account.getBalance()).toEqual(150);
    expect(account.getEntries().length).toEqual(2);
    expect(account.getEntries()[1].getType()).toEqual("debit");
    expect(account.getEntries()[1].getAmount()).toEqual(50);
    expect(account.getEntries()[1].getResultingBalance()).toEqual(150);
    expect(account.getEntries()[1].getDate()).toEqual(new Date(2022, 0, 2));
  });
});
