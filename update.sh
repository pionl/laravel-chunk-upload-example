#!/usr/bin/env bash

set -e

cd laravel-chunk-upload
git fetch
git reset --hard
git checkout master
git pull
