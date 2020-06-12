@extends('chunk-example::layout')

@section('page-title', 'Resumable')

@section('body-end')
    <script src="{{ asset('/chunk-example/vendor/resumable/resumable.js') }}"></script>
@endsection

@section('content')
    <h2>Example</h2>
    <div class="text-center" >
        <div id="resumable-error" style="display: none">
            Resumable not supported
        </div>
        <div id="resumable-drop" style="display: none">
            <p><button id="resumable-browse" data-url="{{ url('api/upload') }}" >Upload</button> or drop here
            </p>
            <p>Uses `api/upload` endpoint which uses `browser` data instead of session (session is not inited in api routes). This is automatically detected.</p>
        </div>
        <ul id="file-upload-list" class="list-unstyled"  style="display: none">

        </ul>
        <br/>
    </div>
@endsection
