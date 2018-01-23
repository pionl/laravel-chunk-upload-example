<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/jquery-file-upload', function () {
    return view('example/jquery-file-upload', [
        'code' => file_get_contents(resource_path('assets/js/jquery-file-upload.js'))
    ]);
});
Route::get('/dropzone', function () {
    return view('example/dropzone', [
        'code' => file_get_contents(resource_path('assets/js/dropzone.js'))
    ]);
});
Route::get('/resumable', function () {
    return view('example/resumable', [
        'code' => file_get_contents(resource_path('assets/js/resumable.js'))
    ]);
});

Route::post('upload', 'DependencyUploadController@uploadFile');
Route::post('upload-advanced', 'UploadController@upload');
