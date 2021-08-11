### Database

[x] Create a database for DEV environment

#### Create a Postgres database in dev environment

```
docker run --name dwallet-dev \
-e POSTGRES_PASSWORD=dwalletdev \
-p 532:5432 \
-d postgres
```

[x] Create a database for test environment

```
docker run --name dwallet-integration-tests \
-e POSTGRES_PASSWORD=dwallettests \
-p 5433:5432 \
-d postgres
```

### PRISMA

[x] Create prisma folder and schema.prisma file
[x] Create tables schemas (https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/using-prisma-migrate-typescript-postgres/)
[x] User
[x] Transaction
[] TransactionCategory
[] Category
[] UserTotal
[] Stock
[] StockTransaction
[]
[x] Merge schemas into schema.prisma

### User repository

[x] Add prisma to Prisma User Repository

### TESTS

-  [x] Configure integration tests
   -  [x] Start the container and create the database
   -  [x] Migrate the schema
   -  [x] Run the tests
   -  [x] Destroy the container

[x] Configurar injeção de dependência

### Authenticate User

[] Create UserAuthencationController

-  [] Create a UserAuthenticationService
   -  [] isAuthenticated
   -  [] generateAuthenticationToken
-  [] Create a Repository for user authentication
   -  [] isAuthenticated
   -  [x] findUserByEmailAndPassword
-  [] Create a middleware to intercept the request to verify user is authenticated

[] Run `yarn test:integration` only for files when has int.test in name
[] Create a script `yarn test:unit` to run only files which has `*spec.test*` in name
