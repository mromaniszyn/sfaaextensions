
var getWorksFromBuild = () => {
	var list = document.getElementsByClassName("dataRow");
	var items = "";
	for (var i = 0; i < list.length; i++) {
		var element = list[i];
		var workId = element.getElementsByTagName("th")[0].getElementsByTagName("a")[0].innerHTML;
		var dataCells = element.getElementsByClassName("dataCell");
		var workName = dataCells[dataCells.length - 1].innerHTML;
		var iPlus = i + 1;
		var itemString = iPlus + ". " + workId + " " + workName + "\n";
		items += itemString;
	}
	
	SFAA.copyText(items);
};

var buildTabCollection = document.getElementsByClassName("wt-ADM_Build");
if (buildTabCollection && buildTabCollection.length === 1 && buildTabCollection[0].className.indexOf("zen-active") > -1) {
	var pbTitles = document.getElementsByClassName("pbTitle");
	for (var i = 0, ci = pbTitles.length; i < ci; i++) {
		var pbTitle = pbTitles[i];
		var h3Elements = pbTitle.getElementsByTagName("h3");
		if (h3Elements && h3Elements.length === 1 && h3Elements[0].innerHTML === "Work (Scheduled Build)") {
			var button = document.createElement("button");
			var buttonText = document.createTextNode("Copy to clipboard");
			button.appendChild(buttonText);
			button.id = "copyWorksToClipboardButton";
			button.addEventListener("click", getWorksFromBuild);
			
			var tdElement = document.createElement("td");
			tdElement.appendChild(button);
			pbTitle.insertAdjacentElement("afterEnd", tdElement);
		}
	}
}