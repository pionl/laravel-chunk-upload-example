ARG IMAGE_VERSION="8.2-node-20"

FROM pionl/docker-php-laravel-ci:${IMAGE_VERSION}

WORKDIR /app

COPY . .

RUN npm install

ARG LARAVEL_VERSION="12.*"

RUN composer self-update
RUN node setup.js ${LARAVEL_VERSION} --verbose

