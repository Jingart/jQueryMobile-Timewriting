
	//var workData;
	//var selectedEmployee;


	function appendEmployeeToList(onClickFunction, employeeName, employeePosition){
		
		$('ul#emplistview').append('<li><a onClick="' + onClickFunction + '">' +
		        '<img src="css/images/person_placeholder.png" title="sample"/>' +
		        '<h3 id="name">'+ employeeName +'</h3>' +
		        '<p id="position">'+ employeePosition +'</p>' +
	        '</a>' +
	    '</li>');	
	}

/*

*/
		
	//TODO cleanup
	function setWorkingdayStatus(remainingWork, expectedWork, savedWork, workDate, day)
	{

		if(compareDateLess(workDate, currentCalendarViewDate))
		{
			//console.log("less then current_date");
			
			if(compareDateGreater(workDate, initialCalendarViewDate))//new Date()))	
			{	
				setWorkingdayColor(remainingWork, expectedWork, savedWork, day);
				calendar.setButtonOpacity(day + 1, 0.3);
			}else
				setWorkingdayColor(remainingWork, expectedWork, savedWork, day);
			
		}
		else if(compareDateEq(workDate, initialCalendarViewDate))//new Date()))	
		{
			calendar.setButtonCurrentDayColor(day + 1);
		}
		else if(compareDateEq(workDate, currentCalendarViewDate))	
		{
			if(compareDateGreater(workDate, initialCalendarViewDate))//new Date()))	
			{	
				setWorkingdayColor(remainingWork, expectedWork, savedWork, day);
				calendar.setButtonOpacity(day + 1, 0.3);
			}else
				setWorkingdayColor(remainingWork, expectedWork, savedWork, day);
		}
		else if(compareDateGreater(workDate, initialCalendarViewDate))//new Date()))	
	    {
			setWorkingdayColor(remainingWork, expectedWork, savedWork, day);
			calendar.setButtonOpacity(day + 1, 0.3);	
	    }
	}
	
	
	function setWorkingdayColor(remainingWork, expectedWork, savedWork, day)
	{
		
		day += 1;
		if(remainingWork >= expectedWork && expectedWork > 0 && savedWork < expectedWork)
			calendar.setButtonMissingColor(day);
		else if(remainingWork < expectedWork && remainingWork > 0 && savedWork < expectedWork)
			calendar.setButtonIncompleteColor(day);
		else if(remainingWork == 0)
			calendar.setButtonCompleteColor(day);
		
		else if(savedWork > expectedWork)
			calendar.setButtonOvertimeColor(day);
		
	}