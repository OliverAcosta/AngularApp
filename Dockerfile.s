FROM node:18.9.0-alpine3.15 as build
WORKDIR /app

RUN npm install -g @angular/cli

COPY ./package.json .
RUN npm install
COPY . .
RUN ng build

run mkdir angularapp

FROM nginx as runtime
COPY --from=build /dist/ElegantRestaurantApp /angularapp