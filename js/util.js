	
	function DayData(savedWork, remainingWork, expectedWork) {
		this.remainingWork = remainingWork;
		this.expectedWork = expectedWork;
		this.savedWork = savedWork;
	}


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


	function getCalendarString(day, month, year)
	{
		var dateString = new String();
		dateString = day + ' ' + calendar.cal_months_labels[month] + ' ' + year;
		return dateString;			
	}

		
	function getDateString(date)
	{
		//alert(date.getFullYear());
		return buildDateString(date.getFullYear(), date.getMonth() + 1);
		
	}
	
		
	function buildDateString(year, month)
	{
		var yearString = new String(year);
		var dateString = yearString.concat(padZeroFront(month));
		return dateString;
	}


	function convertToDate(dateString)
	{

		var datestring = dateString;
		var y = datestring.substr(0,4);
		var m = datestring.substr(4,2);
		var d = datestring.substr(6,2);
		m = m - 1;
		date = new Date(y, m, d); 
		
		return date;
		
	}
	
	
	function resetDateTime(date)
	{
		
		date.setHours(0);
		date.setMilliseconds(0);
		date.setMinutes(0);
		date.setSeconds(0);
		
		return date;
		
	}
	
	
	function compareDateMonthEqOrGreater(date1, date2)
	{
		
		resetDateTime(date1);
		date1.setDate(0);
		resetDateTime(date2);
		date2.setDate(0);
		
		if(date1.getTime() >= date2.getTime())
			return true;
		else
			return false;
		
	}


	function compareDateLess(date1, date2)
	{
		
		resetDateTime(date1);
		resetDateTime(date2);
		
		if(date1.getTime() < date2.getTime())
			return true;
		else
			return false;
		
	}
	
	
	function compareDateGreater(date1, date2)
	{
		
		resetDateTime(date1);
		resetDateTime(date2);
		
		if(date1.getTime() > date2.getTime())
			return true;
		else
			return false;
		
	}
	
	
	function compareDateEq(date1, date2)
	{
		
		resetDateTime(date1);
		resetDateTime(date2);	
		
		if(date1.getTime() == date2.getTime())
			return true;
		else
			return false;
		
	}
	
	
	function compareDateEqOrGreater(date1, date2)
	{
		
		resetDateTime(date1);
		resetDateTime(date2);	
		if(date1.getTime() >= date2.getTime())
			return true;
		else
			return false;
		
	}