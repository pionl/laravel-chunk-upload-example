#!/usr/bin/env bash

docker-compose -f docker-compose-tests.yml up --abort-on-container-exit

# Catch output:
### laravel-chunk-upload-example_codeceptjs_1 exited with code 0 - success
### laravel-chunk-upload-example_codeceptjs_1 exited with code 1 - failure
