var sprintTabCollection = document.getElementsByClassName("wt-ADM_Sprint");
if (sprintTabCollection && sprintTabCollection.length === 1 && sprintTabCollection[0].className.indexOf("zen-active") > -1) {
	var xGrid3RowCollection = document.getElementsByClassName("x-grid3-row");
	if (xGrid3RowCollection && xGrid3RowCollection.length === 1 && xGrid3RowCollection[0].className.indexOf("x-grid3-row-first") > -1&& xGrid3RowCollection[0].className.indexOf("x-grid3-row-last") > -1) {
		var nameCollection = xGrid3RowCollection[0].getElementsByClassName("x-grid3-td-Name");
		if (nameCollection && nameCollection.length === 1) {
			var linkCollection = nameCollection[0].getElementsByTagName("a");
			if (linkCollection && linkCollection.length === 1) {
				linkCollection[0].click();
			}
		}
	}
}