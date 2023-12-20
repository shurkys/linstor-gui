# Этап сборки React
FROM node:lts-alpine as builder
WORKDIR /opt/app
RUN npm i -g @nestjs/cli
COPY . .
RUN npm run build

FROM piraeusdatastore/piraeus-server:v1.25.1 as dev
WORKDIR /usr/share/linstor-server/ui
COPY --from=builder /opt/app/out .