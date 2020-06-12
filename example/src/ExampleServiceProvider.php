<?php
namespace Pion\Laravel\ChunkUploadExample;

use Illuminate\Support\ServiceProvider;

class ExampleServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'chunk-example');
        $this->loadRoutesFrom(__DIR__.'/routes.php');

        $this->publishes([
            __DIR__.'/../chunk-example' => public_path('chunk-example'),
        ], 'public');
    }
}
