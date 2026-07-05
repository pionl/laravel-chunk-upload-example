// This example is just a PoC - not production ready!
var $ = window.$; // use the global jQuery instance

var $fileUpload = $('#flow-browse');
var $fileUploadDrop = $('#flow-drop');
var $uploadList = $('#file-upload-list');

if ($fileUpload.length > 0 && $fileUploadDrop.length > 0) {
    var flow = new Flow({
        chunkSize: 1 * 1024 * 1024,
        simultaneousUploads: 3,
        testChunks: false,
        target: $fileUpload.data('url'),
        query: {
            _token: $('input[name=_token]').val(),
        },
    });

    if (!flow.support) {
        $('#flow-error').show();
    } else {
        $fileUploadDrop.show();
        flow.assignDrop($fileUploadDrop[0]);
        flow.assignBrowse($fileUpload[0]);

        flow.on('fileAdded', function (file) {
            $uploadList.show();
            $uploadList.append('<li class="flow-file-' + file.uniqueIdentifier + '">Uploading <span class="flow-file-name"></span> <span class="flow-file-progress"></span></li>');
            $('.flow-file-' + file.uniqueIdentifier + ' .flow-file-name').html(file.name);
        });

        flow.on('filesSubmitted', function () {
            flow.upload();
        });

        flow.on('fileSuccess', function (file, message) {
            var uploadResponse = JSON.parse(message);
            $('.flow-file-' + file.uniqueIdentifier + ' .flow-file-progress').html('(completed)');

            if (typeof uploadResponse.path === 'string' && typeof uploadResponse.name === 'string') {
                $uploadList.append('<li>Uploaded: ' + uploadResponse.path + uploadResponse.name + '</li>');
            } else {
                $uploadList.append('<li>Response invalid: ' + message +'</li>')
            }
        });

        flow.on('fileError', function (file, message) {
            $('.flow-file-' + file.uniqueIdentifier + ' .flow-file-progress').html('(file could not be uploaded: ' + message + ')');
        });

        flow.on('fileProgress', function (file) {
            $('.flow-file-' + file.uniqueIdentifier + ' .flow-file-progress').html(Math.floor(file.progress() * 100) + '%');
        });
    }
}
