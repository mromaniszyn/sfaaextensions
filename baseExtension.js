//var SFAA1 = {};
if (!String.prototype.format) {
  String.prototype.format = function() {
	var args = arguments;
	return this.replace(/{(\d+)}/g, function(match, number) { 
	  return typeof args[number] != 'undefined'
		? args[number]
		: match
	  ;
	});
  };
}

var SFAA = function(){

	var consts = {
		views: {
			home: 'Home',
			work: 'Work',
			build: 'Builds',
			sprints: 'Sprints',
		}
	};

	
	var docs = {};	
	docs.gE = function(elementId){
		return document.getElementById(elementId);
	};

	docs.gC = (clsName) => { 
		return document.getElementsByClassName(clsName);
	};
	
	docs.getByClassFirst = (clsName) =>{
		var elems = docs.gC(clsName);
		if(elems && elems.length === 1){
			return elems[0];
		}
		return;
	};
	
	docs.body = () => {
		return document.body;
	};
	
	docs.add = (node, tagName) => {
		var newNode = document.createElement(tagName);
		node.appendChild(newNode);
		return newNode;
	};

	docs.del = (node, toRemove) => {
		node.removeChild(toRemove);
	};

	
	docs.addAfter = (node, tagName) => {
		var newNode = document.createElement(tagName);
		node.parentNode.insertBefore(newNode, node.nextSibling);
		return newNode;
	};
	
	docs.addClick = (node, callback) => {
		node.addEventListener('click', callback );
	};
	
	var htmls = {};
	htmls.getChildByTagName = (node, tag) => {
		for(var i=0, ci=node.childNodes.length; i<ci ; i++){
			var child = node.childNodes[i];
			if(child && child.tagName === tag){
				return child;
			}
		}
	};
	
	var winds = {};
	winds.getUrl = () => {
		return window.location.href; 
	};
	
	var tryIt = function(callback){
		try {
			var result = callback();
			return result;
		} catch (err) {
			console.log(err);
		}

	};
	
	
	var copyTextToClipboard = (txt, url) => {
		 var b = docs.body();
		// //var textArea = document.createElement("textarea");
		var txtarea = docs.add(b, 'textarea');
		txtarea.style.position = 'fixed';
		txtarea.style.top = 0;
		txtarea.style.left = 0;
		txtarea.style.width = '2em';
		txtarea.style.height = '2em';
		txtarea.style.padding = 0;
		txtarea.style.border = 'none';
		txtarea.style.outline = 'none';
		txtarea.style.boxshadow = 'none';
		txtarea.style.background = 'transparent';
		txtarea.value = txt;
		
		//document.body.appendChild(textArea);
		txtarea.select();
		
		tryIt( () => document.execCommand('copy')  );
				
		docs.del(b, txtarea);
		// //document.body.removeChild(textArea);
		
		
		// tryIt( (ev) => {
			// var u = 'http://qg.com';
			// var t = 'hh';
			// var c = ev.clipboardData || window.clipboardData;
			// if(c){
				// c.setData('Text', u);
			// }
		// } );
		
	};
	
	var hasClass = (node, clsName) => {
		return (' ' + node.className + ' ').indexOf(' ' + clsName + ' ') > -1;
	};
	
	var getView = function(){
		return tryIt( () => {
			var list = docs.gE('tabBar');
			var children = list.childNodes;
			for(var i = 0, ci= children.length; i<ci;i++){
				var child = children[i];
				if(child && child.tagName === "LI" && hasClass(child, 'zen-active') ){
					return child.firstChild.innerText;
				}
			}
			var pageType = document.getElementsByClassName('pageType')[0];
			return pageType.childNodes[0].nodeValue;
		});
	};
	
	var workStatuses = [{ text:"New"},
		{ text:"Ready"},
		{ text:"In Progress"},
		{ text:"Code Complete"},
		{ text:"Ready for Review"},
		{ text:"Code Review Completed"},
		{ text:"Ready for QA"},
		{ text:"QA In Progress"},
		{ text:"QA Complete"},
		{ text:"QA Failed"},
		{ text:"Pending Release"},
		{ text:"Closed"},
		{ text:"--None--"},
		{ text:"Acknowledged"},
		{ text:"Blocked"},
		{ text:"Duplicate"},
		{ text:"Fixed"},
		{ text:"Integrate"},
		{ text:"Never"},
		{ text:"Planning"},
		{ text:"Triaged"},
		{ text:"Waiting"}];
		
	var workStatusPattern = '<option value="{0}">{0}</option>';	
			
	var setWorkStatusesInSprintView = function(){
		var menuWork = docs.gE("menu_work");
		if(menuWork){
			var items = menuWork.querySelectorAll('[data-recordtypes="user_story"]');
			for(var i = 0; i < items.length; i++){
				menuWork.removeChild(items[i])
			}
			
			for(var i = 0; i < workStatuses.length; i++){				
				for(var j = 0; j < items.length; j++){
					if(items[j].textContent === workStatuses[i].text){
						menuWork.appendChild(items[j]);
						break;
					}
				}
			}
		}
	}
			
	var setWorkStatusesInWork = function(){
		var menuWork = docs.gE('userStoryDetailPage_userStoryWorkForm_statusInput_inputComponent_outputWithContainer');
		if(!menuWork){
			menuWork = docs.gE('userStoryWorkPage:storyWorkForm:statusInput:inputComponent:inputFieldWithContainer');
		}
		if(menuWork){
			var selected = menuWork.selectedOptions[0].value;
			menuWork.innerHTML = "";
			
			for(var i = 0; i < workStatuses.length; i++){		
				var item = workStatusPattern.format(workStatuses[i].text);
				menuWork.innerHTML += item;
			}
			
			for(var i = 0; i < menuWork.childNodes.length; i++){		
				if(menuWork.childNodes[i].value === selected){
					menuWork.childNodes[i].selected = true;
				}
			}
		}
	}
	
	return {
		consts: consts,
		gE : docs.gE,
		gC : docs.gC,
		gCF : docs.getByClassFirst,
		addAfter : docs.addAfter,
		addClick : docs.addClick,
		
		gChT : htmls.getChildByTagName,
		
		getUrl : winds.getUrl,
		
		
		copyText : copyTextToClipboard,
		getView : getView,
		
		setWorkStatusesInSprintView : setWorkStatusesInSprintView,
		setWorkStatusesInWork: setWorkStatusesInWork
	};
}();


//alert("SFAA 08" + SFAA.getView());
//alert("SFAA 06");

