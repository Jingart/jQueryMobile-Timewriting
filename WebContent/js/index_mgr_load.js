	
	$(document).ready(function(){
    	//$.mobile.showPageLoadingMsg(); 
		getManagerData();
		//$.mobile.hidePageLoadingMsg();
    });
	
	
	$(document).ready(function(){
		getEmployeeDataList();
	});
	
	
	function displayCalendarPage(employee_num)
	{
		
		cal_current_date = new Date(); 
		
		//$.mobile.showPageLoadingMsg();
		
		getEmployeeDataAtr(employee_num);
		
		var cal = new Calendar();
		cal.generateHTML();
	  							  
		$('#calendardiv').html(cal.getHTML());
		
		getWorkMgrData(employee_num, getDateString(cal_initial_date));

		$.mobile.changePage( "#calendarview", { allowSamePageTransition: true, transition: "slide" });
		$("#calendartable").trigger("create");
		//updateCalendar(false);	
		//getWorkData(getDateString(cal_initial_date));
	}