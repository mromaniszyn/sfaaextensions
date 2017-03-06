SFAA.workView = function(){	
	var oneWorkView = (SFAA.getView() === SFAA.consts.views.work) && (SFAA.getUrl().indexOf('quad--agf.na16.visual.force.com') > -1);
	if(!oneWorkView){
		return {};
	}
	
	var addCopyWorkId = () => {
		var div = SFAA.gCF('content');
		if(!(div && div.tagName === 'DIV')){
			return;
		}
		var workIdNode = SFAA.gChT(div, 'H2');
		//alert(workIdNode);
		
		var btn = SFAA.addAfter(workIdNode, 'BUTTON');
		btn.innerHTML = 'COPY';
		btn.title = 'Ctrl + A + W';
		SFAA.addClick(btn, () => {
			var txt = workIdNode.innerHTML;
			SFAA.copyText(txt);
		});
	};
	
	
	var keyboardListener = () => {
		document.onkeypress = (ev) => {
			ev = ev || window.event;
			var charCode = (typeof ev.which == "number") ? ev.which : ev.keyCode;
			if (charCode) {
				// alert(charCode + " Character typed: " + String.fromCharCode(charCode));
			}
		};
	};
	
	addCopyWorkId();
	keyboardListener();
	
	return {
		
	};
}();