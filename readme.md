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

**To install and run a specific version of Laravel, use the X version format.**

```bash
node run.js "8.*"
```

> Pass _--ignore-example_ to ignore updating and building the example.
> 
> Pass _--verbose_ for debug information.

Open http://localhost:8000

## Compatibility

> The current version of laravel-chunk-upload is tested against:

| Laravel | PHP                                                | Run             | Tests                |
|---------|----------------------------------------------------|-----------------|----------------------|
| 13      | 8.3-node-22, 8.4-node-24, 8.5-node-24              | `node run "13"` | `node tests.js "13"` |
| 12      | 8.2-node-20, 8.3-node-22, 8.4-node-24, 8.5-node-24 | `node run "12"` | `node tests.js "12"` |
| 11      | 8.2-node-20, 8.3-node-22, 8.4-node-22              | `node run "11"` | `node tests.js "11"` |
| 10      | 8.2-node-20                                        | `node run "10"` | `node tests.js "10"` |
| 9       | 8.2-node-20                                        | `node run "9"`  | `node tests.js "9"`  |

> When adding a new version, update the **version.json** and run `node versionsTable.js` to update the table above. 

## Tests

> Pass --verbose for debug information.

**Run tests on a desired Laravel version and only on the first PHP version**

```bash
node tests.js "8.*" --first
```

> Remove **--first** parameter to test all PHP versions. 

**Run tests on all Laravel versions using docker**

```bash
node tests.js
```

### Running Tests Locally

* `test-local-setup`
* Setup the version you want `node setup.js "13.*"`
* In one terminal, run `php 13/artisan serve --host=0.0.0.0 --port=8000`.
* In a second terminal, install the local browser once with `npm run test-local-setup`.
* Run tests with `npm run test-local`.
* `npm run test-debug -- tests/jquery-upload.spec.js` (example of a test file) will open Playwright Inspector for a single test file.
* `npm run test-ui` opens Playwright UI mode so you can pick one test to run or debug.

When tweaking only test and example logic after setup, run this:

``` bash
node setup.js 12 --only-example && php 12/artisan serve --host=0.0.0.0 --port=8000
```

### Docker-Compose

* Environment variables should be passed: `IMAGE_VERSION` (PHP version) and `LARAVEL_VERSION`.
* The Playwright runner waits for the Laravel container and then executes the browser suite.
* The Laravel CI base image is `amd64`-only, so `arm64` machines need Docker x86_64 emulation enabled.
* `abort-on-container-exit` needs to be used to stop the Laravel server.

```bash
IMAGE_VERSION=8.2-node-20 LARAVEL_VERSION=12 docker compose -f docker-compose.yml -f docker-compose-tests.yml up --abort-on-container-exit
```

We are using docker images built for [Laravel](https://github.com/pionl/docker-php-laravel-ci)

## Testing Your Contribution

> Do not commit your changes - use a pull request in the main repo.

* Replace the `laravel-chunk-upload` folder with your repository (clone your fork).
* Or you can pull changes from your fork with with given bash script:

```bash
pr.sh <your-github-username> <branch = default is master> <repository-name = laravel-chunk-upload>
```
* Run tests on all versions with `node tests.js` to ensure backward compatibility.

### Getting current master when PR is merged

```
bash update.sh
```

## Adding Support for a New Laravel Release

- Docker and Docker Compose installed.
- Node.js installed.

> Do not commit your changes - use a pull request in the main repo.

* Add a new version to the `versions.json` file.
* Add your changes to the `laravel-chunk-upload` folder.
* Test the Laravel version with `node tests.js "10"`.
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

* If you make changes in assets, remember to call `node compile.js` to compile the changes and publish them to all versions (you can also pass the desired version).

### Running Tests on the Latest Laravel Release

**I did not find a way to install Laravel on master with the latest changes from the framework. Let me know if you know how.**

## Copyright and License

[laravel-chunk-upload-example](https://github.com/pionl/laravel-chunk-upload-example)
was written by [Martin Kluska](http://kluska.cz) and is released under the
[MIT License](LICENSE.md).

Copyright (c) 2017 and beyond Martin Kluska and all the contributors (Thank you ❤️)
