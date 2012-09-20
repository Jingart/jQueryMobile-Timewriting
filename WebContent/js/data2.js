
function doAjax(responseFunc, url, parameters) {  
	// create the AJAX object   
	var xmlHttp = undefined;   
	if (window.ActiveXObject){     
		try {      
			xmlHttp = new ActiveXObject("MSXML2.XMLHTTP");     
		} catch (othermicrosoft){       
			try {         
					xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");       
				} catch (failed) {}     
		  }   
	}
	if (xmlHttp == undefined && window.XMLHttpRequest) {     
				// If IE7+, Mozilla, Safari, etc: Use native object     
				xmlHttp = new XMLHttpRequest();   
	}   
    if (xmlHttp != undefined) 
    {     
				// open the connections     
				xmlHttp.open("POST", url, true);     
				// callback handler     
				xmlHttp.onreadystatechange = function() {       
					// test if the response is finished coming down       
					if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {         
						// create a JS object out of the response text             
						var obj = eval("(" + xmlHttp.responseText + ")");         
						// call the response function         responseFunc(obj);      
					}     
		        } 
    }			
}


/*
	$(document).ready(function(){
		$.ajax({
			  type: "GET",
			  dataType: 'json',
			  url:"/D83/resources/timewriting/empdata/772481",
			  beforeSend: function(xhr) {
			  },
			  error: function(xhrData){
					alert("Failed connection to D83");
			  },				
			  success: function(empData){
					 JSONobject = empData;
				     //document.getElementById("p1").innerHTML = JSONobject.perno;
					 //document.getElementById("p1").innerHTML = empData.status;
				}				
		});
		
	});
*/	
	
	function getDataJSON(responseFunc, url){
		var JSONobject;
		$.ajax({
				  type: "GET",
				  dataType: 'json',
				  url: url,

				  statusCode: {
			            404: function() {
			                console.log("response 404!");
			            },
			            200: function() {
			                console.log("response 200!");
			            },
			            204: function() {
			                console.log("response 204!");
			            }
			      },
			      success: function( returndata ) {
			           console.log("success");
			           
			           if(jQuery.isEmptyObject( returndata ))
			        	   //alert("Ajax error");
			           	   console.log("response 204! - empty");
			           else
			           {	
			        	   
			        	   //$("p#perno").append(empData.perno);			        	   
					/*		$.each(empData.items, function(i,item){
								$appendTo("p#perno");
							});*/
			        	   
			        	   //$("p#perno").text("Perno: " + empData[0].workdate);
			        	  /* 
			        	   for (var i = 0; i < empData.itab.length; i++){
			        		    //Ti.API.info(empData[i].perno);
			        		    $("p#perno").text("Perno: " + empData.itab[i].workdate);
			        	   }
			        	   */
			        	   //return returndata;
			           }
			      },
			      error: function(e) {
			    	   //console.log("error");
			           //alert(e);
			      }
		});
		
	    //return JSONobject;
	}
	
	
	
	
	
	
	


    function showHint(str)
    {
      var xmlhttp;
      if (str.length==0)
      {
        document.getElementById("txtHint").innerHTML="";
        return;
      }

      if (window.XMLHttpRequest)
      {
        xmlhttp=new XMLHttpRequest();
      }

      xmlhttp.onreadystatechange=function()
      {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
          document.getElementById("txtHint").innerHTML=xmlhttp.responseText;
        }
      }

      xmlhttp.open("POST","index.do?qstr="+str,true);
      xmlhttp.send();
    }
 
    
    function getJSON_flickr_example() {
    	//PJSON
		$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
		{
			tags: "cat",
			tagmode: "any",
			format: "json"
		},
		function(data) {
			$.each(data.items, function(i,item){
				$("<img/>").attr("src", item.media.m).appendTo("#images");
				if ( i == 2 ) return false;
			});
		});
    }
    
    
    function getJSON_test() {
		$.getJSON("/D83/resources/timewriting/weekdata",
		{
			format: "json"
		},
		function(data) {
			$.each(data.itab, function(i,item){
				$("perno").attr("src", item).appendTo("#data");
				if ( i == 3 ) return false;
			});
		});
	}
	
    
	function ajaxRequest() {
		$.ajax({
		//url: "/statoil/resources/timewriting/empdata/772481",
		url: '/D83/resources/timewriting/weekdata',
		dataType: 'json',
		/*beforeSend: function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");
		},*/
		error: function(xhr_data) {
		 alert('ERR!');
		},
		success: function(xhr_data) {
		
				$.each(xhr_data.items, function(i,item){
					$appendTo("p#perno");
				});
				
		},
		contentType: 'application/json'
		});
	}	
	

	// Create the XHR object.
	function createCORSRequest(method, url) {
	  var xhr = new XMLHttpRequest();
	  if ("withCredentials" in xhr) {
	    // XHR for Chrome/Safari/Firefox.
	    xhr.open(method, url, true);
	  } else if (typeof XDomainRequest != "undefined") {
	    // XDomainRequest for IE.
	    xhr = new XDomainRequest();
	    xhr.open(method, url);
	  } else {
	    // CORS not supported.
	    xhr = null;
	  }
	  return xhr;
	}
	
	
	// Helper method to parse the title tag from the response.
	function getTitle(text) {
	  return text.match('<title>(.*)?</title>')[1];
	}
	
	
	// Make the actual CORS request.
	function makeCorsRequest() {
	  // bibliographica.org supports CORS.
	  var url = '/D83/resources/timewriting/empdata/772481';
	
	  var xhr = createCORSRequest('GET', url);
	  if (!xhr) {
	    alert('CORS not supported');
	    return;
	  }
	
	  // Response handlers.
	  xhr.onload = function() {
	    var text = xhr.responseText;
	    var title = getTitle(text);
	    alert('Response from CORS request to ' + url + ': ' + title);
	  };
	
	  xhr.onerror = function() {
	    alert('Woops, there was an error making the request.');
	  };
	
	  xhr.send();
	}





