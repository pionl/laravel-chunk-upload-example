<?php

namespace Pion\Laravel\ChunkUploadExample;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Pion\Laravel\ChunkUpload\Providers\ChunkUploadServiceProvider;

class ExampleServiceProvider extends ServiceProvider
{
    // Must be implemented for older Laravel versions.
    public function register()
    {
    // Force register ChunkUploadServiceProvider for older Laravel versions without auto-discovery (Bellow 5.5)
        $this->app->register(ChunkUploadServiceProvider::class);
    }

    public function boot()
    {
        // Load views / routes for example

        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'chunk-example');
        $this->_loadRoutesFrom(__DIR__ . '/routes.php');

        $this->publishes([
            __DIR__ . '/../chunk-example' => public_path('chunk-example'), // publish our build assets
            __DIR__ . '/../resources/assets' => resource_path('assets'),// vite needs this
        ], 'public');

        Vite::useBuildDirectory('chunk-example');
    }

    /**
     * We need to support old versions.
     */
    protected function _loadRoutesFrom($path)
    {
        if (method_exists($this, 'loadRoutesFrom')) {
            return $this->loadRoutesFrom($path);
        }

        if (!$this->app->routesAreCached()) {
            require $path;
        }
    }
}
