# Laravel Chunked Upload Example

> This example covers all supported versions of Laravel. This implementation allows testing across all versions simultaneously.

This repository contains a full example for the [laravel-chunk-upload](https://github.com/pionl/laravel-chunk-upload) package. You can either explore an example app or run tests against all supported versions of Laravel.

* [Usage](#usage)
* [Compatibility](#compatibility)
* [Running Tests](#tests)
* [Example Code](#example-code)
* [Testing Your Contribution](#testing-your-contribution)
* [Contribution](#contribution)

## Install

```bash
git clone git@github.com:pionl/laravel-chunk-upload-example.git --recurse-submodules
npm install
```

## Requirements

- PHP Installed if running locally
- Node.js
- Docker and Docker Compose installed

## Usage

**To install and run a specific version of Laravel, use the X.\* version format.**

```bash
node run.js "8.*"
```

> Pass _--ignore-example_ to ignore updating and building the example.
> 
> Pass _--verbose_ for debug information.

Open http://localhost:8000

## Compatibility

> The current version of laravel-chunk-upload is tested against:

| Laravel | PHP                                   | Run               | Tests                  |
|---------|---------------------------------------|-------------------|------------------------|
| 10.*    | 8.2-node-20, 8.2-node-20              | `node run "11.*"` | `node tests.js "11.*"` |
| 10.*    | 8.1-node-17, 8.2-node-18              | `node run "10.*"` | `node tests.js "10.*"` |
| 9.*     | 8.0-node-17, 8.1-node-17, 8.2-node-18 | `node run "9.*"`  | `node tests.js "9.*"`  |
| 8.*     | 7.4-node-17, 8.0-node-17, 8.1-node-17 | `node run "8.*"`  | `node tests.js "8.*"`  |
| 7.*     | 7.4-node-17                           | `node run "7.*"`  | `node tests.js "7.*"`  |

## Tests

> Pass --verbose for debug information.

**Run tests on all Laravel versions (install them before using it) using docker**

```bash
node tests.js
```

**Run tests on a desired Laravel version**

```bash
node tests.js "8.*"
```

### Running Tests Locally

* In one terminal, run `php 7.\*/artisan serve --host=0.0.0.0 --port=8000`.
* In a second terminal, run tests with `./node_modules/.bin/codeceptjs run --steps`.
* `npm run test-debug` will show the browser while tests are running.

### Docker-Compose

* Environment variables should be passed: `IMAGE_VERSION` (PHP version) and `LARAVEL_VERSION`.
* `abort-on-container-exit` needs to be used to stop the Laravel server.

```bash
IMAGE_VERSION=7.4 LARAVEL_VERSION=8.\* docker-compose -f docker-compose.yml -f docker-compose-tests.yml up --abort-on-container-exit
```

## Testing Your Contribution

> Do not commit your changes - use a pull request in the main repo.

* Replace the `laravel-chunk-upload` folder with your repository (clone your fork).
* Or you can pull changes from your fork with with given bash script:

```bash
pr.sh <your-github-username> <branch = default is master> <repository-name = laravel-chunk-upload>
```
* Run tests on all versions with `node tests.js` to ensure backward compatibility.

## Adding Support for a New Laravel Release

- Docker and Docker Compose installed.
- Node.js installed.

> Do not commit your changes - use a pull request in the main repo.

* Add a new version to the `versions.json` file.
* Add your changes to the `laravel-chunk-upload` folder.
* Test the Laravel version with `node tests.js "10.\*"`.
* Run tests on all versions with `node tests.js` to ensure backward compatibility.

## Example Code

* **Controller - Dynamic Usage** at [./example/src/Http/Controllers/UploadController.php](./example/src/Http/Controllers/UploadController.php)
* **Views** at [./example/resources/views/example/](./example/resources/views/example/) - Here, you can find a basic layout for the providers.
* **JavaScript** at [./example/resources/assets/js/](./example/resources/assets/js/) - Here, you can find the initial setup for the providers.

### Uploading to Amazon S3 (or Any Other Cloud Storage)

* It is recommended to upload the file in a separate queue JOB. Uploading can take time (for large files), and the request could get timed out.
* It is important to stream the file to the cloud (not using `file_get_contents`), which would consume your memory.
* Also, don't forget to remove the uploaded file after the upload.

Example code found at [./example/src/Http/Controllers/UploadController.php](./example/src/Http/Controllers/UploadController.php#L59).


## Contribution

* If you make changes in assets, do not forget to call `node compile.js` to compile the changes and publish them to all versions (you can also pass the desired version).

# TODO

- Improve example controller.
- Add tests to Dropzone.
- Clean storage after tests.
- Add tests for parallel save.

### Running Tests on the Latest Laravel Release

**I did not find a way to install Laravel on master with the latest changes from the framework. Let me know if you know how.**


## Copyright and License

[laravel-chunk-upload-example](https://github.com/pionl/laravel-chunk-upload-example)
was written by [Martin Kluska](http://kluska.cz) and is released under the
[MIT License](LICENSE.md).

Copyright (c) 2017 and beyond Martin Kluska and all the contributors (Thank you ❤️)
