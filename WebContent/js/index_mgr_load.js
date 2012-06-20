	
	$(document).ready(function(){
    	//$.mobile.showPageLoadingMsg(); 
		getManagerData();
		//$.mobile.hidePageLoadingMsg();
    });
	
	
	$(document).ready(function(){
		getEmployeeDataList();
	});
	
	
	function displayCalendarPage(employeeNumber)
	{
		
		cal_current_date = new Date(); 
		
		//getEmployeeDataAtr(employee_num);
		loadEmployeeDetails(employeeNumber);
		
		var cal = new Calendar();
		cal.generateHTML();
	  							  
		$('#calendardiv').html(cal.getHTML());
		
		getWorkMgrData(employeeNumber, getDateString(cal_initial_date));

		$.mobile.changePage( "#calendarview", { allowSamePageTransition: true, transition: "slide" });
		$("#calendartable").trigger("create");

	}