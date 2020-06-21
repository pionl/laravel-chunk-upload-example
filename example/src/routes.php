<?php

// An example with API endpoint
use Pion\Laravel\ChunkUploadExample\Http\Controllers\CheckUploadedFile;
use Pion\Laravel\ChunkUploadExample\Http\Controllers\DependencyUploadController;
use Pion\Laravel\ChunkUploadExample\Http\Controllers\UploadController;

/**
 * Add support for new syntax in older Laravel versions
 * @param array $route
 *
 * @return string
 */
function join_route(array $route) {
    return implode('@', $route);
}

// Example for API upload file
Route::group([
    'middleware' => ['api'],
    'prefix' => 'api',
], function () {
    Route::post('upload', join_route([DependencyUploadController::class, 'uploadFile']));
});

Route::group([
    'middleware' => ['web'],
], function () {
    // Example for web upload file
    Route::post('upload', join_route([DependencyUploadController::class, 'uploadFile']));
    Route::post('upload-advanced', join_route([UploadController::class, 'upload']));


    // Example related api endpoints
    Route::get('check/{mime}/{dir}/{fileName}', join_route([CheckUploadedFile::class, 'check']));

    $jsAssetsFolder = __DIR__ . '/../resources/assets/js/';

    Route::get('/', function () {
        return view('chunk-example::welcome');
    });

    Route::get('/jquery-file-upload', function () use ($jsAssetsFolder) {
        return view('chunk-example::example/jquery-file-upload', [
            'code' => file_get_contents($jsAssetsFolder . '/jquery-file-upload.js')
        ]);
    });
    Route::get('/dropzone', function () use ($jsAssetsFolder) {
        return view('chunk-example::example/dropzone', [
            'code' => file_get_contents($jsAssetsFolder . 'dropzone.js')
        ]);
    });
    Route::get('/resumable', function () use ($jsAssetsFolder) {
        return view('chunk-example::example/resumable', [
            'code' => file_get_contents($jsAssetsFolder . 'resumable.js')
        ]);
    });
});

