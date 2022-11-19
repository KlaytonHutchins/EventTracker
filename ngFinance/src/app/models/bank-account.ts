export class BankAccount {
  id: number;
  institutionName: string;
  balance: number;

  constructor(
    id: number = 0,
    institutionName: string = '',
    balance: number = 0
    ) {
    this.id = id;
    this.institutionName = institutionName;
    this.balance = balance;
  }

}
