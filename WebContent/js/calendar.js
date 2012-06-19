


		cal_days_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		
		cal_months_labels = ['January', 'February', 'March', 'April',
		                     'May', 'June', 'July', 'August', 'September',
		                     'October', 'November', 'December'];
		
		cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		
	
		//cal_initial_date = new Date(2000, 09, 25);
		//cal_current_date = new Date(2000, 09, 25);
		
		cal_current_date = new Date(); 
		cal_initial_date = new Date(); 
		
		function Calendar(day, month, year) 
		{
					
			  this.day = (isNaN(month) || day == null) ? cal_current_date.getDay() : day;
			  this.month = (isNaN(month) || month == null) ? cal_current_date.getMonth() : month;
			  this.year  = (isNaN(year) || year == null) ? cal_current_date.getFullYear() : year;
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
		
		
		function getCalendarString(day, month, year)
		{
			var dateString = new String();
			dateString = day + ' ' + cal_months_labels[month] + ' ' + year;
			return dateString;			
		}
		
		
		function displayDayPage( day, month, year)
		{
			
			var dayData = getWorkdataForDay(day);
			
			//alert(daydata.expectedWork);
			
			getDateWorkData(year + '' + padZeroFront(month + 1) + '' + padZeroFront(day));
			
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
			//console.log("Opaqe");
			document.getElementById("cal_button" + day).style.opacity = opacity;	
			//setButtonColor(day, '#00ff33');
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
			//var currentDate = new Date();
			var currentDate = cal_initial_date;
			var day;
			
			if(compareDateEq(new Date(year, month, currentDate.getDate()), currentDate))
			{
				cal_current_date = cal_initial_date;//new Date();
			}
			else
			{
		  	 	//TODO leap year
				day = cal_days_in_month[month];	  
				cal_current_date = new Date(year, month, day);
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
			 
			var calendarMonth = cal_current_date.getMonth();			
			var calendarYear = cal_current_date.getFullYear();

			if(calendarMonth == 0)
			{
				calendarYear--;
				calendarMonth = "12";
			}
			
			// Javadate starts at 0
			updateCalanderDate(calendarYear, calendarMonth - 1);
			updateCalendar(true);				  

			//$.mobile.showPageLoadingMsg();
			
			var dateString = buildDateString(calendarYear, calendarMonth);								       
			//getWorkData(dateString);
			getWorkMgrData(cur_selected_emp, dateString);
			
			//$.mobile.hidePageLoadingMsg();
		}
		
		
		function displayNextMonth()
		{
			
			//if(compareDateLess(cal_current_date, new Date()));
			//{
			
			var calendarMonth = cal_current_date.getMonth();			
			var calendarYear = cal_current_date.getFullYear();
			
			if(calendarMonth == 11)
			{
				calendarYear++;
				calendarMonth = -1;
			}
			
			// Javadate starts at 0
			updateCalanderDate(calendarYear, calendarMonth + 1);
			updateCalendar(false);	
			
			//$.mobile.showPageLoadingMsg();
			
			var dateString = buildDateString(cal_current_date.getFullYear(), cal_current_date.getMonth() + 1);		
			//getWorkData(datestring);	
			getWorkMgrData(cur_selected_emp, dateString);
			
			//$.mobile.hidePageLoadingMsg();
			//}							    
			
		}
		
		
		
		
		
		
		
		