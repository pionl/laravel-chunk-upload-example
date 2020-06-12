<?php

// An example with API endpoint
use Pion\Laravel\ChunkUploadExample\Http\Controllers\DependencyUploadController;
use Pion\Laravel\ChunkUploadExample\Http\Controllers\UploadController;

Route::prefix('api')
    ->middleware('api')
    ->group(function () {
        Route::post('upload', [DependencyUploadController::class, 'uploadFile']);
    });

Route::middleware('web')
    ->group(function () {
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

        Route::post('upload', [DependencyUploadController::class, 'uploadFile']);
        Route::post('upload-advanced', [UploadController::class, 'upload']);
    });

