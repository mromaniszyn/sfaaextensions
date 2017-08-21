var getWorksFromBuild = () => {
	function getVisibleWorksFromBuild() {
		var showMoreButtons = document.getElementsByClassName("pShowMore");
		if (showMoreButtons.length < 1) {
			clearInterval(interval);
			
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
			var itemsLength = items.length;
			if (itemsLength > 2) {
				items = items.substring(0, itemsLength - 3);
			}
			SFAA.copyText(items);
		}
	};
	var showMoreButtons = document.getElementsByClassName("pShowMore");
	if (showMoreButtons.length > 0) {
		showMoreButtons[0].getElementsByTagName("a")[0].click();
	}
	var interval = setInterval(getVisibleWorksFromBuild, 150);
};

var addBuildNameButtons = () => {
		var div = SFAA.gCF('content');
		if(!(div && div.tagName === 'DIV')){
			return;
		}
		var buildNameNode = SFAA.gChT(div, 'H2');

		SFAA.createCopyButton(buildNameNode, 'Copy Build Name', 'Copy Build Name to clipboard', () => { return buildNameNode.innerHTML; });
	};

if ((SFAA.getView() === SFAA.consts.views.build)) {
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
	
	addBuildNameButtons();
}