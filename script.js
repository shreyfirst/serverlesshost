window.addEventListener('DOMContentLoaded', function() {
    // Check for the File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  document.getElementById('files').addEventListener('change', handleFileSelect, false);
} else {
  alert('The File APIs are not fully supported in this browser.');
}

function handleFileSelect(evt) {
  var f = evt.target.files[0]; // FileList object
  var reader = new FileReader();
  // Closure to capture the file information.
  reader.onload = (function(theFile) {
    return function(e) {
      var binaryData = e.target.result;
      //Converting Binary Data to base 64
      var base64String = window.btoa(binaryData);
      //showing file converted to base64
      // document.getElementById('base64').value = base64String;
      // alert('File converted to base64 successfuly!\nCheck in Textarea');
      sendToVercel(f.name, base64String)
    };
  })(f);
  // Read in the image file as a data URL.
  reader.readAsBinaryString(f);
}

function sendToVercel(name, binary) {
  let url = ""
  const data = "name="+name+"&base="+binary;
  // console.log(data)
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log(this);
      url = "https://" + this.responseText
        var a = document.getElementById('response');
  a.href = url
    var text = document.createTextNode("Click this link for your file");
    setTimeout(function(){   a.appendChild(text);
 }, 5000);

    }
  });

  xhr.open("POST", "/api/host.js");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  xhr.send(data);

}
});