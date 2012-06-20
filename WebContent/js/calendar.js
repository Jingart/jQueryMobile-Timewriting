


		cal_days_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		
		cal_months_labels = ['January', 'February', 'March', 'April',
		                     'May', 'June', 'July', 'August', 'September',
		                     'October', 'November', 'December'];
		
		cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

		currentCalendarViewDate = new Date();
		initialCalendarViewDate = new Date(); 
		
		function Calendar(day, month, year) 
		{
					
			  this.day = (isNaN(month) || day == null) ? currentCalendarViewDate.getDay() : day;
			  this.month = (isNaN(month) || month == null) ? currentCalendarViewDate.getMonth() : month;
			  this.year  = (isNaN(year) || year == null) ? currentCalendarViewDate.getFullYear() : year;
			  this.html = '';
			  
		}
				
		
		Calendar.prototype.generateHTML = function()
		{
		
			  // get first day of month
			  var firstDay = new Date(this.year, this.month, 1);
			  var startingDay = firstDay.getDay();
			  
			  // find number of days in month
			  var monthLength = cal_days_in_month[this.month];
			  
			  // compensate for leap year
			  if (this.month == 1) { // February only!
			    if((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0){
			      monthLength = 29;
			    }
			  }

			  var monthName = cal_months_labels[this.month]
			  var html = '<table id="calendartable" class="calendar-table" width=100%>';
			  html += '<tr><th colspan="7">';
			  
			  //html += '<div id="calendarDiv" data-role="controlgroup" data-type="horizontal">';
			  //html += '<button id="calendarDisplayPrevious" onClick="displayPreviousMonth()" data-icon="arrow-l"></button>';
			  html += monthName + "&nbsp;" + this.year;
			  //html += '<button id="calendarDisplayNext" onClick="displayNextMonth()" data-icon="arrow-r"></button>';
			  //html += '</div>';
			  


			  html += '<tr class="calendar-header">';
			  
			  for(var i = 0; i <= 6; i++ )
			  {
			    html += '<td class="calendar-header-day">';
			    html += cal_days_labels[i];
			    html += '</td>';
			  }
			  
			  html += '</tr><tr>';
			
			  var day = 1;
			  // weeks (rows)
			  for (var i = 0; i < 9; i++) 
			  {
			    // weekdays (cells)
			    for (var j = 0; j <= 6; j++) 
			    { 
			      html += '<td class="calendar-day">';
			      if (day <= monthLength && (i > 0 || j >= startingDay)) 
			      {
			        //html += '<a id=cal_button' + day + ' href="#daypage" data-role="button" data-transition="slideup" data-inline="true" style="margin:0px">' + day + '</a>';
			        html += '<a id=cal_button' + day + ' onClick="displayDayPage('+ day +','+ this.month +','+ this.year +');" data-role="button" data-transition="slideup" style="margin:0px">' + day + '</a>';
			        day++;
			      }
			      html += '</td>';
			    }
			    
			    if (day > monthLength) 
			    {
			      break;
			    } 
			    else 
			    {
			      html += '</tr><tr>';
			    }
			    
			  }
			  
			  html += '</tr></table>';
			
			  this.html = html;
		}
		
		
		Calendar.prototype.getHTML = function() 
		{			
			return this.html;
		}
		
		
		function displayDayPage( day, month, year)
		{
			
			var dayData = getWorkdataForDay(day);
					
			loadWorkHourDetails(year + '' + padZeroFront(month + 1) + '' + padZeroFront(day));
		
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
		
		
		function setButtonColor(day, color)
		{
			document.getElementById("cal_button" + day).style.background = color;
		}
		
		
		function setButtonOpacity(day, opacity)
		{			
			document.getElementById("cal_button" + day).style.opacity = opacity;	
		}
		
		
		function setButtonCurrentDayColor(day)
		{
			setButtonColor(day, '#0047B2');
		}
		
		
		function setButtonMissingColor(day)
		{
			setButtonColor(day, '#620000');
		}
		
		
		function setButtonCompleteColor(day, currentDay)
		{
			setButtonColor(day, '#006200');
		}
		
		
		function setButtonIncompleteColor(day, currentDay)
		{
			setButtonColor(day, '#CCC400');
		}
		
		
		function setButtonOvertimeColor(day, currentDay)
		{
			setButtonColor(day, '#00DD00');
		}
		
		
		function updateCalanderDate(year, month)
		{
			var currentDate = initialCalendarViewDate;
			var day;
			
			if(compareDateEq(new Date(year, month, currentDate.getDate()), currentDate))
			{
				currentCalendarViewDate = initialCalendarViewDate;//new Date();
			}
			else
			{
		  	 	//TODO leap year
				day = cal_days_in_month[month];	  
				currentCalendarViewDate = new Date(year, month, day);
			}
			
		}
		
		
		function updateCalendar(reverse)
		{			
			
			$('#calendartable').hide();
			
			var cal = new Calendar();
			cal.generateHTML();	
			
			$("#calendartable").html(cal.getHTML());
			$("#calendartable").trigger("create");		
			
			$.mobile.changePage( "#calendarview", { allowSamePageTransition: true,
										    transition: "slide",
										    reverse: reverse });									    
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
			updateCalanderDate(calendarYear, calendarMonth - 1);
			updateCalendar(true);				  

			var dateString = buildDateString(calendarYear, calendarMonth);	

			loadEmployeeWorkHours(selectedEmployee, dateString);

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
			updateCalanderDate(calendarYear, calendarMonth + 1);
			updateCalendar(false);	

			var dateString = buildDateString(currentCalendarViewDate.getFullYear(), currentCalendarViewDate.getMonth() + 1);		

			loadEmployeeWorkHours(selectedEmployee, dateString);

		}
		
		
		
		
		
		
		
		