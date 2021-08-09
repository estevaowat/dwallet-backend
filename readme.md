# dwallet-backend

#### Create a Postgres database in dev environment

```
docker run --name dwallet-dev \
-e POSTGRES_PASSWORD=dwalletdev \
-p 532:5432 \
-d postgres
```
