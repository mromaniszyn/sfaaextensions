SFAA.workView = function(){	
	var oneWorkView = (SFAA.getView() === SFAA.consts.views.work) && (SFAA.getUrl().indexOf('visual.force.com') > -1);
	if(!oneWorkView){
		return {};
	}
	
	var addWorkIdButtons = () => {
		var div = SFAA.gCF('content');
		if(!(div && div.tagName === 'DIV')){
			return;
		}
		var workIdNode = SFAA.gChT(div, 'H2');

		SFAA.createCopyButton(workIdNode, 'Copy All Work', 'Copy "the Work Id + comma + space + Subject of Work + space + Url" to your clipboard.', () => {
			var theId = workIdNode.innerHTML;
			var subjectNode = SFAA.gE('userStoryDetailPage_userStoryWorkForm_subjectInput_inputComponent_outputStandalone_ileinner');
			if(!subjectNode){
				subjectNode = SFAA.gE('bugDetailPage_bugWorkForm_subjectInput_inputComponent_outputStandalone_ileinner');
			}			
			var subject = subjectNode.innerHTML;
			return theId + ', ' + subject + ' ' + workIdNode.baseURI;
		});
		
		SFAA.createCopyButton(workIdNode, 'Copy Work Id And Desc', 'Copy "the Work Id + comma + space + Subject of Work" to your clipboard (Used when you are committing the change)', () => {
			var theId = workIdNode.innerHTML;
			var subjectNode = SFAA.gE('userStoryDetailPage_userStoryWorkForm_subjectInput_inputComponent_outputStandalone_ileinner');
			if(!subjectNode){
				subjectNode = SFAA.gE('bugDetailPage_bugWorkForm_subjectInput_inputComponent_outputStandalone_ileinner');
			}			
			var subject = subjectNode.innerHTML;
			return theId + ', ' + subject;
		});
		SFAA.createCopyButton(workIdNode, 'Copy Work Id And Url', 'Copy "the Work Id + space + url to it" to your clipboard', () => {return workIdNode.innerHTML + ' ' + workIdNode.baseURI; });		
		SFAA.createCopyButton(workIdNode, 'Copy Work Id', 'Copy the Work Id to your clipboard', () => { return workIdNode.innerHTML; });
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
	
	var putUpdateToDesciptionOfWork = () => {
		
		var getUTCTime = () => {
			var now = new Date();
			return now.toUTCString();
		};
		
		var getUser = () => {
			var userNav = SFAA.gE('userNavLabel');
			if(userNav){
				return userNav.innerHTML;
			}
			return '';
		};
		
		var putUpdate = (textArea) => {
			var dateTime = getUTCTime();
			var who = getUser();
			var updateMsg = '\n\n===== UPDATE On:' + dateTime + ', By ' + who + '\n';
			textArea.value += updateMsg;
			
			textArea.focus();
		};

		var descTextArea = document.getElementById('userStoryWorkPage:storyWorkForm:detailsInput:formRow:input');
		if(descTextArea){
			var saveButton = SFAA.gCF('btn userStoryEditSaveButton');
			createButton(saveButton, 'Put update', 'Put infromation that you are now updating description',() => putUpdate(descTextArea), {click: true, buttonType: 'button'});
		}
		
		var readOnlydescTextArea = document.getElementById('userStoryDetailPage_userStoryWorkForm_detailsInput_inputComponent_outputStandalone_ilecell');
		
		if(readOnlydescTextArea){
			readOnlydescTextArea.addEventListener('dblclick', () => {
				
				var modalTextArea = document.getElementById('userStoryDetailPage_userStoryWorkForm_detailsInput_inputComponent_outputStandalone');
				var divParent = document.getElementById('InlineEditDialog_buttons');
				
				createButton(divParent, 'Put update', 'Put infromation that you are now updating description', () => putUpdate(modalTextArea), {click: true, buttonType: 'button'});
				
			});
		}
	};
	
	putUpdateToDesciptionOfWork();
	return {
		
	};
}();