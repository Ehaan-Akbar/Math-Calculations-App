function checkFileProperty(){
  let x = document.getElementById("fileToLoad");
  let txt = "";
  if ('files' in x) {
    if (x.files.length == 0) {
       txt = "Select one or more files...";
    } else {
       loadFileAsText();
    }
  } 
  else {
    if (x.value == "") {
      txt += "Select one or more files...";
    } else {
      txt += "The file is not supported by your browser!";
    }
  }
  document.getElementById("Message").innerHTML = txt;
}

function loadFileAsText() {

  let fileToLoad = document.getElementById("fileToLoad").files[0];

  let fileReader = new FileReader();
  fileReader.onload = function(fileLoadedEvent) 
  {
    let textFromFileLoaded = fileLoadedEvent.target.result;
    document.getElementById("fileInput").value = textFromFileLoaded; 
  };
  
  fileReader.readAsText(fileToLoad, "UTF-8");

}