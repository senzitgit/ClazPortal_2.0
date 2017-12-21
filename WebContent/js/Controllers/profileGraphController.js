	var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
		
	
	var lineChartData = {
			labels : ["June","July","August","September","October","November","December"],
			datasets : [
				{
					label: "Attendance Percentage",
					fillColor : "rgba(000,198,193,0.2)",
					strokeColor : "rgba(000,198,193,1)",
					pointColor : "rgba(000,198,193,1)",
					pointStrokeColor : "#fff",
					pointHighlightFill : "#fff",
					pointHighlightStroke : "rgba(000,198,193,1)",
					data : [85,75,95,65,69,81,76]
				}
			]

		}
		
		
	
	
	var lineChartDataTeacher = {
			labels : ["5A","5C","7B","8A","10A","10B","10C"],
			datasets : [
				{
					label: "Rating out of 10",
					fillColor : "rgba(000,198,193,0.2)",
					strokeColor : "rgba(000,198,193,1)",
					pointColor : "rgba(000,198,193,1)",
					pointStrokeColor : "#fff",
					pointHighlightFill : "#fff",
					pointHighlightStroke : "rgba(000,198,193,1)",
					data : [8,6,5,8,8,9,7]
				}
			]

		}
		
	
	
	
	
	
	
	
	
	
	

	
	
	
	


	window.onload = function(){
		var linectx = document.getElementById("canvas").getContext("2d");
		window.myLine = new Chart(linectx).Line(lineChartData, {
			responsive: true
		});
		
		
		
		
		var linectx = document.getElementById("canvasTeacher").getContext("2d");
		window.myLine = new Chart(linectx).Line(lineChartDataTeacher, {
			responsive: true
		});
		
		
		
		
		
		
		
		
		
		
	}

