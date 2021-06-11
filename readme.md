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

## TO DO

[] Upload repository to github
[] Create integration tests
[] Create unit tests

[x] Create prisma models schema
[x] Create seeds
[x] Prepare gitignore
