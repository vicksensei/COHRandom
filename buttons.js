
function toggleButton(contentID){
  var x = document.getElementById(contentID);
  
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
  
//console.log("Display:" + x.style.display);
}

function SetRandom(path, elementID){
var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		var response = this.responseText;
		var line = randomFromTableArray(response)
		var ItemToWrite = lineItem(line,1);
		document.getElementById(elementID).value = ItemToWrite;
		//console.log(line);
	  }
  }
  xhttp.open("GET", "text/"+path+".txt", true);
  xhttp.send();
	
}

function SetRandomAT(){
var xhttp = new XMLHttpRequest();
var path;
var epicOn = document.getElementById("Epic").checked;

if(epicOn){
path= "text/ATEpic.txt";
}else{path="text/AT.txt";}


  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	  var response = this.responseText;
	  var roll = randomFromTableArray(response)
		var AT = lineItem(roll,1);
		//document.getElementById("ATROLL").innerHTML = roll;
	  document.getElementById("AT").value = AT;
	  var Primary = lineItem(roll,2);
	  var Secondary = lineItem(roll, 3);
	  SetRandom(Primary, "Primary");
	  SetRandom(Secondary, "Secondary");
	  
	  }
  }
  xhttp.open("GET", path, true);
  xhttp.send();
	
}

function RandomChar() {
	ClearCharacter();
SetRandom("Origin", "Origin");
SetRandomAT();
}

function ClearCharacter(){
	  document.getElementById("ROLL1").value = "";
	  document.getElementById("ROLL2").value = "";
	  document.getElementById("ROLL3").value = "";
	  document.getElementById("ROLL4").value = "";
	
	
	  document.getElementById("Origin").value = "";
	  document.getElementById("AT").value = "";
	  document.getElementById("Primary").value = "";
	  document.getElementById("Secondary").value = "";
}

function randomFromTableArray(filetext){
	
var textArray = filetext.split("\n");
textArray = fixArray(textArray);
var TAL = textArray.length;
var max = TAL -1;
var min = 2;
var random = getRandomInt(min, max);
var returnString = textArray[random];

//console.log("RO:" + random + "/" +max + " : " + returnString);
return returnString;
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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
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
			if(j==1){
				tableHTML +="<a onclick=\"ItemClick('" +lineItem(textArray[i],j) + "', '"+ title + "')\" href='javascript:void(0);'>";
			}
			tableHTML += lineItem(textArray[i], j);
			if(j==1){ tableHTML +="</a>"}
			tableHTML += "</td>";
			}
		tableHTML += "</tr>";
		
	}
	tableHTML += "</table>";
	document.getElementById("html").innerHTML+= tableHTML;
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
  xhttp.open("GET", "text/"+path+".txt", true);
  xhttp.send();
	
}

function ItemClick(item, title)
{
	var epicON = document.getElementById("Epic").checked;
	var ATTable= document.getElementById("ATTable");
	if(epicON) ATTable= document.getElementById("ATEpicTable");
	
	if(title == "Origin"){
		
		document.getElementById(title).value = item;
		
		var ATNoEpicTable = document.getElementById("ATTable");
		var ATEpicTable = document.getElementById("ATEpicTable");
		
		if (epicON) {
			ATNoEpicTable.style.display = "none";
			ATEpicTable.style.display = "block";
		}else{
			
			ATNoEpicTable.style.display = "block";
			ATEpicTable.style.display = "none";
		}
		
		
	}else if(title == "AT"|| title=="ATEpic"){
		document.getElementById("AT").value = item;
		
		var AT = document.getElementById("AT").value;
		var rowLength = ATTable.rows.length;
		
	
		}
	
	
	
	/*
	var titleSplit = title.split(" ");
	
	if(titleSplit.length == 2){
		console.log ("in power set");
		var ATTable = document.getElementById("ATTable");
		
		for( var i = 1; i< rowLength;i++){
				var cells = ATTable.rows.item(i).cells;
				var thisAT = getTextFromLink(cells.item(1).innerHTML);
				
				console.log ("looping..."+i+" "+cells.item(1).innerHTML);
				if(thisAT == AT)
				{
					console.log(AT);
					if(title == getTextFromLink(cells.item(2).innerHTML)){
						document.getElementById("Primary").value = item;
						return false;
					}else if(title == getTextFromLink(cellsitem(3).innerHTML)){
						document.getElementById("Secondary").value = item;
						return false;
						
					}else{
						alert("This Power set does not match your AT");
						return false;
					}
					
					
				}else{
						alert("This Power set does not match your AT");
						return false;
					}
		
			}
		}
		
	if(title=="Primary" || title == "Secondary"){document.getElementById(title+"Table").style.display = "block"; return false;}
	else{document.getElementById(title).value = item;}
	return false;
*/
}

function getTextFromLink(item){
	
	var returnValue = item.split(">")[1].split("<")[0];
	console.log("item:"+returnValue);
	
	return returnValue;
}

function loadAction(){
	ClearCharacter();
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
