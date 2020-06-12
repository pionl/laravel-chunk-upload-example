#!/usr/bin/env bash

function deleteFileIfExists {
    if [[ -f "$1" ]]
    then
        echo "Deleting $1"
        rm $1
    fi
}

if [[ -z "$1" ]]
then
  echo "Please provider Laravel version."
  exit 1
fi

version=$1
DIR="./$version"

echo "Using $version version in $DIR directory"

# Update or install new Laravel project
if [[ -d "$DIR" ]]
then
    cd "$DIR"
    composer update
else
    composer create-project --prefer-dist laravel/laravel=${version} ${version}
    cd "$DIR"
fi

# Remove un-used files
deleteFileIfExists package.json
deleteFileIfExists webpack.mix.js
deleteFileIfExists routes/web.php

# Create empty web.php file

echo '<?php
' >> routes/web.php

# Add example package repository (move back to root context)
cd ..
php ./modifyComposer.php ${version}
cd ${DIR}

composer require pion/laravel-chunk-example-app

# Ensure that JS/CSS files are published

php artisan vendor:publish --tag=public --force

# Allow to browse uploaded files
php artisan storage:link

# Return back to root
cd ..
