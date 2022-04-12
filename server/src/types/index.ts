export type Transaction = {
  id?: number,
  email: string;
  time: Date;
  amount: number;
  description: string;
  sum?: number;
  sourceReference?: string;
  status?: TransactionStatus;
};

export enum TransactionStatus {
  Final = 0,
  Preliminary = 1,
  Rejected = 2
}

export type TimeReport = {
  // _id?: string,
  email: string;
  time: Date;
  description: string;
  hours: number;
  project_id: string;
}

