import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  /**
   * Fetch all appointments
   */
  public all(): Transaction[] {
    return this.transactions;
  }

  /**
   * Totaling entries and withdrawals and displaying total credit
   */
  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (accumulator, transaction) => {
        if (transaction.type === 'income') {
          accumulator.income += transaction.value;
        } else if (transaction.type === 'outcome') {
          accumulator.outcome += transaction.value;
        }

        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    balance.total = balance.income - balance.outcome;

    return balance;
  }

  /**
   * Create a transaction
   */
  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
