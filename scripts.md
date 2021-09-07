# Scripts

## Database

[x] Create a database for DEV environment

### Create a Postgres database image to run dev database

```
docker run --name dwallet-dev \
-e POSTGRES_PASSWORD=dwalletdev \
-p 5432:5432 \
-d postgres
```

### Create a Postgres database image to run dev database

```
docker run --name dwallet-integration-tests \
-e POSTGRES_PASSWORD=dwallettests \
-p 5433:5432 \
-d postgres
```
