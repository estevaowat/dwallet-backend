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

[x] Upload repository to github
[x] Create prisma models schema
[x] Create seeds
[x] Prepare gitignore
[x] Create a docker compose file to create postgres test database
[x] Create a integration tests

## Histories

[] Import stocks using a csv
[] Import stock transactions using a csv
