
	var workData;
	var selectedEmployee;
	var system = '/Q83';
	
	
	function padZeroFront(str)
	{
		
		if(str < 10)
			str = "0" + str;
		
		return str;
		
	}
	
	function trimLeadingZero(str)
	{
		
	  	 while(str.charAt(0) == '0' && str.length > 1)
	  		str = str.substr(1);
		
	  	 return str;
	}
		
	//TODO cleanup
	function setWorkingdayStatus(remainingWork, expectedWork, savedWork, workDate, day)
	{
		
		//console.log("workDate: " + workDate);
		//console.log("initialCalendarViewDate: " + initialCalendarViewDate);
		//console.log("currentCalendarViewDate: " + currentCalendarViewDate);

		if(compareDateLess(workDate, currentCalendarViewDate))
		{
			//console.log("less then current_date");
			
			if(compareDateGreater(workDate, initialCalendarViewDate))//new Date()))	
			{	
				setWorkingdayColor(remainingWork, expectedWork, savedWork, day);
				setButtonOpacity(day + 1, 0.3);
			}else
				setWorkingdayColor(remainingWork, expectedWork, savedWork, day);
			
		}
		else if(compareDateEq(workDate, initialCalendarViewDate))//new Date()))	
		{
			setButtonCurrentDayColor(day + 1);
		}
		else if(compareDateEq(workDate, currentCalendarViewDate))	
		{
			if(compareDateGreater(workDate, initialCalendarViewDate))//new Date()))	
			{	
				setWorkingdayColor(remainingWork, expectedWork, savedWork, day);
				setButtonOpacity(day + 1, 0.3);
			}else
				setWorkingdayColor(remainingWork, expectedWork, savedWork, day);
		}
		else if(compareDateGreater(workDate, initialCalendarViewDate))//new Date()))	
	    {
			setWorkingdayColor(remainingWork, expectedWork, savedWork, day);
			setButtonOpacity(day + 1, 0.3);	
	    }
	}
	
	
	function setWorkingdayColor(remainingWork, expectedWork, savedWork, day)
	{
		
		day += 1;
		if(remainingWork >= expectedWork && expectedWork > 0 && savedWork < expectedWork)
			setButtonMissingColor(day);
		else if(remainingWork < expectedWork && remainingWork > 0 && savedWork < expectedWork)
			setButtonIncompleteColor(day);
		else if(remainingWork == 0)
			setButtonCompleteColor(day);
		
		else if(savedWork > expectedWork)
			setButtonOvertimeColor(day);
		
	}
	
	
	function DayData(savedWork, remainingWork, expectedWork) {
		this.remainingWork = remainingWork;
		this.expectedWork = expectedWork;
		this.savedWork = savedWork;
	}
	
	
	function getWorkdataForDay(day)
	{
		var workDate;
		
	 	for (var i = 0; i < workData.itab.length; i++)
		{
	 		
	 		workDate = convertToDate(workData.itab[i].workdate);
	 		
	 		if(workDate.getDate() == day)
	 		{
	 			
	 			return new DayData(workData.itab[i].worksaved, workData.itab[i].remainingwork, workData.itab[i].workexpected);
	 			
	 		}
	 		
		} 	
	 	
	}

	
	function processWorkData(response) { 

		//Workdata is global
		workData = response;
		
	 	for (var i = 0; i < response.itab.length; i++)
		{
	 		
	 		var workDate = convertToDate(response.itab[i].workdate);
	 		
	 		setWorkingdayStatus(response.itab[i].remainingwork,
	 							response.itab[i].workexpected,
	 							response.itab[i].worksaved,
	 							workDate,
	 							i);
	 		
		} 	
	 
	 	$('#calendartable').show();
	 	
	}
	
	
	function processDateWorkData(response) { 

		//Workdata is global
		workDateData = response;
		
		$('ul#worklist').empty();
		
  		for (var i = 0; i < workDateData.itab.length; i++)
		{
  			$('ul#worklist').append('<li data-role="list-divider" role="heading"> Kl.' + workDateData.itab[i].starttime + ' - ' + workDateData.itab[i].endtime + '</li>');
			$('ul#worklist').append('<li id="listItem' + i + '"></li>');
			
  			if(!jQuery.isEmptyObject( workDateData.itab[i].wbs_element))
  			{
  				$('li#listItem' + i + '').append('<a href="acura.html"> <p id="listTextComment'+ i +'"></p> <p id="listTextWBS'+ i +'"></p> </a>');	
  				
  				$('p#listTextComment' + i + '').append('<span id="listitemheading">Comment: </span>');
  				$('p#listTextComment' + i + '').append('<span  id="listitemvalue">' + workDateData.itab[i].ltxa1 + '</span>');
  							 
  				$('p#listTextWBS' + i + '').append('<span id="listitemheading">WBS: </span>');
  				$('p#listTextWBS' + i + '').append('<span id="listitemvalue">' + workDateData.itab[i].wbs_element + '</span>');
  			}
  			else
  			{
  				$('li#listItem' + i + '').append('<a href="acura.html"> <p id="listTextComment2'+ i +'"></p> <p id="listTextNetwork'+ i +'"></p> <p id="listTextActivity'+ i +'"></p> </a>');	
  				
  				$('p#listTextComment2' + i + '').append('<span id="listitemheading">Comment: </span>');
  				$('p#listTextComment2' + i + '').append('<span  id="listitemvalue">' + workDateData.itab[i].ltxa1 + '</span>');
  				
  				$('p#listTextNetwork' + i + '').append('<span id="listitemheading">Network: </span>');
  				$('p#listTextNetwork' + i + '').append('<span  id="listitemvalue">' + workDateData.itab[i].network + '</span>');
  				
  				$('p#listTextActivity' + i + '').append('<span id="listitemheading">Activity: </span>');
  				$('p#listTextActivity' + i + '').append('<span id="listitemvalue">' + workDateData.itab[i].activity + '</span>');
		
  			}
  					 		
		} 	
			 
  		
		$('ul#worklist').listview('refresh');

	}
	
	
	function processEmployeeData(response)
	{
		
		$("li#perno_emp").html(response.perno);
		$("li#name_emp").html(response.firstname + ' ' + response.last_name);
		$("li#position_emp").html(response.position);
		
	}
	
	
	function processManagerData(response)
	{
		
		$("li#perno_mgr").html(response.perno);
		$("li#name_mgr").html(response.firstname + ' ' + response.last_name);
		$("li#position_mgr").html(response.position);
		
	}

	
	//TODO: add functionality for managar click?
	function processEmployeeMemberList(response)
	{
		
		var empData = response;	
		$('ul#emplistview').empty();
		
  		for (var i = 0; i < empData.itab.length; i++)
		{
  			if(empData.itab[i].is_manager == 'X'){
  				appendEmployeeToList('', empData.itab[i].username, empData.itab[i].position);
  			}
  			else{
  				appendEmployeeToList('displayCalendarPage(' + empData.itab[i].userid + ');', empData.itab[i].username, empData.itab[i].position);
  			}
		}
  		
		$('ul#emplistview').listview('refresh');

	}
	
	
	function appendEmployeeToList(onClickFunction, employeeName, employeePosition){
		
		$('ul#emplistview').append('<li><a onClick="' + onClickFunction + '">' +
		        '<img src="/missing_timewriting/js/images/person_placeholder.png" title="sample"/>' +
		        '<h3 id="name">'+ employeeName +'</h3>' +
		        '<p id="position">'+ employeePosition +'</p>' +
	        '</a>' +
	    '</li>');
		
	}
	

	function loadEmployeeWorkHours( employee, date)
	{
		selectedEmployee = employee;
		
		databaseAjaxCall(processWorkData, 
						 system  + "/resources/timewriting/managerdata/" + employee + "/" + date);
	}
	

	function loadEmployeeMemberList( )
	{
		databaseAjaxCall(processEmployeeMemberList, 
						 system + "/resources/timewriting/managerdata/",
						 function() { $.mobile.showPageLoadingMsg(); }, 
						 function() { $.mobile.hidePageLoadingMsg(); });
	}
	

	function loadManagerDetails( )
	{
		databaseAjaxCall(processManagerData, system + "/resources/timewriting/userdata");
	}
	
	
	function loadEmployeeDetails( employee )
	{
		databaseAjaxCall(processEmployeeData, system + "/resources/timewriting/userdata/" + employee);
	}

	
	function loadWorkHourDetails( date )
	{			
		databaseAjaxCall(processDateWorkData, system + "/resources/timewriting/workinfo/" + date);
	}
	 
	
	function databaseAjaxCall(responseFunc, url, beforeSendFunc, afterSendFunc){

		$.ajax({
				  beforeSend: beforeSendFunc,
				  complete: afterSendFunc,

				  type: "GET",
				  dataType: 'json',
				  url: url,
			      success: function( object ) {

			           if(jQuery.isEmptyObject( object ))
			           	   console.log("response 204! - empty");
			           else
			        	   responseFunc(object);
			      },
			      error: function(e) {
			    	  console.log("error");
			      }
		});
		
	};
	
	