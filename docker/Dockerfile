FROM node:alpine as admin-build
WORKDIR /admin

COPY ./admin/package.json ./package.json
# install production dependencies with npm run
RUN yarn

COPY ./admin .
# build production frontend
RUN yarn build

# website
FROM node:alpine as website-build
WORKDIR /website

COPY ./website/package.json  ./package.json
# install production dependencies with npm run
RUN yarn 

COPY ./website .
# build production fr
RUN yarn build

# frontend 2
FROM node:alpine as server-build
WORKDIR /server


COPY ./server/package.json  ./package.json
# install production dependencies with npm run
RUN yarn 

COPY ./server .
# build 
RUN yarn build


# nginx stage
# Use the official Nginx image as the base image
FROM nginx:latest AS nginx

# Copy the Nginx configuration file into the image

# Install Node.js
RUN apt-get update && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs


RUN apt-get update && apt-get install -y curl gnupg && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn

# RUN  apt-get install -y supervisor

COPY ./docker/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/commands.sh /scripts/commands.sh

RUN ["chmod", "+x", "/scripts/commands.sh"]

# COPY ./docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
# Copy the static files from the build stage
COPY --from=admin-build /admin/dist  /var/www/admin.localhost
COPY --from=website-build /website/dist  /var/www/localhost

WORKDIR /var/www/api.localhost

COPY ./server/package.json  ./package.json
# install production dependencies with npm run
RUN yarn 

COPY  ./server  /var/www/api.localhost
# build 
RUN yarn build
# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

#  run server 
# RUN node /var/www/api.localhost/dist/index.js
# Expose port 80 for HTTP traffic
EXPOSE 80

ENTRYPOINT ["/scripts/commands.sh"]