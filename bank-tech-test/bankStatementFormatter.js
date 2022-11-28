class BankStatementFormatter {
  constructor(account) {
    this.account = account;
  }

  formatBankStatement() {
    let statement = "";

    for (let row = this.account.getEntries().length - 1; row >= 0; row--) {
      const entry = this.account.getEntries()[row];
      statement += this.#formatRow(entry);
      // if it's the last row, skip; otherwise add newline at the end
      row == 0 ? {} : (statement += "\n");
    }

    return `date || credit || debit || balance\n${statement}`;
  }

  #formatRow = (entry) => {
    const datePart = this.#formatDate(entry.getDate());
    const amountString = this.#formatAmount(entry.getAmount());
    const amountPart = this.#formatAmountPart(entry, amountString);
    const balance = entry.getResultingBalance();
    const balancePart = this.#formatAmount(balance);

    return `${datePart}${amountPart}${balancePart}`;
  };

  #formatAmountPart = (entry, amountString) => {
    return entry.getType() === "credit"
      ? ` || ${amountString} || || `
      : ` || || ${amountString} || `;
  };

  #formatDate = (date) => {
    const dayOfMonthString = this.#ensureTwoDigitString(date.getDate());
    const monthString = this.#ensureTwoDigitString(date.getMonth() + 1);

    return `${dayOfMonthString}/${monthString}/${date.getFullYear()}`;
  };

  #formatAmount = (amount) => {
    const string = amount.toString();
    const length = string.length;
    const stringWithDot =
      string.slice(0, length - 2) + "." + string.slice(length - 2, length);

    return stringWithDot;
  };

  #ensureTwoDigitString = (number) => {
    return number < 10 ? `0${number}` : number;
  };
}

module.exports = BankStatementFormatter;
