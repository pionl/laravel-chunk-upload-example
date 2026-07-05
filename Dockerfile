ARG IMAGE_VERSION="8.2-node-20"

FROM --platform=linux/amd64 pionl/docker-php-laravel-ci:${IMAGE_VERSION}

WORKDIR /app

COPY . .

RUN npm install

ARG LARAVEL_VERSION="12.*"

RUN echo "error_reporting = E_COMPILE_ERROR|E_RECOVERABLE_ERROR|E_ERROR|E_CORE_ERROR" >> /usr/local/etc/php/conf.d/disable-warnings.ini \
 && echo "display_errors = Off" >> /usr/local/etc/php/conf.d/disable-warnings.ini

RUN composer self-update
RUN node setup.js ${LARAVEL_VERSION} --verbose
