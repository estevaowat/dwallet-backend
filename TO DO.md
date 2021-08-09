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

[] Create prisma folder and schema.prisma file
[] Create tables schemas (https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/using-prisma-migrate-typescript-postgres/)
[x] User
[x] Transaction
[] TransactionCategory
[] Category
[] UserTotal
[] Stock
[] StockTransaction
[]
[] Merge schemas into schema.prisma

### User repository

[x] Add prisma to Prisma User Repository

### TESTS

-  [] Configure integration tests
   -  [] Start the container and create the database
   -  [] Migrate the schema
   -  [] Run the tests
   -  [] Destroy the container

https://www.prisma.io/docs/guides/testing/integration-testing

[] Configurar injeção de dependência
