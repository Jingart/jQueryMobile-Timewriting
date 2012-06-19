
/*
		$('#daypage').live('pageshow', function() {
		  //$.mobile.showPageLoadingMsg(); 
		  
		  var dayData = getWorkdataForDay(26);
		  		  
		  var saved = parseInt(dayData.savedWork);
		  var expected = parseInt(dayData.expectedWork);
		  var remaining = parseInt(dayData.remainingWork);
		  
		  //var leftvalue = remaining - saved;
		  		  
		  var data = [
		    ['Saved', saved],['Incomplete', expected], ['Incomplete', remaining]
		  ];
		  
		  //alert(dayData.remainingWork);
		  var plot2 = jQuery.jqplot ('chart2', [data],
		    {
		      seriesDefaults: {
		        renderer: jQuery.jqplot.PieRenderer,
		        rendererOptions: {
		          // Turn off filling of slices.
		          fill: false,
		          showDataLabels: true,
		          // Add a margin to seperate the slices.
		          sliceMargin: 4,
		          // stroke the slices with a little thicker line.
		          lineWidth: 5
		        }
		      },
		      grid: {
                background: 'transparent',
                borderColor: 'transparent',
                shadow: false
              },
		      legend: { 
		      	show:false, 
		      	location: 's',
		      	background: '#333'
		      },
		      seriesColors: ["#007000", "#700000", "#707000"]
		    }
		  );
		  
		  //$.mobile.hidePageLoadingMsg();
		  
		});
*/
		