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

**Install specific Laravel version. Use X.\* version format.**

```
node setup.js "7.*"
```

**Install all supported Laravel versions**

```
node setup.js
```

> Pass --ignore-example to ignore updating and building example

**Run desired Laravel version and browse examples**

```
php 7.\*/artisan serve --host=0.0.0.0 --port=8000
```

or 

```bash
IMAGE_VERSION=7.4 LARAVEL_VERSION=7.\* docker-compose -f docker-compose.yml up
```

## Compatibility 

| Folder | Laravel version | Setup                   | Tests                   |                                                        |
| ------ | --------------- | ----------------------- | ----------------------- | ------------------------------------------------------ |
| 7.*    | v7.16.1         | `node setup.js "7.*"`   | `node tests.js "7.*"`   | `php 7.\*/artisan serve  --host=0.0.0.0 --port=8000`   |
| 6.*    | v6.18.20        | `node setup.js "6.*"`   | `node tests.js "6.*"`   | `php 6.\*/artisan serve  --host=0.0.0.0 --port=8000`   |
| 5.8.*  | v5.8.38         | `node setup.js "5.8.*"` | `node tests.js "5.8.*"` | `php 5.8.\*/artisan serve  --host=0.0.0.0 --port=8000` |
| 5.7.*  | v5.7.29         | `node setup.js "5.7.*"` | `node tests.js "5.7.*"` | `php 5.7.\*/artisan serve  --host=0.0.0.0 --port=8000` |
| 5.6.*  | v5.6.40         | `node setup.js "5.6.*"` | `node tests.js "5.6.*"` | `php 5.6.\*/artisan serve  --host=0.0.0.0 --port=8000` |
| 5.5.*  | v5.5.49         | `node setup.js "5.5.*"` | `node tests.js "5.5.*"` | `php 5.5.\*/artisan serve  --host=0.0.0.0 --port=8000` |
| 5.4.*  | v5.4.36         | `node setup.js "5.4.*"` | `node tests.js "5.4.*"` | `php 5.4.\*/artisan serve  --host=0.0.0.0 --port=8000` |
| 5.3.*  | v5.3.31         | `node setup.js "5.3.*"` | `node tests.js "5.3.*"` | `php 5.3.\*/artisan serve  --host=0.0.0.0 --port=8000` |
| 5.2.*  | v5.2.45         | `node setup.js "5.2.*"` | `node tests.js "5.2.*"` | `php 5.2.\*/artisan serve  --host=0.0.0.0 --port=8000` |

## Tests

**Run tests on all Laravel versions (install them before using it)**

```
node tests.js
```

**Run tests on desired Laravel version**

```
node tests.js "7.*"
```

### Tests locally

> Run `npm install` without production

* In one terminal run `php 7.\*/artisan serve --host=0.0.0.0 --port=8000`
* In second terminal run tests `./node_modules/.bin/codeceptjs run --steps`
* `npm run test-debug` will show browser while tests are running.

### Docker-compose

* Environment variables should be passed: `IMAGE_VERSION` (php version) and `LARAVEL_VERSION`.
* `abort-on-container-exit` needs to be used to stop Laravel server.

```bash
IMAGE_VERSION=7.2 LARAVEL_VERSION=6.\* docker-compose -f docker-compose.yml -f docker-compose-tests.yml up --abort-on-container-exit
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

> Do not commit your changes - use pull request in main repo 

* Add a new version to `versions.json` file.
* Add your changes to `laravel-chunk-upload` folder
* Use setup and tests on new version `node setup.js "7.\*" && node tests.js "7.\*"`
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
