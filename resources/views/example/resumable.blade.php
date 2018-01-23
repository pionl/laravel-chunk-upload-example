@extends('layout')

@section('page-title', 'Resumable')

@section('body-end')
    <script src="{{ asset('vendor/resumable/resumable.js') }}"></script>
@endsection

@section('content')
    <h2>Example</h2>
    <div class="text-center" >
        <div id="resumable-error" style="display: none">
            Resumable not supported
        </div>
        <div id="resumable-drop" style="display: none">
            <button id="resumable-browse" data-url="{{ url('upload') }}" >Upload</button> or drop here
        </div>
        <ul id="file-upload-list" class="list-unstyled"  style="display: none">

        </ul>
        <br/>
    </div>
@endsection