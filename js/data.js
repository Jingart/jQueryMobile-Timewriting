
	//var workData;
	//var selectedEmployee;

    setListItemColor = function(index, color) 
	{
		document.getElementById("emplistitem" + index).style.background = color;
	}


	loadUserImage = function(shortname){
		//var wrap = $('<p class="imagewrapper"></p>');
		var img = $('<img id="userimage" src="http://mysite.statoil.com/User%20Photos/Profile%20Pictures/STATOIL-NET_'+shortname+'_LThumb.jpg"/>');

		$(img).bind({
		    //load: function() {},
		    error: function() {
		        $(this).unbind("error").attr("src", "css/images/person_placeholder2.png");
		    }
		});

		//$(wrap).append(img);

		return img;
	}


	appendEmployeeToList = function(onClickFunction, employee, index){

		$('ul#emplistview').append('<li><a id="emplistitem'+index+'" onClick="' + onClickFunction + '">' +
		        '<h3 id="name">'+ employee.username +'</h3>' +
		        '<p id="position">'+ employee.position +'</p>' +
	        '</a>' +
	    '</li>');

		var userImage = loadUserImage(employee.shortname);
	    $("#emplistitem" + index).append(userImage);
	}


	//TODO cleanup
	setWorkingdayStatus = function(remainingWork, expectedWork, savedWork, workDate, day)
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
	
	
	setWorkingdayColor = function(remainingWork, expectedWork, savedWork, day)
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
