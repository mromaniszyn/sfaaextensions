SFAA.workView = function(){	
	var oneWorkView = (SFAA.getView() === SFAA.consts.views.work) && (SFAA.getUrl().indexOf('quad--agf.na16.visual.force.com') > -1);
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
	
	return {
		
	};
}();