
function toggleButton(contentID){
  var x = document.getElementById(contentID);
  
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
  
}

function toggleEpic(epic){
var epicTable = document.getElementById("ATEpicTable");
var noEpicTable = document.getElementById("ATTable");

var epicTableButton = document.getElementById("epicOn");
var noEpicTableButton = document.getElementById("epicOff");
if(epic == false){
	epicTable.style.display = "none";
	noEpicTable.style.display = "block";
	epicOff.style.backgroundColor = "#037ffc";
	epicOn.style.backgroundColor = "#707070";
}else{
	
	noEpicTable.style.display = "none";
	epicTable.style.display = "block";
	epicOn.style.backgroundColor = "#037ffc";
	epicOff.style.backgroundColor = "#707070";
}
	
}
