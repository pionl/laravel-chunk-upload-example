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
            <a href="{{ url('resumable') }}">Resumable</a>
            <a href="https://github.com/laravel/laravel">Laravel framework</a>
        </div>
        @yield('content')
        @if (isset($code))
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">Show code</button>

            <!-- Modal -->
            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                        aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">Code</h4>
                        </div>
                        <div class="modal-body">
                            <div class="text-left">
                                <pre><code class="javascript">{{ trim($code) }}</code></pre>
                            </div>
                        </div><!-- /.modal-content -->
                    </div><!-- /.modal-dialog -->
                </div><!-- /.modal -->

            </div>
        @endif
    </div>
    <link rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css">
    <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    @yield('body-end')
    <script src="{{ asset('js/app.js') }}"></script>
    <script>hljs.initHighlightingOnLoad();</script>
</body>
</html>
