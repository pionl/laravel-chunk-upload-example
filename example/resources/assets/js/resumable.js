var $ = window.$; // use the global jQuery instance

var $fileUpload = $('#resumable-browse');
var $fileUploadDrop = $('#resumable-drop');
var $uploadList = $("#file-upload-list");

if ($fileUpload.length > 0 && $fileUploadDrop.length > 0) {
    var resumable = new Resumable({
        // Use chunk size that is smaller than your maximum limit due a resumable issue
        // https://github.com/23/resumable.js/issues/51
        chunkSize: 1 * 1024 * 1024, // 1MB
        simultaneousUploads: 3,
        testChunks: false,
        throttleProgressCallbacks: 1,
        // Get the url from data-url tag
        target: $fileUpload.data('url'),
        // Append token to the request - required for web routes
        query:{_token : $('input[name=_token]').val()}
    });

// Resumable.js isn't supported, fall back on a different method
    if (!resumable.support) {
        $('#resumable-error').show();
    } else {
        // Show a place for dropping/selecting files
        $fileUploadDrop.show();
        resumable.assignDrop($fileUpload[0]);
        resumable.assignBrowse($fileUploadDrop[0]);

        // Handle file add event
        resumable.on('fileAdded', function (file) {
            // Show progress pabr
            $uploadList.show();
            // Show pause, hide resume
            $('.resumable-progress .progress-resume-link').hide();
            $('.resumable-progress .progress-pause-link').show();
            // Add the file to the list
            $uploadList.append('<li class="resumable-file-' + file.uniqueIdentifier + '">Uploading <span class="resumable-file-name"></span> <span class="resumable-file-progress"></span>');
            $('.resumable-file-' + file.uniqueIdentifier + ' .resumable-file-name').html(file.fileName);
            // Actually start the upload
            resumable.upload();
        });
        resumable.on('fileSuccess', function (file, message) {
            // Reflect that the file upload has completed
            $('.resumable-file-' + file.uniqueIdentifier + ' .resumable-file-progress').html('(completed)');
        });
        resumable.on('fileError', function (file, message) {
            // Reflect that the file upload has resulted in error
            $('.resumable-file-' + file.uniqueIdentifier + ' .resumable-file-progress').html('(file could not be uploaded: ' + message + ')');
        });
        resumable.on('fileProgress', function (file) {
            // Handle progress for both the file and the overall upload
            $('.resumable-file-' + file.uniqueIdentifier + ' .resumable-file-progress').html(Math.floor(file.progress() * 100) + '%');
            $('.progress-bar').css({width: Math.floor(resumable.progress() * 100) + '%'});
        });
    }

}