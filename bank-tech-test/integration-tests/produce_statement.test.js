const BankAccount = require("../bankAccount");
const BankAccountEntry = require("../bankAccountEntry");
const BankAccountFormatter = require("../bankAccountFormatter");

describe("BankAccountFormatter", () => {
  it("produces bank account statement", () => {
    const account = new BankAccount();
    account.credit(1000_00); // on 09/01/2023
    account.credit(2000_00); // on 13/01/2023
    account.debit(500_00); // on 14/12/2023

    let mockDate = jest
      .spyOn(BankAccountEntry.prototype, "getDate")
      .mockImplementationOnce(() => new Date(2023, 11, 14))
      .mockImplementationOnce(() => new Date(2023, 0, 13))
      .mockImplementationOnce(() => new Date(2023, 0, 9));

    const bankAccountFormatter = new BankAccountFormatter(account);
    expect(bankAccountFormatter.formatBankAccount()).toEqual(
      "date || credit || debit || balance\n" +
        "14/12/2023 || || 500.00 || 2500.00\n" +
        "13/01/2023 || 2000.00 || || 3000.00\n" +
        "09/01/2023 || 1000.00 || || 1000.00"
    );

    mockDate.mockRestore();
  });
});
