
	function dataProcess(){

		var workData;

		this.getWorkdataForDay = function(day)
		{
			var workDate;
		 	for (var i = 0; i < workData.itab.length; i++)
			{
		 		workDate = convertToDate(workData.itab[i].workdate);
		 		
		 		if(workDate.getDate() == day){
		 			return new DayData(workData.itab[i].worksaved, workData.itab[i].remainingwork, workData.itab[i].workexpected);
		 		}
			} 	
		}


		this.workDataCallback = function(response)
		{
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
		

		this.dateWorkDataCallback = function(response)
		{
			var workDateData = response;
			
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
		
		
		this.employeeDataCallback = function(response)
		{
			
			$("li#perno_emp").html(response.perno);
			$("li#name_emp").html(response.firstname + ' ' + response.last_name);
			$("li#position_emp").html(response.position);
			
		}
		

		this.managerDataCallback = function(response)
		{
			
			$("li#perno_mgr").html(response.perno);
			$("li#name_mgr").html(response.firstname + ' ' + response.last_name);
			$("li#position_mgr").html(response.position);
			
		}

		
		//TODO: add functionality for managar click?
		this.employeeMemberListCallback = function(response)
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
	}