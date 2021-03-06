	

	$(document).ready(function(){
		dataCollector.loadManagerDetails();
    });
	
	
	$(document).ready(function(){
		dataCollector.loadManagerEmployeeList();
	});
	
	
	function displayReset()
	{
		$("li#perno_mgr_sub").html("");
		$("li#name_mgr_sub").html("");
		$("li#position_mgr_sub").html("");

		$("#submgrtxt").css('visibility', 'hidden');
		$('ul#emplistview').empty();
		dataCollector.loadManagerEmployeeList();
	}

	function displaySubManager(managerNumber, index)
	{
		$('ul#emplistview').empty();

		var mgr = dataProcessor.getEmployeeListData(index);

		$('ul#emplistview').append('<li id="emplistManager">' +
		        '<h3 id="name">'+ mgr.username +'</h3>' +
		        '<p id="position">'+ mgr.position +'</p>' +
	    	'</li>');	

	    var userImage = loadUserImage(mgr.shortname);
	    $("#emplistManager").append(userImage);
	    $('ul#emplistview').append('<li data-role="list-divider" role="heading" class="ui-li ui-li-divider ui-bar-c"></li>');
	    //document.getElementById("emplistManager").style.background = 'rgba(154, 204, 238, 0.4)';

	    $('ul#emplistview').listview('refresh');

		dataCollector.loadSubManagerEmployeeList(managerNumber);
	}


	function displayCalendarPage(employeeNumber)
	{
		currentCalendarViewDate = new Date(); 
		
		dataCollector.loadEmployeeDetails(employeeNumber);
		
		calendar.generateHTML();	  							  
		$('#calendardiv').html(calendar.getHTML());
		dataCollector.loadEmployeeWorkHours(employeeNumber, getDateString(initialCalendarViewDate));

		$.mobile.changePage( "#calendarview", { allowSamePageTransition: true, transition: "slide" });
		$("#calendartable").trigger("create");
	}


	function displayPreviousMonth()
	{		 
		var calendarMonth = currentCalendarViewDate.getMonth();			
		var calendarYear = currentCalendarViewDate.getFullYear();

		if(calendarMonth == 0)
		{
			calendarYear--;
			calendarMonth = "12";
		}
		
		// Javadate starts at 0
		calendar.updateCalanderDate(calendarYear, calendarMonth - 1);
		calendar.updateCalendar(true);				  

		var dateString = buildDateString(calendarYear, calendarMonth);	

		dataCollector.loadEmployeeWorkHours(selectedEmployee, dateString);
	}
		
		
	function displayNextMonth()
	{
		var calendarMonth = currentCalendarViewDate.getMonth();			
		var calendarYear = currentCalendarViewDate.getFullYear();
		
		if(calendarMonth == 11)
		{
			calendarYear++;
			calendarMonth = -1;
		}
		
		// Javadate starts at 0
		calendar.updateCalanderDate(calendarYear, calendarMonth + 1);
		calendar.updateCalendar(false);	

		var dateString = buildDateString(currentCalendarViewDate.getFullYear(), currentCalendarViewDate.getMonth() + 1);		

		dataCollector.loadEmployeeWorkHours(selectedEmployee, dateString);
	}


	function displayDayPage( day, month, year)
	{
			var dayData = dataProcessor.getWorkdataForDay(day);
					
			dataCollector.loadWorkHourDetails(year + '' + padZeroFront(month + 1) + '' + padZeroFront(day));
		
			$.mobile.changePage( "#daypage", { allowSamePageTransition: true,
			    							   transition: "slideup" });

			$("h1#dateheader").text(getCalendarString(day, month, year));
			$("li#comp").text("Saved: " + dayData.savedWork + 'h');
			$("li#missing").text("Expected: " + dayData.expectedWork + 'h');
			$("li#rem").text("Remaining: " + dayData.remainingWork + 'h');
			
			$("#statusboxcontent").empty();
			$("#statusboxcontent").append(day);
			document.getElementById("statusbutton").style.background = document.getElementById("cal_button" + day).style.background;	
	}