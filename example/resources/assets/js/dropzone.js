var $ = window.$; // use the global jQuery instance

if ($("#my-awesome-dropzone").length > 0) {
    var token = $('input[name=_token]').val();

    // A quick way setup
    var myDropzone = new Dropzone("#my-awesome-dropzone", {
        // Setup chunking
        chunking: true,
        method: "POST",
        maxFilesize: 400000000,
        chunkSize: 1000000,
        // If true, the individual chunks of a file are being uploaded simultaneously.
        parallelChunkUploads: true
    });

    // Append token to the request - required for web routes
    myDropzone.on('sending', function (file, xhr, formData) {
        formData.append("_token", token);

        // This will track all request so we can get the correct request that returns final response:
        // We will change the load callback but we need to ensure that we will call original
        // load callback from dropzone
        var dropzoneOnLoad = xhr.onload;
        xhr.onload = function (e) {
            dropzoneOnLoad(e)

            // Check for final chunk and get the response
            var uploadResponse = JSON.parse(xhr.responseText)
            if (typeof uploadResponse.name === 'string') {
                $list.append('<li>Uploaded: ' + uploadResponse.path + uploadResponse.name + '</li>')
            }
        }
    })

    // THIS IS FOR INTEGRATION TESTS - DO NOT USE

    // Process the query when file is added to the input
    $('input[name=file]').on('change', function () {
        if (typeof this.files[0] === 'object') {
            myDropzone.addFile(this.files[0]);
        }
    });

    var $list = $('#file-upload-list');
    myDropzone.on('addedfile', function () {
        $list.append('<li>Uploading</li>')
    })

}
