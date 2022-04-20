export type Transaction = {
  id: string,
  email: string;
  time: Date;
  amount: number;
  description: string;
  sum?: number;
  sourceReference?: string;
  status?: TransactionStatus;
};

export enum TransactionStatus {
  Final,
  Preliminary,
  Rejected
}

export type TimeReport = {
  id?: string,
  email: string;
  time: Date;
  description: string;
  hours: number;
  project_id: string;
}

export type Setting = {
  key: string;
  value: string;
}