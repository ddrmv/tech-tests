const BankAccount = require("../bankAccount");

describe("integration of account, account entry, transaction", () => {
  it("credits, debits, keeps balance and entry history", () => {
    const account = new BankAccount();
    account.credit(200);
    account.credit(200);
    account.debit(50);
    expect(account.getBalance()).toBe(350);
    expect(account.getEntries().length).toBe(3);
  });
});
