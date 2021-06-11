# Scripts

### Create a postres instance in docker

```
docker run --name money-d-dev \
-e POSTGRES_PASSWORD=devdocker \
-p 5432:5432 \
-d postgres
```
