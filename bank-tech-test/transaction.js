class Transaction {
  constructor(type, amount) {
    if (!Number.isInteger(amount)) {
      throw "Amount has to be integer";
    }
    if (amount <= 0) {
      throw "Amount has to be positive";
    }
    this.amount = amount;

    if (type != "debit" && type != "credit") {
      throw "Type has to be either 'debit' or 'credit'";
    }
    this.debit = type === "debit" ? true : false;
    this.credit = type === "credit" ? true : false;

    this.timeCreated = new Date();
  }

  isDebit() {
    return this.debit;
  }

  isCredit() {
    return this.credit;
  }

  getAmount() {
    return this.amount;
  }

  getTimeCreated() {
    return this.timeCreated;
  }
}

module.exports = Transaction;
