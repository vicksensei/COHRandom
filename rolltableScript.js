
window.onload = function(){
	loadActions();
	
}
function start(){
	loadActions();
	document.getElementById("startButton").style.display = "none";
	document.getElementById("all").style.display = "block";
}

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

function lineItem(lineText, itemIndex){
var tempLine;
var splitLine =["","","",""];

splitLine[0] = lineText.split(":")[0];
splitLine[1] = lineText.split(":")[1];
if(lineText.indexOf("(") > 0){
	splitLine[1] = lineText.split(":")[1].split("(")[0];
	splitLine[2] = lineText.split(":")[1].split("(")[1].split("/")[0];
	splitLine[3] = lineText.split(":")[1].split("(")[1].split("/")[1].replace(")", "");
}else{if(itemIndex>1)itemIndex=1;}

return splitLine[itemIndex].trim();
}

function fixArray(arrayToFix){
	var tempArray=[];
for( i = 0; i < arrayToFix.length; i++) 	{
	if(arrayToFix[i].trim() != "")
		tempArray.push(arrayToFix[i].trim());
}
	return tempArray;
}

function MakeTable(arrayString, title ){
	
var textArray = arrayString.split("\n");
textArray = fixArray(textArray);

	var tableHTML="<table id=\"" + title + "Table\"> ";
	var howMany = 2;
	
	tableHTML += "<tr><th> Roll</th>";
	tableHTML += "<th>"+title+"</th>";
	if(title.indexOf("AT")>-1) {
		tableHTML += "<th>Primary</th>";
		tableHTML += "<th>Secondary</th>";
		
		howMany = 4;
	}
	tableHTML += "</tr>";
	
	for( var i = 2; i < textArray.length; i++){
		
		tableHTML += "<tr>";
		for(j = 0; j < howMany; j++){
			tableHTML += "<td>";
			tableHTML += lineItem(textArray[i], j);
			tableHTML += "</td>";
			}
		tableHTML += "</tr>";
		
	}
	tableHTML += "</table>";
	if(title == "Origin"){
		document.getElementById("OriginSpot").innerHTML += tableHTML;
		
		return;
	}
	if(title=="AT" || title =="ATEpic"){
		document.getElementById("ATSpot").innerHTML += tableHTML;
		
		return;
	}
	
		document.getElementById("RollTables").innerHTML += tableHTML;
	
}

function LoadFile(path){
var xhttp = new XMLHttpRequest();


  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		var response = this.responseText;

		var tableHTML = MakeTable(response, path);
	}
  }
  xhttp.open("GET", "/Text/"+path+".txt", true);
  xhttp.send();
	
}

function loadActions(){
	LoadFile("Origin");
	LoadFile("AT");
	LoadFile("ATEpic");
	LoadFile("Blaster Primary");
	LoadFile("Blaster Secondary");
	LoadFile("Controller Primary");
	LoadFile("Defender Primary");
	LoadFile("Dominator Secondary");
	LoadFile("Mastermind Primary");
	LoadFile("Scrapper Primary");
	LoadFile("Scrapper Secondary");
	LoadFile("Stalker Primary");
	LoadFile("Tank Primary");
LoadFile("Tank Secondary");
}