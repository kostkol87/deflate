"use strict";
function readSingleFile(evt) {
    var f = evt.target.files[0];

    if (f) {
        var r = new FileReader();
        r.onload = function(e) {
            var contents = e.target.result;

            console.log("content: \n" + lzw_decode(contents));
        };
        r.readAsText(f);
    }
}

document.getElementById('archived').addEventListener('change', readSingleFile, false);