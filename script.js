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
      document.getElementById('base64').value = base64String;
      alert('File converted to base64 successfuly!\nCheck in Textarea');
      sendToVercel(f.name, base64String)
    };
  })(f);
  // Read in the image file as a data URL.
  reader.readAsBinaryString(f);
}

function sendToVercel(name, binary) {
    const data = JSON.stringify({
    "name": "my-instant-deployment",
    "files": [
      {
        "file": name,
        "data": binary,
        "encoding": "base64"
      }
    ],
    "projectSettings": {
      "framework": null
    }
  });

  // console.log(data)
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log(this);
    }
  });

  xhr.open("POST", "https://api.vercel.com/v12/now/deployments");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", "Bearer nTTzOm6rofsvMr8w5TzoCEYn");
  xhr.setRequestHeader("Access-Control-Allow-Origin", "https://stunningwittytrapezoids.shreygupta1.repl.co");
  
  xhr.send(data);
}
});