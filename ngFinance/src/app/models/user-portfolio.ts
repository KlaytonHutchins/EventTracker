export class UserPortfolio {
  id: number;
  password: string;
  email: string;
  firstName: string;
  lastName: string;

  constructor(
    id: number = 0,
    password: string = '',
    email: string = '',
    firstName: string = '',
    lastName: string = ''
  ) {
    this.id = id;
    this.password = password;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
