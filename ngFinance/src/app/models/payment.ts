export class Payment {
  id: number;
  amount: number;
  description: string;
  timestamp: string;

  constructor(
    id: number = 0,
    amount: number = 0,
    description: string = '',
    timestamp: string = ''
    ) {
      this.id = id;
      this.amount = amount;
      this.description = description;
      this.timestamp = timestamp;
  }
}
