# Laravel chunked upload example

> This example covers all supported Laravel versions. This implementation will allow us to test all versions at once.

This repo contains full example for [laravel-chunk-upload](https://github.com/pionl/laravel-chunk-upload) package.

## Installation

**Install specific Laravel version. Use X.X version format.**

```
bash setup.sh 7.0
```

**Install all supported Laravel versions**

```
bash setup.sh 
```

## Usage

> Run desired Laravel version and browse examples

```
php 6.0/artisan serve
```

# TODO

- test all Laravel versions (use endpoint to check if uploaded file exists) - use puppeteer?
- Update install
- Improve example controller

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

Copyright (c) 2017 Martin Kluska
