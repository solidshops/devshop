FROM node:5.3.0

MAINTAINER Dries Droesbeke

RUN apt-get update && apt-get install -y \
        curl \
        git

RUN npm install -g grunt-cli

RUN mkdir /themes
RUN mkdir /app
WORKDIR /app

EXPOSE 3000
EXPOSE 35729

CMD ["grunt", "serve"]
