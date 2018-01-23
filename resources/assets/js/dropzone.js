var $ = window.$; // use the global jQuery instance

if ($("#my-awesome-dropzone").length > 0) {
    var token = $('input[name=_token]').val();

    // A quick way setup
    var myDropzone = new Dropzone("#my-awesome-dropzone", {
        chunking: true,
        method: "POST",
        maxFilesize: 400000000,
        chunkSize: 1000000
    });

    // Append token to the request
    myDropzone.on('sending', function (file, xhr, formData) {
        formData.append("_token", token);
    })
}