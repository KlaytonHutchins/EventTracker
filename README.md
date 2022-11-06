# EventTracker


- User Portfolio

| CRUD Op. | HTTP Verb | URI                  | Request Body | Response Body |
|----------|-----------|----------------------|--------------|---------------|
| Read     | GET       | `/api/portfolios`         |              | List of all Portfolios |
| Read     | GET       | `/api/portfolios/{id}`|              | Representation of one Portfolio |
| Create   | POST      | `/api/portfolios`         | JSON for new Portfolio | JSON of created Portfolio
| Update   | PUT       | `/api/portfolios/{id}`| JSON to update Portfolio | JSON of updated Portfolio |
| Delete   | DELETE    | `/api/portfolios/{id}`|              | |

- Bank Account

| CRUD Op. | HTTP Verb | URI                  | Request Body | Response Body |
|----------|-----------|----------------------|--------------|---------------|
| Read     | GET       | `/api/portfolios/{pid}/bankAccounts`         |              | List of all Bank Accounts |
| Read     | GET       | `/api/portfolios/{pid}/bankAccounts/{bid}`|              | Representation of one Bank Account |
| Create   | POST      | `/api/portfolios/{pid}/bankAccounts`         | JSON for new Bank Account | JSON of created Bank Account
| Update   | PUT       | `/api/portfolios/{pid}/bankAccounts/{bid}`| JSON to update Bank Account | JSON of updated Bank Account |
| Delete   | DELETE    | `/api/portfolios/{pid}/bankAccounts/{bid}`|              | |

- Credit Card

| CRUD Op. | HTTP Verb | URI                  | Request Body | Response Body |
|----------|-----------|----------------------|--------------|---------------|
| Read     | GET       | `/api/portfolios/{pid}/creditCards`         |              | List of all Credit Cards |
| Read     | GET       | `/api/portfolios/{pid}/creditCards/{ccid}`|              | Representation of one Credit Card |
| Create   | POST      | `/api/portfolios/{pid}/creditCards`         | JSON for new Credit Card | JSON of created Credit Card
| Update   | PUT       | `/api/portfolios/{pid}/creditCards/{ccid}`| JSON to update Credit Card | JSON of updated Credit Card |
| Delete   | DELETE    | `/api/portfolios/{pid}/creditCards/{ccid}`|              | |
