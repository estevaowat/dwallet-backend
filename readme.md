# dwallet-backend

This repository is the application backend for dwallet application

#### Create a Postgres database in dev environment

```
docker run --name dwallet-dev \
-e POSTGRES_PASSWORD=dwalletdev \
-p 532:5432 \
-d postgres
```

### RUN

To run this project in your machine.

Configure .env.development

```
git clone
yarn install
yarn start:dev
```
