# double-money-backend

## Command to create a postgres database docker instance

```bash
docker run --name money-database \
-e POSTGRES_PASSWORD=mOnEyIsGoOd \
-p 5432:5432 \
-d postgres
```

## Command to merge schemas into one file only

npx prisma-merge-schema --datasource ./prisma/schemas/\* --outputFile ./prisma/schema.prisma

## To-do

[] Create unit tests

[] Add github actions to the project

[] Create routes
[] Route to get stocks by userId

## Histories

[x] Import stock transactions using a csv
[] Import stocks using a csv
