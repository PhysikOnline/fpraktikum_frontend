### STAGE 1: Build ###


# We label our stage as 'builder'
FROM node:8-alpine as builder

ARG production=0

RUN apk add --no-cache yarn

COPY package.json yarn.lock ./

RUN yarn config set no-progress true

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN yarn install && mkdir /ng-app && cp -R ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

RUN echo ${production}

## Build the angular app in production mode and store the artifacts in dist folder
RUN if [ "$production" -eq 1 ]; then $(npm bin)/ng build --prod  --build-optimizer; else $(npm bin)/ng build --aot  --build-optimizer; fi


### STAGE 2: Setup ###

FROM nginx:1.13.3-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
