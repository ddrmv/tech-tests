const Transaction = require("./transaction");

class BankAccount {
  constructor() {
    this.balance = 0;
    this.entries = [];
  }

  getEntries() {
    return this.entries;
  }

  getBalance() {
    return this.balance;
  }

  credit(amount) {
    const newEntry = new Transaction(this.balance, "credit", amount);
    this.entries.push(newEntry);
    this.balance += amount;
  }

  debit(amount) {
    const newEntry = new Transaction(this.balance, "debit", amount);
    this.entries.push(newEntry);
    this.balance -= amount;
  }
}

module.exports = BankAccount;
