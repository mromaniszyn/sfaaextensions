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
	
	var addCopyWorkId = () => {
		var div = SFAA.gCF('content');
		if(!(div && div.tagName === 'DIV')){
			return;
		}
		var workIdNode = SFAA.gChT(div, 'H2');

		createButton(workIdNode, 'Copy Work Id', 'Copy the Work Id to you clipboard', () => { return workIdNode.innerHTML; });
		createButton(workIdNode, 'Copy Work Id And Url', 'Copy "the Work Id + space + url to it" to you clipboard', () => {return workIdNode.innerHTML + ' ' + workIdNode.baseURI; });
		
	};
	
	addCopyWorkId();
	
	return {
		
	};
}();