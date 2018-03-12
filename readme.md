# Laravel chunked upload example
This repo contains full example for [laravel-chunk-upload](https://github.com/pionl/laravel-chunk-upload) package.

## Versions
You can choose which version of laravel you are using.

### Current branch (master) - Laravel 5.5

### Laravel 5.4
Full example with at [laravel-5-4 branch](https://github.com/pionl/laravel-chunk-upload-example/tree/laravel-5-4)

## Installation

```bash
composer install
npm install
npm run dev
cp .env.example .env
php artisan key:generate
```

Optionally serve with `php artisan serve`

## Usage

Open the root page `http://localhost:8000` and open the desired examples.

## Example code
* **Controller - dynamic usage** at [./app/Http/Controllers/UploadController.php](./app/Http/Controllers/UploadController.php)
* **Views** at [./resources/views/example/](./resources/views/example/) - Here you can find basic layout for the providers.
* **Javascripts** at [./resources/assets/js/](./resources/assets/js/) - Here you can find the initial setup for the providers.

### Uploading to AMAZON s3 (or any other cloud storage)
It is recommended to upload the file in separate queue JOB. Uploading can take a time (for large files) and the request could
get timed out. It is important to stream the file to the cloud (not using `file_get_contents`) which would eat your memory. 
Also don't forget to remove the uploaded file after upload.

Example code found at [./app/Http/Controllers/UploadController.php](./app/Http/Controllers/UploadController.php#L59). 

## Copyright and License

[laravel-chunk-upload-example](https://github.com/pionl/laravel-chunk-upload-example)
was written by [Martin Kluska](http://kluska.cz) and is released under the 
[MIT License](LICENSE.md).

Copyright (c) 2017 Martin Kluska
