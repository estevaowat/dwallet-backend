FROM node
WORKDIR /app
EXPOSE 8090

COPY ["./package.json", "./yarn.lock", "/usr/src/app/"]

RUN yarn install --production=true

COPY ["./tsconfig.json", "/usr/src/app/"]
COPY "." "/app"

ENTRYPOINT [ "yarn", "start" ]

 