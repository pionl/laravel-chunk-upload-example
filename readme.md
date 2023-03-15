# Laravel chunked upload example

> This example covers all supported Laravel versions. This implementation will allow us to test all versions at once.

This repo contains full example for [laravel-chunk-upload](https://github.com/pionl/laravel-chunk-upload) package.

* [Usage](#usage)
* [Compatibility](#compatibility)
* [Run tests](#tests)
* [Example code](#example-code)
* [Testing your contribution](#testing-your-contribution)
* [Adding new Laravel release](#adding-a-support-for-new-laravel-release)

## Install

```
git clone git@github.com:pionl/laravel-chunk-upload-example.git --recurse-submodules --remote-submodules
npm install --only=production
```

## Usage

**Install and run specific Laravel version. Use X.\* version format.**

```
node run.js "8.*"
```

> Pass --ignore-example to ignore updating and building example
> Pass --verbose for debug info


open http://localhost:8000

## Compatibility 

> Current version of laravel-chunk-upload is tested against: 

| Laravel | PHP                                   | Run               | Tests                  |
|---------|---------------------------------------|-------------------|------------------------|
| 10.*    | 8.1-node-17, 8.2-node-18              | `node run "10.*"` | `node tests.js "10.*"` |
| 9.*     | 8.0-node-17, 8.1-node-17, 8.2-node-18 | `node run "9.*"`  | `node tests.js "9.*"`  |
| 8.*     | 7.4-node-17, 8.0-node-17, 8.1-node-17 | `node run "8.*"`  | `node tests.js "8.*"`  |
| 7.*     | 7.4-node-17                           | `node run "7.*"`  | `node tests.js "7.*"`  |

## Tests

> Pass --verbose for debug info

**Run tests on all Laravel versions (install them before using it)**

```
node tests.js
```

**Run tests on desired Laravel version**

```
node tests.js "8.*"
```

### Tests locally

> Run `npm install` without production. 

* In one terminal run `php 7.\*/artisan serve --host=0.0.0.0 --port=8000`
* In second terminal run tests `./node_modules/.bin/codeceptjs run --steps`
* `npm run test-debug` will show browser while tests are running.

### Docker-compose

* Environment variables should be passed: `IMAGE_VERSION` (php version) and `LARAVEL_VERSION`.
* `abort-on-container-exit` needs to be used to stop Laravel server.

```bash
IMAGE_VERSION=7.4 LARAVEL_VERSION=8.\* docker-compose -f docker-compose.yml -f docker-compose-tests.yml up --abort-on-container-exit
```

## Running tests on latest Laravel release

**I did not find a way how to install Laravel on master with the latest changes from framework -- let me know if you know how**

## Testing your contribution

> Do not commit your changes - use pull request in main repo

* Replace `laravel-chunk-upload` folder with your repository (clone your fork)
* Maintainer can pull PR 
    
    ```bash
    cd laravel-chunk-upload
    git checkout -b drjdr-master master
    git pull https://github.com/drjdr/laravel-chunk-upload.git master
    cd ..
    ```
* Run tests on all versions `node tests.js` to ensure backward compatibility.

## Adding a support for new Laravel release

- Docker + docker compose installed
- Node.js installed

> Do not commit your changes - use pull request in main repo 

* Add a new version to `versions.json` file.
* Add your changes to `laravel-chunk-upload` folder
* Test the Laravel version `node tests.js "10.\*"`
* Run tests on all versions `node tests.js` to ensure backward compatibility.

## Example code

* **Controller - dynamic usage** at [./example/src/Http/Controllers/UploadController.php](./example/src/Http/Controllers/UploadController.php)
* **Views** at [./example/resources/views/example/](./example/resources/views/example/) - Here you can find basic layout for the providers.
* **Javascripts** at [./example/resources/assets/js/](./example/resources/assets/js/) - Here you can find the initial setup for the providers.

### Uploading to AMAZON s3 (or any other cloud storage)

* It is recommended to upload the file in separate queue JOB. Uploading can take a time (for large files) and the request could
get timed out.
* It is important to stream the file to the cloud (not using `file_get_contents`) which would eat your memory. 
* Also don't forget to remove the uploaded file after the upload.

Example code found at [./example/sr/Http/Controllers/UploadController.php](./example/src/Http/Controllers/UploadController.php#L59). 

## Contribution in example

* If you make changes in assets, do not forget to call `node compile.js` to compile the changes and publish them to all version (you can also pass desired version)

# TODO

- Improve example controller
- Add tests to dropzone
- clean storage after tests
- Add tests for paraller save

## Copyright and License

[laravel-chunk-upload-example](https://github.com/pionl/laravel-chunk-upload-example)
was written by [Martin Kluska](http://kluska.cz) and is released under the 
[MIT License](LICENSE.md).

Copyright (c) 2017 and beyond Martin Kluska
