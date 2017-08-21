var hideChatterPanel = () => {
	chrome.storage.sync.get({
		sprintsChatter: true
	}, function (items) {
		var shouldHide = items.sprintsChatter;
		if (shouldHide) {
			var sprintRightPanel = SFAA.gE("sprint_rightpanel");
			var existFeedItem = sprintRightPanel.getElementsByClassName('feeditem').length > 0;
			if (!existFeedItem) {
				sprintRightPanel.style.display = "none";
			}
		}
	});
};
var setWorkStatusesInSprintView = function(){
	var menuWork = SFAA.gE("menu_work");
	if(menuWork){
		var items = menuWork.querySelectorAll('[data-recordtypes="user_story"]');
		for(var i = 0; i < items.length; i++){
			menuWork.removeChild(items[i])
		}
		
		for(var i = 0; i < SFAA.workStatuses.length; i++){				
			for(var j = 0; j < items.length; j++){
				if(items[j].textContent === SFAA.workStatuses[i].text){
					menuWork.appendChild(items[j]);
					break;
				}
			}
		}
	}
}

var goToSingleSprint = () => {
	var xGrid3RowCollection = document.getElementsByClassName("x-grid3-row");
	if (xGrid3RowCollection && xGrid3RowCollection.length === 1 && xGrid3RowCollection[0].className.indexOf("x-grid3-row-first") > -1 && xGrid3RowCollection[0].className.indexOf("x-grid3-row-last") > -1) {
		var nameCollection = xGrid3RowCollection[0].getElementsByClassName("x-grid3-td-Name");
		if (nameCollection && nameCollection.length === 1) {
			var linkCollection = nameCollection[0].getElementsByTagName("a");
			if (linkCollection && linkCollection.length === 1) {
				linkCollection[0].click();
			}
		}
	}
};
			
if (SFAA.getView() === SFAA.consts.views.sprints) {
	setTimeout(goToSingleSprint, 200);
	
	var virtualwall = SFAA.gE('virtualwall');
	if(virtualwall){
		hideChatterPanel();
		setWorkStatusesInSprintView();
	}
}