
function toggleButton(contentID){
  var x = document.getElementById(contentID);
  
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
  
}

function ClearCharacter(){	
	  document.getElementById("Origin").value = "";
	  document.getElementById("AT").value = "";
	  document.getElementById("Primary").value = "";
	  document.getElementById("Secondary").value = "";
}

function RandomChar() {
	var epicON = document.getElementById("Epic").checked;
	
	var OrigTable = document.getElementById("OriginTable");
	var ATTable= document.getElementById("ATTable");
	
		
	if(epicON){ATTable= document.getElementById("ATEpicTable");}
	
	ClearCharacter();
	var a = randomFromTable(OrigTable);
	document.getElementById("Origin").value = OrigTable.rows.item(a).cells.item(1).innerHTML;

	var b = randomFromTable(ATTable);
	document.getElementById("AT").value = ATTable.rows.item(b).cells.item(1).innerHTML;

	var primarySet = ATTable.rows.item(b).cells.item(2).innerHTML;
	var secondarySet = ATTable.rows.item(b).cells.item(3).innerHTML;
	
	
	var PrimaryTable = document.getElementById(primarySet + "Table");
	var c = randomFromTable(PrimaryTable);
	  document.getElementById("Primary").value = PrimaryTable.rows.item(b).cells.item(1).innerHTML;
	
	
	var SecondaryTable = document.getElementById(secondarySet+ "Table");
	var d = randomFromTable(SecondaryTable);
	  document.getElementById("Secondary").value = SecondaryTable.rows.item(d).cells.item(1).innerHTML;
	
}

function randomFromTable(table){
var TAL = table.rows.length;
var max = TAL -1;
var min = 2;
var random = getRandomInt(min, max);

return random;
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}
