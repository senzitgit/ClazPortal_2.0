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
		
		
		var barChartData = {
		labels : ["First Term","Second Term","Third Term"],
		datasets : [
			{
				fillColor : "rgba(015,155,172,0.5)",
				strokeColor : "rgba(015,155,172,0.8)",
				highlightFill: "rgba(015,155,172,0.75)",
				highlightStroke: "rgba(015,155,172,1)",
				data : [86,76,98]
			},
			{
				fillColor : "rgba(113,113,113,0.5)",
				strokeColor : "rgba(113,113,113,0.8)",
				highlightFill : "rgba(113,113,113,0.75)",
				highlightStroke : "rgba(113,113,113,1)",
				data : [70,80,50]
			},
			{
				fillColor : "rgba(255,188,090,0.5)",
				strokeColor : "rgba(255,188,090,0.8)",
				highlightFill : "rgba(255,188,090,0.75)",
				highlightStroke : "rgba(255,188,090,1)",
				data : [78,48,68]
			}
		]

	}
	
	
	
	
	var stackChartData = {
		labels : ["English","Mathematics","Chemistry","Physics","History","Geography","Computer"],
		datasets : [
			{
				fillColor : "rgba(255,188,090,0.5)",
				strokeColor : "rgba(255,188,090,0.8)",
				highlightFill: "rgba(255,188,090,0.75)",
				highlightStroke: "rgba(255,188,090,1)",
				data : [10,50,40,30,50,30,10]
			},
			{
				fillColor : "rgba(113,113,113,0.5)",
				strokeColor : "rgba(113,113,113,0.8)",
				highlightFill : "rgba(113,113,113,0.75)",
				highlightStroke : "rgba(113,113,113,1)",
				data : [50,40,40,30,10,30,10]
			},
			{
				fillColor : "rgba(015,155,172,0.5)",
				strokeColor : "rgba(015,155,172,0.8)",
				highlightFill : "rgba(015,155,172,0.75)",
				highlightStroke : "rgba(015,155,172,1)",
				data : [40,10,20,40,40,40,80]
			}
		]
	};
	

	window.onload = function(){
		var linectx = document.getElementById("canvas").getContext("2d");
		window.myLine = new Chart(linectx).Line(lineChartData, {
			responsive: true
		});
		
		var barctx = document.getElementById("canvasbar").getContext("2d");
		window.myBar = new Chart(barctx).Bar(barChartData, {
			responsive : true
		});
		
		var ctx = document.getElementById("canvas123").getContext("2d");
		window.mysBar = new Chart(ctx).StackedBar(stackChartData, {
			responsive : true
		});
	}

