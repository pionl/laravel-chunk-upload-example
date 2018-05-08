var $ = window.$; // use the global jQuery instance

var $uploadList = $("#file-upload-list");
var $fileUpload = $('#fileupload');
if ($uploadList.length > 0 && $fileUpload.length > 0) {
    var idSequence = 0;

    // A quick way setup - url is taken from the html tag
    $fileUpload.fileupload({
        maxChunkSize: 1000000,
        method: "POST",
        // Not supported
        sequentialUploads: false,
        formData: function (form) {
            // Append token to the request - required for web routes
            return [{name: '_token', value: $('input[name=_token]').val()}];
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $("#" + data.theId).text('Uploading ' + progress + '%');
        },
        add: function (e, data) {
            data._progress.theId = 'id_' + idSequence;
            idSequence++;
            $uploadList.append($('<li id="' + data.theId + '"></li>').text('Uploading'));
            data.submit();
        },
        done: function (e, data) {
            console.log(data, e);
            $uploadList.append($('<li></li>').text('Uploaded: ' + data.result.path + ' ' + data.result.name));
        }
    });
}