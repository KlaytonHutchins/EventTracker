export class CreditCard {
  id: number;
  institutionName: string;
  balance: number;
  creditLimit: number;

  constructor(
    id: number = 0,
    institutionName: string = '',
    balance: number = 0,
    creditLimit: number = 0
    ) {
    this.id = id;
    this.institutionName = institutionName;
    this.balance = balance;
    this.creditLimit = creditLimit;
  }
}
