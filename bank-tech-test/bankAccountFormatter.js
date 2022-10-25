class BankAccountFormatter {
  constructor(account) {
    this.account = account;
  }

  formatBankAccount() {
    let statement = "";

    for (let i = this.account.getEntries().length - 1; i >= 0; i--) {
      const entry = this.account.getEntries()[i];
      statement += `${this.formatDate(entry.getDate())}`;
      if (entry.getType() === "credit") {
        statement += ` || ${this.formatAmount(entry.getAmount())} || || `;
      } else {
        statement += ` || || ${this.formatAmount(entry.getAmount())} || `;
      }
      statement += `${this.formatAmount(entry.getResultingBalance())}\n`;
    }

    return `date || credit || debit || balance\n${statement.slice(0, -1)}`;
  }

  formatDate = (date) => {
    const dateNumber = date.getDate();
    const dateString = dateNumber < 10 ? `0${dateNumber}` : dateNumber;
    const monthNumber = date.getMonth() + 1;
    const monthString = monthNumber < 10 ? `0${monthNumber}` : monthNumber;

    return `${dateString}/${monthString}/${date.getFullYear()}`;
  };

  formatAmount = (amount) => {
    const string = amount.toString();
    const length = string.length;
    const stringWithDot =
      string.slice(0, length - 2) + "." + string.slice(length - 2, length);

    return stringWithDot;
  };
}

module.exports = BankAccountFormatter;
