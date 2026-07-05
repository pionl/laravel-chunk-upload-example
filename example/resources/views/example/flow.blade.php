@extends('chunk-example::layout')

@section('page-title', 'Flow.js')

@section('body-end')
    <script src="{{ asset('/chunk-example/vendor/flow/flow.js') }}"></script>
@endsection

@section('content')
    <h2>Example</h2>
    <div class="text-center">
        <div id="flow-error" style="display: none">
            Flow.js
        </div>
        <div id="flow-drop" style="display: none">
            <p><button id="flow-browse" data-url="{{ url('api/upload') }}">Upload</button> or drop here</p>
        </div>
        <ul id="file-upload-list" class="list-unstyled" style="display: none">

        </ul>
        <br/>
    </div>
@endsection
