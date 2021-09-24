FROM node:12.20.1-alpine

# create destination directory
RUN mkdir -p /usr/src/the-movie-app
WORKDIR /usr/src/the-movie-app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git
RUN apk add python make g++

# copy the app, note .dockerignore
COPY . /usr/src/the-movie-app/
RUN yarn install

# local development env variable
ENV ENVIRONMENT=local

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN yarn build

# expose 4020 on container
EXPOSE 4020

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=4020

# start the app
CMD [ "yarn", "start" ]
