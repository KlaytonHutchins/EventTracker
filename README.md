# EventTracker


- User Portfolio

| CRUD Op. | HTTP Verb | URI                  | Request Body | Response Body |
|----------|-----------|----------------------|--------------|---------------|
| Read     | GET       | `/api/portfolios`         |              | List of all Portfolios |
| Read     | GET       | `/api/portfolios/{id}`|              | Representation of one Portfolio |
| Create   | POST      | `/api/portfolios`         | JSON for new Portfolio | JSON of created Portfolio |
| Update   | PUT       | `/api/portfolios/{id}`| JSON to update Portfolio | JSON of updated Portfolio |
| Delete   | DELETE    | `/api/portfolios/{id}`|              | |

- Bank Account

| CRUD Op. | HTTP Verb | URI                  | Request Body | Response Body |
|----------|-----------|----------------------|--------------|---------------|
| Read     | GET       | `/api/portfolios/{pid}/bankAccounts`         |              | List of all Bank Accounts |
| Read     | GET       | `/api/portfolios/{pid}/bankAccounts/{bid}`|              | Representation of one Bank Account |
| Create   | POST      | `/api/portfolios/{pid}/bankAccounts`         | JSON for new Bank Account | JSON of created Bank Account |
| Update   | PUT       | `/api/portfolios/{pid}/bankAccounts/{bid}`| JSON to update Bank Account | JSON of updated Bank Account |
| Delete   | DELETE    | `/api/portfolios/{pid}/bankAccounts/{bid}`|              | |

- Credit Card

| CRUD Op. | HTTP Verb | URI                  | Request Body | Response Body |
|----------|-----------|----------------------|--------------|---------------|
| Read     | GET       | `/api/portfolios/{pid}/creditCards`         |              | List of all Credit Cards |
| Read     | GET       | `/api/portfolios/{pid}/creditCards/{ccid}`|              | Representation of one Credit Card |
| Create   | POST      | `/api/portfolios/{pid}/creditCards`         | JSON for new Credit Card | JSON of created Credit Card |
| Update   | PUT       | `/api/portfolios/{pid}/creditCards/{ccid}`| JSON to update Credit Card | JSON of updated Credit Card |
| Delete   | DELETE    | `/api/portfolios/{pid}/creditCards/{ccid}`|              | |

- Deposit

| CRUD Op. | HTTP Verb | URI                  | Request Body | Response Body |
|----------|-----------|----------------------|--------------|---------------|
| Read     | GET       | `/api/portfolios/{pid}/bankAccounts/{bid}/deposits`         |              | List of all Deposits |
| Read     | GET       | `/api/portfolios/{pid}/bankAccounts/{bid}/deposits/{did}`|              | Representation of one Deposit |
| Create   | POST      | `/api/portfolios/{pid}/bankAccounts/{bid}/deposits`         | JSON for new Deposit | JSON of created Deposit |
| Update   | PUT       | `/api/portfolios/{pid}/bankAccounts/{bid}/deposits/{did}`| JSON to update Deposit | JSON of updated Deposit |
| Delete   | DELETE    | `/api/portfolios/{pid}/bankAccounts/{bid}/deposits/{did}`|              | |

- Withdrawal

| CRUD Op. | HTTP Verb | URI                  | Request Body | Response Body |
|----------|-----------|----------------------|--------------|---------------|
| Read     | GET       | `/api/portfolios/{pid}/bankAccounts/{bid}/withdrawals`         |              | List of all Withdrawals |
| Read     | GET       | `/api/portfolios/{pid}/bankAccounts/{bid}/withdrawals/{wid}`|              | Representation of one Withdrawal |
| Create   | POST      | `/api/portfolios/{pid}/bankAccounts/{bid}/withdrawals`         | JSON for new Withdrawal | JSON of created Withdrawal |
| Update   | PUT       | `/api/portfolios/{pid}/bankAccounts/{bid}/withdrawals/{wid}`| JSON to update Withdrawal | JSON of updated Withdrawal |
| Delete   | DELETE    | `/api/portfolios/{pid}/bankAccounts/{bid}/withdrawals/{wid}`|              | |

- Payment

| CRUD Op. | HTTP Verb | URI                  | Request Body | Response Body |
|----------|-----------|----------------------|--------------|---------------|
| Read     | GET       | `/api/portfolios/{pid}/creditCards/{ccid}/payments`         |              | List of all Payments |
| Read     | GET       | `/api/portfolios/{pid}/creditCards/{ccid}/payments/{payId}`|              | Representation of one Payment |
| Create   | POST      | `/api/portfolios/{pid}/creditCards/{ccid}/payments`         | JSON for new Payment | JSON of created Payment |
| Update   | PUT       | `/api/portfolios/{pid}/creditCards/{ccid}/payments/{payId}`| JSON to update Payment | JSON of updated Payment |
| Delete   | DELETE    | `/api/portfolios/{pid}/creditCards/{ccid}/payments/{payId}`|              | |

- Purchase

| CRUD Op. | HTTP Verb | URI                  | Request Body | Response Body |
|----------|-----------|----------------------|--------------|---------------|
| Read     | GET       | `/api/portfolios/{pid}/creditCards/{ccid}/purchases`         |              | List of all Purchases |
| Read     | GET       | `/api/portfolios/{pid}/creditCards/{ccid}/purchases/{payId}`|              | Representation of one Purchase |
| Create   | POST      | `/api/portfolios/{pid}/creditCards/{ccid}/purchases`         | JSON for new Purchase | JSON of created Purchase |
| Update   | PUT       | `/api/portfolios/{pid}/creditCards/{ccid}/purchases/{payId}`| JSON to update Purchase | JSON of updated Purchase |
| Delete   | DELETE    | `/api/portfolios/{pid}/creditCards/{ccid}/purchases/{payId}`|              | |
