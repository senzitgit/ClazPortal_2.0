
      
      
		var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
		
		var barChartData = {
		labels : ["5A","6B","5C","6C","10A"],
		datasets : [
			{
				fillColor : "rgba(015,155,172,0.5)",
				strokeColor : "rgba(015,155,172,0.8)",
				highlightFill: "rgba(015,155,172,0.75)",
				highlightStroke: "rgba(015,155,172,1)",
				data : [98,90,98,90,100]
			},
			{
				fillColor : "rgba(113,113,113,0.5)",
				strokeColor : "rgba(113,113,113,0.8)",
				highlightFill : "rgba(113,113,113,0.75)",
				highlightStroke : "rgba(113,113,113,1)",
				data : [95,95,90,85,99]
			}
		]

	};
	
	
	var barChartDataAtt = {
		labels : ["5A","6B","5C","6C","10A"],
		datasets : [
			{
				fillColor : "rgba(015,155,172,0.5)",
				strokeColor : "rgba(015,155,172,0.8)",
				highlightFill: "rgba(015,155,172,0.75)",
				highlightStroke: "rgba(015,155,172,1)",
				data : [90,90,90,90,90]
			},
			{
				fillColor : "rgba(113,113,113,0.5)",
				strokeColor : "rgba(113,113,113,0.8)",
				highlightFill : "rgba(113,113,113,0.75)",
				highlightStroke : "rgba(113,113,113,1)",
				data : [85,89,90,95,92]
			}
		]

	};
	
	window.onload = function(){
		
		var barctx = document.getElementById("canvasbar").getContext("2d");
		window.myBar = new Chart(barctx).Bar(barChartData, {
			responsive : true
		});
		
		var attctx = document.getElementById("canvasattandance").getContext("2d");
		window.myBar2 = new Chart(attctx).Bar(barChartDataAtt, {
			responsive : true
		});
		

	}

	
	
	
      
      
      
      