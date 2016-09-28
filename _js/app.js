"use strict";

var reader      = new FileReader(),
    viewBuffer  = 10000;

//to prevent stack over flow
function bufferedArray(array, bufferSize) {
    var resultArray = [];

    if (array.length < bufferSize){ return array; }

    for (var i = 0; i < array.length; i+=bufferSize){
        resultArray.push(array.slice(i, i+bufferSize))
    }

    return resultArray;

}


//show packed files
function unpack(file) {
    reader.onload = function(e) {

        var charData    = e.target.result,
            binData     = new Uint8Array(charData),
            data        = pako.inflate(binData),
            codes = new Uint16Array(data),
            bufferedCodes =  bufferedArray(codes, viewBuffer);

        bufferedCodes.forEach(
            function (item) {
                console.log(String.fromCharCode.apply(null, item));
            }
        );
    };
    reader.readAsArrayBuffer(file);
}


//show not packed files
function show(file) {
    reader.onload = function(e) {
        var charData    = e.target.result;
        console.log(charData);
    };
    reader.readAsText(file);
}


//entry point
function readSingleFile(evt) {
    var file = evt.target.files[0];
    if (file && file.name.indexOf('gz') + 1) {
        unpack(file)
    }else {
        show(file)
    }
}


document.getElementById('archived').addEventListener('change', readSingleFile, false);