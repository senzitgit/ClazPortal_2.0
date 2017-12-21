

function mutevlc1(){
	var mutebtn1;
	mutebtn1 = document.getElementById("mutebtn1");
	jwplayer("liveAud1").setMute();
	var target1 = document.getElementById("target1");
	var icon1 = target1.className;

	 if (icon1 == "fa fa-volume-off") { 
		 target1.className = "fa fa-volume-up";   
	    } else {
	    	target1.className = "fa fa-volume-off";  
	    }
}

function mutevlc2(){
	var mutebtn2;
	mutebtn2 = document.getElementById("mutebtn2");
	jwplayer("liveAud2").setMute();
	var target2 = document.getElementById("target2");
	var icon2 = target2.className;

	 if (icon2 == "fa fa-volume-off") { 
		 target2.className = "fa fa-volume-up";   
	    } else {
	    	target2.className = "fa fa-volume-off";  
	    }
}
