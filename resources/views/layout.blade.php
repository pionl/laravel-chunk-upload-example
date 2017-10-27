<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>@yield('page-title', 'Laravel chunked upload')</title>

        <!-- Fonts -->
        <link rel="stylesheet" href="css/app.css"/>
        @yield('head')
    </head>
    <body>
        <div class="flex-center position-ref full-height">
            <div class="content">
                <div class="title m-b-md">
                    @yield('page-title', 'Laravel chunked upload')
                </div>
                {{ csrf_field() }}
                <div class="links">
                    <a href="https://github.com/pionl/laravel-chunk-upload">Github docs</a>
                    <a href="{{ url('jquery-file-upload') }}">jQuery-File-Upload example</a>
                    <a href="{{ url('dropzone') }}">DropZone</a>
                    <a href="https://github.com/laravel/laravel">Laravel framework</a>
                </div>
                @yield('content')
            </div>
        </div>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        @yield('body-end')
        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
