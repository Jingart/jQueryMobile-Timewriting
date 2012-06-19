	
	$(document).ready(function(){
    	$.mobile.showPageLoadingMsg(); 
		getEmployeeData();
		$.mobile.hidePageLoadingMsg();
    });