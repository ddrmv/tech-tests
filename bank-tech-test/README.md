# Specification

### Requirements

- You should be able to interact with your code via a REPL like IRB or Node.
  (You don't need to implement a CLI that takes input from STDIN.)
- Deposits, withdrawal.
- Account statement (date, amount, balance) printing.
- Data can be kept in memory (it doesn't need to be stored to a database, etc).

### Acceptance criteria

**Given** a client makes a deposit of 1000 on 10-01-2023
**And** a deposit of 2000 on 13-01-2023
**And** a withdrawal of 500 on 14-01-2023
**When** she prints her bank statement
**Then** she would see

```
date || credit || debit || balance
14/01/2023 || || 500.00 || 2500.00
13/01/2023 || 2000.00 || || 3000.00
10/01/2023 || 1000.00 || || 1000.00
```

# Solution

## Installation

- To run the project, you need node installed
- Download or git clone the repository

```bash
cd bank-tech-test

npm install

# to run tests
npx run jest
```

- There are only classes provided, no interface, as per the specs.
  Output can be read in the tests

## Design

### Initial design

Goals:

- Goals are to create uncoupled classes with appropriate levels of abstraction
- Separate view from content
- Have good naming and structure
- TDD everything
- Match the acceptance criteria output exactly

Design steps:

- The transaction is the most basic class that contains an amount. The amount
  is always positive, whether it's a withdrawal or deposit is identified with
  markers. The time of the transaction is recorded as well.
- The account needs to have a current value. A history that keeps track of the
  account balance after each transaction keeps track of the full state over time. This was a difficult design decision as it introduces some duplication of state between the current balance value and the state of the account in the latest history. I made the decision to include the account balance with each transaction mainly for two reasons:
  1. Keeping track of the actual state of the account at each transaction to avoid mismatch between transaction and balance at the time, in case a transaction before it is modified for any reason
  2. It would provide a history of the state of the account at each transaction which can be referenced without the need for recalculating the account history
- A formatter that creates a bank statement string works on a class to convert
  the entry history into a formatted text string.

## TDD classes

Testing started from the smallest class, Transaction, and build from that. A
suggested better approach should be starting from the integration test and
working from there.

![Excalidraw chart](https://i.imgur.com/V8TloHA.png)

## Use of the classes with output

The output matches the specs for acceptance (running in node):

![Output](https://i.imgur.com/w3dkrxz.png)
