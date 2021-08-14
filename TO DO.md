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

-  [x] Create tables schemas (https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/using-prisma-migrate-typescript-postgres/)
-  [x] User
-  [x] Transaction
-  [ ] TransactionCategory
-  [ ] Category
-  [ ] UserTotal
-  [ ] Stock
-  [ ] StockTransaction
-  [x] Merge schemas into schema.prisma

### TESTS

-  [x] Configure integration tests

   -  [x] Start the container and create the database
   -  [x] Migrate the schema
   -  [x] Run the tests
   -  [x] Destroy the container

-  [x] Run `yarn test:integration` only for files when has int.test in name;

-  [x] Create a script `yarn test:unit` to run only files which has `*spec.test*` in name;

### Authenticate User

-  [] Create a middleware to intercept the request to verify user is authenticated
-  [x] Create a global app error
-  [] Create a middleware to intercept all errors in application
-  [] Tests if data is saved in test database when are running tests;

-- Save encrypted password

-  [x] Create two columns in user
-  [x] When is creating a user

   -  [x] Create a random salt
   -  [x] Create a hash using user password and the random salt
   -  [x] Save hash and random salt in database

-  [] When user is authenticating
   -  [] get user salt and hash
   -  [] Compare user input with random salt and hash
