#!/usr/bin/env bash

##
# Installs and updates Laravel projects
###

echo "Updating example"

# Go to example and install chunk upload
cd example

composer update

# Install webpack and build all assets
npm install
npm run dev

cd ..

# Should we install desired version or all?
if [[ -z "$1" ]]
then
    echo "Updating or installing Laravel - in parallel - output at the end of execution"

    # Install or update the given versions of Laravel
    # Use X.X version tag (for gitignore)
    bash setupVersion.sh 5.1
    bash setupVersion.sh 5.2
    bash setupVersion.sh 5.3
    bash setupVersion.sh 5.4
    bash setupVersion.sh 5.5
    bash setupVersion.sh 5.7
    bash setupVersion.sh 5.8
    bash setupVersion.sh 6.0
    #prefixWith setupVersion.sh 7

else
  bash setupVersion.sh "$1"
fi


