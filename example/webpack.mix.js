const mix = require('laravel-mix');
mix.setPublicPath('chunk-example');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'js')
    .sass('resources/assets/sass/app.scss', 'css')
    .copy('resources/assets/js/vendor', 'chunk-example/vendor')
    .copy('node_modules/resumablejs/resumable.js', 'chunk-example/vendor/resumable');
