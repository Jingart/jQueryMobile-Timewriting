
	var workData;
	var cur_selected_emp;
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
		//console.log("cal_initial_date: " + cal_initial_date);
		//console.log("cal_current_date: " + cal_current_date);

		if(compareDateLess(workDate, cal_current_date))
		{
			//console.log("less then current_date");
			
			if(compareDateGreater(workDate, cal_initial_date))//new Date()))	
			{	
				setWorkingdayColor(remainingWork, expectedWork, savedWork, day);
				setButtonOpacity(day + 1, 0.3);
			}else
				setWorkingdayColor(remainingWork, expectedWork, savedWork, day);
			
		}
		else if(compareDateEq(workDate, cal_initial_date))//new Date()))	
		{
			setButtonCurrentDayColor(day + 1);
		}
		else if(compareDateEq(workDate, cal_current_date))	
		{
			if(compareDateGreater(workDate, cal_initial_date))//new Date()))	
			{	
				setWorkingdayColor(remainingWork, expectedWork, savedWork, day);
				setButtonOpacity(day + 1, 0.3);
			}else
				setWorkingdayColor(remainingWork, expectedWork, savedWork, day);
		}
		else if(compareDateGreater(workDate, cal_initial_date))//new Date()))	
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
	 		
			//if(compareDateGreater(workDate, new Date()))	
			//	setButtonOpacity(i + 1, 0.4);
	 		
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
  				
  				//$('li#listItem' + i + '').append('<a href="acura.html"> <p> <span id="listitemheading">Network: </span> <span id="listitemvalue">' + workDateData.itab[i].network + '</span> </p>  <p> <span id="listitemheading">Activity: </span> <span id="listitemvalue">' + workDateData.itab[i].activity + '</span> </p> </a>');			
  			}
  					 		
		} 	
			 
  		
		$('ul#worklist').listview('refresh');
		
	 	//$('#calendartable').show();
  		/*
		<li data-role="list-divider" role="heading"> Thursday, October 7, 2010 </li>

		<li><a href="acura.html">Acura</a></li>
		<li><a href="audi.html">Audi</a></li>
		
		<li data-role="list-divider" role="heading"> Thursday, October 8, 2010 </li>
							
		<li><a href="bmw.html">BMW</a></li>
	 	*/
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
	
	//TODO seperate in method
	function processEmployeeDataList(response)
	{
		
		var empData = response;
		
		$('ul#emplistview').empty();
		
  		for (var i = 0; i < empData.itab.length; i++)
		{
  			if(empData.itab[i].is_manager == 'X')
  				$('ul#emplistview').append('<li><a onClick="alert(managerpage)">' +
											        '<img src="/missing_timewriting/js/images/person_placeholder.png" title="sample"/>' +
											        '<h3 id="name">'+ empData.itab[i].username +'</h3>' +
											        '<p id="position">'+ empData.itab[i].position +'</p>' +
										        '</a>' +
										    '</li>');
  			else
  			{
				$('ul#emplistview').append('<li><a onClick="displayCalendarPage(' + empData.itab[i].userid + ')">' +
											        '<img src="/missing_timewriting/js/images/person_placeholder.png" title="sample"/>' +
											        '<h3 id="name">'+ empData.itab[i].username +'</h3>' +
											        '<p id="position">'+ empData.itab[i].position +'</p>' +
										        '</a>' +
										    '</li>');
  			}
		}
		$('ul#emplistview').listview('refresh');

	}
	
	
	function getWorkMgrData( employee, date)
	{
		cur_selected_emp = employee;
		
		getDataJSON(processWorkData, 
					system  + "/resources/timewriting/managerdata/" + employee + "/" + date);
	}
	

	function getEmployeeDataList( )
	{
		getDataJSON(processEmployeeDataList, 
				    system + "/resources/timewriting/managerdata/",
					function() { $.mobile.showPageLoadingMsg(); }, 
					function() { $.mobile.hidePageLoadingMsg(); });
	}
	
	
	function getManagerData( )
	{
		getDataJSON(processManagerData, 
				    system + "/resources/timewriting/userdata");
	}
	
	
	function getEmployeeData( )
	{
		getDataJSON(processEmployeeData, system + "/resources/timewriting/userdata");
	}
	
	
	function getEmployeeDataAtr( employee )
	{
		getDataJSON(processEmployeeData, system + "/resources/timewriting/userdata/" + employee);
	}
	
		
	function getWorkData( date )
	{			
		getDataJSON(processWorkData, system + "/resources/timewriting/workdata/" + date);
	}
	
	function getDateWorkData( date )
	{			
		getDataJSON(processDateWorkData, system + "/resources/timewriting/workinfo/" + date);
	}

	
	function getDataJSON(responseFunc, url, beforeSendFunc, afterSendFunc){

		$.ajax({
				  beforeSend: beforeSendFunc,
				  complete: afterSendFunc,
			      //beforeSend: function() { $.mobile.showPageLoadingMsg(); }, //Show spinner
		          //complete: function() { $.mobile.hidePageLoadingMsg(); }, //Hide spinner
				  type: "GET",
				  dataType: 'json',
				  url: url,

				  /*statusCode: {
			            404: function() {
			                console.log("response 404!");
			            },
			            200: function() {
			                console.log("response 200!");
			            },
			            204: function() {
			                console.log("response 204!");
			            }
			      },*/
			      success: function( object ) {
			           //console.log("success");
			           
			           if(jQuery.isEmptyObject( object ))
			           	   console.log("response 204! - empty");
			           else
			        	   responseFunc(object);
			      },
			      error: function(e) {
			    	  console.log("error");
			      }
		});
		
	}
	
	
	
	
	
	
	
	/*
	function displayPreviousMonth()
	{
		var calendarMonth = cal_current_date.getMonth();			
		var calendarYear = cal_current_date.getFullYear();
		
		calendarMonth = padZeroFront(calendarMonth);
			
		if(calendarMonth == 0)
		{
			calendarYear--;
			calendarMonth = "12";
		}
		
		//$.mobile.changePage("index.html?key=" + 2, "slide", "true", "true");
		
		
		 var person={year:'2012', month:'02'};
         var params = person;
		
		  var form = document.createElement("form");
          form.setAttribute("data-transition", "fade");
          form.setAttribute("method", "get");
          form.setAttribute("action", "#home");
          form.setAttribute("ID", "asdasd");

          for(var key in params)
          {
              if(params.hasOwnProperty(key))
              {
                  var hiddenField = document.createElement("input");
                  hiddenField.setAttribute("type", "hidden");
                  hiddenField.setAttribute("name", key);
                  hiddenField.setAttribute("value", params[key]);
                  form.appendChild(hiddenField);
              }
           }
           
           document.body.appendChild(form);
           
           
        gdata = "value";   
		
		$.mobile.changePage( "#home", { allowSamePageTransition: true,
									    transition: "slide",
									    reverse: true,
									    type: "get",
									    date: $("form#asdasd").serialize() });
									    
		//post_to_url(calendarMonth, calendarYear, "#home");
		
	}
	
	
	function displayNextMonth()
	{
		var calendarMonth = cal_current_date.getMonth();
		calendarMonth += 2;
		var calendarYear = cal_current_date.getFullYear();
		
		calendarMonth = padZeroFront(calendarMonth);
		
	    if(calendarMonth > 12)
		{
			calendarYear++;
			calendarMonth = "01";
		}
		

		$.mobile.changePage( "#home", { allowSamePageTransition: true,
									    transition: "slide"} );
		//post_to_url(calendarMonth, calendarYear, "#home"); 
		
	}
	
	
    function post_to_url(m, y, destination)
	{
		  
		  var path = destination;//window.location;
          var person={year:y, month:m};
          var params = person;
          var meth = "get";
          		  
          var form = document.createElement("form");
          form.setAttribute("data-transition", "fade");
          form.setAttribute("method", meth);
          form.setAttribute("action", path);

          for(var key in params)
          {
              if(params.hasOwnProperty(key))
              {
                  var hiddenField = document.createElement("input");
                  hiddenField.setAttribute("type", "hidden");
                  hiddenField.setAttribute("name", key);
                  hiddenField.setAttribute("value", params[key]);
                  form.appendChild(hiddenField);
              }
           }
           
           document.body.appendChild(form);
           
           
           //$.mobile.changePage("#home", {transition: "none"});
		   //$('.ui-page-active').page('destroy').page();
		   //$("#postdiv").trigger("create");
		   
           form.submit();

	   }
	  
	  
	  function getUrlDate()
	  {
	  	 //TODO always returns blank at end
	  	 var urlParams = location.search.substr(1).split("&");
	  	 var dateString = new String();

		 var x=0;
		 for (x=0;x<urlParams.length;x++) 
		 {
			 var str = urlParams[x].substr(1).split("=");
			 dateString += str[1];
		 }
		 
		 if(urlParams.length == 1)
		 	dateString = "";
		 	
		 // show current day if current month
		 var date = convertToDate((dateString) + "01");
		 if(compareDateMonthEq(date, new Date()))
			dateString = "";
		     
	     return dateString;
	  }
	*/
	
	