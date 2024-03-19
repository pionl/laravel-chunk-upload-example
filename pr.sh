#!/usr/bin/env bash

set -e

if [ -z "$1" ]; then
    echo "Missing github username"
    echo "  Usage: pr.sh <your-github-username> <branch = default is master> <repository-name = laravel-chunk-upload>"
    exit 1
fi


USERNAME=$1
BRANCH=${2:-master}
REPOSITORY=${3:-laravel-chunk-upload}

cd laravel-chunk-upload

git checkout -b "$USERNAME"-master master
git pull git@github.com:"$USERNAME"/"$REPOSITORY".git "$BRANCH"
cd ..

echo "Done!"
