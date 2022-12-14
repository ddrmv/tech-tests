class Transaction {
  constructor(initialBalance, type, amount) {
    this.#validateConstructorParameters(type, amount);
    this.type = type;
    this.amount = amount;
    this.datetime = new Date();
    const balanceChange = type === "credit" ? amount : -amount;
    this.resultingBalance = initialBalance + balanceChange;
  }

  getType() {
    return this.type;
  }

  getAmount() {
    return this.amount;
  }

  getResultingBalance() {
    return this.resultingBalance;
  }

  getDate() {
    return this.datetime;
  }

  #validateConstructorParameters(type, amount) {
    if (type != "credit" && type != "debit") {
      throw new Error("Type should be 'debit' or 'credit'");
    }

    if (!Number.isInteger(amount)) {
      throw new Error("Amount should be an integer");
    }

    if (amount <= 0) {
      throw new Error("Amount should be positive");
    }
  }
}

module.exports = Transaction;
