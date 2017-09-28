var getWorksFromBuild = () => {
	var list = document.getElementsByClassName("dataRow");
	var result = [];
	for (var i = 0; i < list.length; i++) {
		var element = list[i];
		var dataCells = element.getElementsByClassName("dataCell");
		var currentDataCell = dataCells[dataCells.length - 1];
		var aNode = element.getElementsByTagName("th")[0].getElementsByTagName("a")[0];
		var workInfo = {
			id: aNode.innerHTML,
			name: currentDataCell.innerHTML,
			href: aNode.href
		};
		result.push(workInfo);
	}	
	return result;
};

var addCopyToClipboardButton = () => {
	var items = "";
	var works = getWorksFromBuild();
	for (var i = 0, c = works.length; i < c; i++) {
		var work = works[i];
		var iPlus = i + 1;
		var itemString = iPlus + ". " + work.id + " " + work.name + "\n";
		items += itemString;
	}
	SFAA.copyText(items);
};

var addOpenAllButton = () => {
	var works = getWorksFromBuild();
	for(var i = 0, c = works.length; i < c; i++){
		var work = works[i];		
		window.open(work.href, '_blank');
	}
};

var addBuildNameButtons = () => {
	var div = SFAA.gCF('content');
	if(!(div && div.tagName === 'DIV')){
		return;
	}
	var buildNameNode = SFAA.gChT(div, 'H2');
	SFAA.createCopyButton(buildNameNode, 'Copy Build Name', 'Copy Build Name to clipboard', () => { return buildNameNode.innerHTML; });
};

var addButtonToListOfWorks = (cfg) => {
	if(!cfg){
		return;
	}
	var button = document.createElement("button");
	var buttonTextNode = document.createTextNode(cfg.buttonText);
	button.appendChild(buttonTextNode);
	button.id = cfg.buttonId;
	button.addEventListener("click", cfg.callback);
	
	var tdElement = document.createElement("td");
	tdElement.appendChild(button);
	cfg.anchor.insertAdjacentElement("afterEnd", tdElement);	
};

if ((SFAA.getView() === SFAA.consts.views.build)) {
	var pbTitles = document.getElementsByClassName("pbTitle");
	for (var i = 0, ci = pbTitles.length; i < ci; i++) {
		var pbTitle = pbTitles[i];
		var h3Elements = pbTitle.getElementsByTagName("h3");
		if (h3Elements && h3Elements.length === 1 && h3Elements[0].innerHTML === "Work (Scheduled Build)") {
			addButtonToListOfWorks({
				buttonText: "Open All Works",
				buttonId: "Open All Works In Separate Tabs",
				callback: addOpenAllButton,
				anchor: pbTitle
			});
			addButtonToListOfWorks({
				buttonText: "Copy to clipboard",
				buttonId: "copyWorksToClipboardButton",
				callback: addCopyToClipboardButton,
				anchor: pbTitle
			});

		}
	}
	
	addBuildNameButtons();
}