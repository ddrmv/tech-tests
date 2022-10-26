const BankAccount = require("./bankAccount");
const BankStatementFormatter = require("./bankStatementFormatter");

jest.mock("./bankAccount");

afterEach(() => {
  BankAccount.mockClear();
});

describe("BankStatementFormatter", () => {
  it("returns statement with 0 rows for an empty account", () => {
    BankAccount.mockImplementationOnce(() => {
      return {
        getBalance: () => 0,
        getEntries: () => [],
      };
    });
    const account = new BankAccount();
    const formatter = new BankStatementFormatter(account);

    expect(formatter.formatBankStatement()).toEqual(
      "date || credit || debit || balance\n"
    );
  });

  it("returns a formatted statement with credit and debit", () => {
    BankAccount.mockImplementationOnce(() => {
      return {
        getBalance: () => 0,
        getEntries: () => [
          {
            getType: () => "credit",
            getAmount: () => 1000_00,
            getDate: () => new Date(2023, 0, 9),
            getResultingBalance: () => 1000_00,
          },
          {
            getType: () => "debit",
            getAmount: () => 1500_00,
            getDate: () => new Date(2023, 0, 10),
            getResultingBalance: () => -500_00,
          },
        ],
      };
    });
    const account = new BankAccount();
    const formatter = new BankStatementFormatter(account);

    expect(formatter.formatBankStatement()).toEqual(
      "date || credit || debit || balance\n" +
        "10/01/2023 || || 1500.00 || -500.00\n" +
        "09/01/2023 || 1000.00 || || 1000.00"
    );
  });
});
