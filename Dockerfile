ARG IMAGE_VERSION
FROM pionl/docker-php-laravel-ci:${IMAGE_VERSION}

WORKDIR /app

COPY . .

RUN npm install

ARG LARAVEL_VERSION

RUN composer self-update
RUN node setup.js ${LARAVEL_VERSION} --verbose

