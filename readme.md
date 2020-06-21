# Laravel chunked upload example

> This example covers all supported Laravel versions. This implementation will allow us to test all versions at once.

This repo contains full example for [laravel-chunk-upload](https://github.com/pionl/laravel-chunk-upload) package.

## Install

**Install specific Laravel version. Use X.* version format.**

```
node setup.js "7.*"
```

**Install all supported Laravel versions**

```
node setup.js
```


## Usage

> Run desired Laravel version and browse examples

```
php 7.\*/artisan serve --host=0.0.0.0 --port=8000
```

or 

```bash
IMAGE_VERSION=7.4 LARAVEL_VERSION=7.\* docker-compose -f docker-compose.yml up
```

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

> Install codeceptjs and puppeteer globally

* In one terminal run `php 7.\*/artisan serve --host=0.0.0.0 --port=8000`
* In second terminal run tests `codeceptjs run --steps`
* `CODECEPT_DEBUG=true codeceptjs run --steps` will show browser while tests are running.

### Docker-compose

* Environment variables should be passed: `IMAGE_VERSION` (php version) and `LARAVEL_VERSION`.
* `abort-on-container-exit` needs to be used to stop Laravel server.

```bash
IMAGE_VERSION=7.2 LARAVEL_VERSION=6.\* docker-compose -f docker-compose.yml -f docker-compose-tests.yml up --abort-on-container-exit
```

## Adding a support for new Laravel release

* Add a new version to `versions.json` file.
* Update `laravel-chunk-upload` repository (use your fork/PR or desired branch)
    * For PR or your repository
    ```bash
    cd laravel-chunk-upload
    git checkout -b drjdr-master master
    git pull https://github.com/drjdr/laravel-chunk-upload.git master
    cd ..
    ```
* Use setup on new version `node setup.js "X.*`.
* Run tests on new version `node tests.js "X.*`.
* Run tests on all versions `node tests.js "X.*`.

# TODO

- test all Laravel versions (use endpoint to check if uploaded file exists) - use puppeteer? Use sha1 to check if the file is correct.
- Update install
- Improve example controller
- Add tests to dropzone

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

## Copyright and License

[laravel-chunk-upload-example](https://github.com/pionl/laravel-chunk-upload-example)
was written by [Martin Kluska](http://kluska.cz) and is released under the 
[MIT License](LICENSE.md).

Copyright (c) 2017 and beyond Martin Kluska
