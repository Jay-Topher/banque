export interface ITransaction {
  user: string;
  benefactor: string;
  transactionType: string;
  transactionAmount: number;
  description?: string;
}
