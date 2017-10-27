var $ = window.$; // use the global jQuery instance

var token = $('input[name=_token]').val();

// A quick way setup
var myDropzone = new Dropzone("#my-awesome-dropzone", {
    chunking: true,
    method: "POST"
});

myDropzone.on('sending', function(file, xhr, formData) {
    formData.append("_token", token);
})