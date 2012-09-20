	

	$(document).ready(function(){
		loadManagerDetails();
    });
	
	
	$(document).ready(function(){
		loadEmployeeMemberList();
	});
	
	
	function displayCalendarPage(employeeNumber)
	{
		
		currentCalendarViewDate = new Date(); 
		
		loadEmployeeDetails(employeeNumber);
		
		var cal = new Calendar();
		cal.generateHTML();	  							  
		$('#calendardiv').html(cal.getHTML());
		
		loadEmployeeWorkHours(employeeNumber, getDateString(initialCalendarViewDate));

		$.mobile.changePage( "#calendarview", { allowSamePageTransition: true, transition: "slide" });
		$("#calendartable").trigger("create");

	}