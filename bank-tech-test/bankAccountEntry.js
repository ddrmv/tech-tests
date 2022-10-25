const Transaction = require("./transaction");

class BankAccountEntry {
  constructor(initialBalance, type, amount) {
    if (type != "credit" && type != "debit") {
      throw "Error: Type should be 'debit' or 'credit'";
    }
    if (!Number.isInteger(amount)) {
      throw "Error: Amount should be an integer";
    }
    if (amount <= 0) {
      throw "Error: Amount should be positive";
    }
    this.transaction = new Transaction(type, amount);
    if (type === "credit") {
      this.resultingBalance = initialBalance + amount;
    }
    if (type === "debit") {
      this.resultingBalance = initialBalance - amount;
    }
  }

  getType() {
    if (this.transaction.isDebit()) {
      return "debit";
    }
    if (this.transaction.isCredit()) {
      console.log(
        "THE ABOVE LINE ACTUALLY RUNS IN THE TEST",
        "BUT APPEARS AS YELLOW IN COVERAGE REPORT"
      );
      return "credit";
    }
  }

  getAmount() {
    return this.transaction.getAmount();
  }

  getResultingBalance() {
    return this.resultingBalance;
  }

  getDate() {
    return this.transaction.getTimeCreated();
  }
}

module.exports = BankAccountEntry;
