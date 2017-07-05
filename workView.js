SFAA.workView = function(){	
	var oneWorkView = (SFAA.getView() === SFAA.consts.views.work) && (SFAA.getUrl().indexOf('visual.force.com') > -1);
	if(!oneWorkView){
		return {};
	}
	
	var createButton = (parentNode, description, title, txtGetter) => {
		var btn = SFAA.addAfter(parentNode, 'BUTTON');
		btn.innerHTML = description;
		btn.title = title;
		
		SFAA.addClick(btn, () => {
			var txt = txtGetter();
			SFAA.copyText(txt);
		});
		
	};
	
	var addWorkIdButtons = () => {
		var div = SFAA.gCF('content');
		if(!(div && div.tagName === 'DIV')){
			return;
		}
		var workIdNode = SFAA.gChT(div, 'H2');

		createButton(workIdNode, 'Copy All Work', 'Copy "the Work Id + comma + space + Subject of Work + space + Url" to your clipboard.', () => {
			var theId = workIdNode.innerHTML;
			var subjectNode = SFAA.gE('userStoryDetailPage_userStoryWorkForm_subjectInput_inputComponent_outputStandalone_ileinner');
			if(!subjectNode){
				subjectNode = SFAA.gE('bugDetailPage_bugWorkForm_subjectInput_inputComponent_outputStandalone_ileinner');
			}			
			var subject = subjectNode.innerHTML;
			return theId + ', ' + subject + ' ' + workIdNode.baseURI;
		});
		
		createButton(workIdNode, 'Copy Work To Commit', 'Copy "the Work Id + comma + space + Subject of Work" to your clipboard (Used when you are committing the change)', () => {
			var theId = workIdNode.innerHTML;
			var subjectNode = SFAA.gE('userStoryDetailPage_userStoryWorkForm_subjectInput_inputComponent_outputStandalone_ileinner');
			if(!subjectNode){
				subjectNode = SFAA.gE('bugDetailPage_bugWorkForm_subjectInput_inputComponent_outputStandalone_ileinner');
			}			
			var subject = subjectNode.innerHTML;
			return theId + ', ' + subject;
		});
		createButton(workIdNode, 'Copy Work Id And Url', 'Copy "the Work Id + space + url to it" to your clipboard', () => {return workIdNode.innerHTML + ' ' + workIdNode.baseURI; });		
		createButton(workIdNode, 'Copy Work Id', 'Copy the Work Id to your clipboard', () => { return workIdNode.innerHTML; });
	};
	
	addWorkIdButtons();
	
	var userStoryDetailPage = document.getElementById('userStoryDetailPage:userStoryWorkForm:statusInput:inputComponent:outputWithContainer');
			
	var workStatusPattern = '<option value="{0}">{0}</option>';	
			
	var setWorkStatusesInWork = function(){
		var menuWork = SFAA.gE('userStoryDetailPage_userStoryWorkForm_statusInput_inputComponent_outputWithContainer');
		if(!menuWork){
			menuWork = SFAA.gE('userStoryWorkPage:storyWorkForm:statusInput:inputComponent:inputFieldWithContainer');
		}
		if(menuWork){
			var selected = menuWork.selectedOptions[0].value;
			menuWork.innerHTML = "";
			
			for(var i = 0; i < SFAA.workStatuses.length; i++){		
				var item = workStatusPattern.format(SFAA.workStatuses[i].text);
				menuWork.innerHTML += item;
			}
			
			for(var i = 0; i < menuWork.childNodes.length; i++){		
				if(menuWork.childNodes[i].value === selected){
					menuWork.childNodes[i].selected = true;
				}
			}
		}
	}
	
	if(userStoryDetailPage){
		userStoryDetailPage.children[0].addEventListener("dblclick", function(){
			setWorkStatusesInWork();
		});
	}else{
		setWorkStatusesInWork();
	}
	
	return {
		
	};
}();