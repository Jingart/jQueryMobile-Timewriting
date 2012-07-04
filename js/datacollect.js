	
	function dataCollect(system){
		//var system = 'http://st-w114.statoil.no:8038/sap/bc';
		//var system = 'http://10.216.209.33:8080/Q83';
	    //var system = 'localhost:8080/Q83';
	    this.system = system;
	}

	dataCollect.prototype.loadEmployeeWorkHours = function(employee, date)
	{
		selectedEmployee = employee;
		this.databaseAjaxCall(dataProcessor.workDataCallback, this.system  + "/resources/timewriting/managerdata/" + employee + "/" + date);
	}
	

	dataCollect.prototype.loadEmployeeMemberList = function()
	{
		this.databaseAjaxCall(dataProcessor.employeeMemberListCallback, 
							  	this.system + "/resources/timewriting/managerdata/",
							 	function() { $.mobile.showPageLoadingMsg(); }, 
							  	function() { $.mobile.hidePageLoadingMsg(); });
	}
	

	dataCollect.prototype.loadManagerDetails = function()
	{
		this.databaseAjaxCall(dataProcessor.managerDataCallback, this.system + "/resources/timewriting/userdata");
	}
	

	dataCollect.prototype.loadEmployeeDetails = function(employee)
	{
		this.databaseAjaxCall(dataProcessor.employeeDataCallback, this.system + "/resources/timewriting/userdata/" + employee);
	}


	dataCollect.prototype.loadWorkHourDetails = function(date)
	{			
		this.databaseAjaxCall(dataProcessor.dateWorkDataCallback, this.system + "/resources/timewriting/workinfo/" + date);
	}
	
	
	dataCollect.prototype.make_base_auth = function(user, password)
	{
		  var tok = user + ':' + password;
		  var hash = Base64.encode(tok);
		  return "Basic " + hash;
	}
	 
	
	dataCollect.prototype.databaseAjaxCall = function(responseFunc, url, beforeSendFunc, afterSendFunc)
	{
		//var auth = make_base_auth('772481','Warhog123%');
		var auth = this.make_base_auth('772481','Dragon123%');

		$.ajax({
				  //beforeSend: beforeSendFunc,
			beforeSend:  function(req) {
				beforeSendFunc,
				req.setRequestHeader('Authorization', auth);
			},
			complete: afterSendFunc,
			cache: false,
			type: "GET",
			dataType: 'json',
			url: url,
				  
			success: function( object ) {
							 
			    if(jQuery.isEmptyObject( object )){
			   	   //console.log("204 - empty");
			   	   //alert("No data found");
			    }
			    else{
				   responseFunc(object);
				}
			   
			},

			error: function (request, status, error) {
				console.log("ajaxerr: " + request.responseText);
				console.log("request.status: " + request.status);
				console.log("status: " + status);
				console.log("error: " + error);
				alert("Error: " +  error);
				//$('#myPopupDiv').popup();
				//$.mobile.changePage('#generaldialog', 'pop', true, true);
   			}

		});
		
	};

