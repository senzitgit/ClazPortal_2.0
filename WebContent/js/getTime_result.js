
 




var timer_stopped=0;

function timer_startSch(){
	timer = $.timer(
		function() {
			sec++;
			if(sec==60){
				sec=0;
				min++;
			}

	if(min==60){

	min=0;

	hour++;

	} 



	timer_tickSchedule();

	min_tick();

	},

	60000,

	true

	);

	};
	
	
	
	
function getTime_result(result){

	
   var obj = JSON.parse(result);
	
	
	
	
	var origin = obj.origin;
	if(origin=="getTime"){
		var respo = obj.response.getTimeResult;
		var scheduleList = respo.newScheduleList;
	
		var day = respo.day;
		var time = respo.time;
	    notification = respo.studentNotifications;
		var notificationLength = notification.length;
		
		
		if(notificationLength != '0'){
			var listItems = "";
			
				
		    var notifications = document.getElementById("notifications");
			var notifyCount1 = document.getElementById("notifyCount1");
			var notifyCount2 = document.getElementById("notifyCount2");
			
			for(var i=0;i<notificationLength;i++){
				console.log(notification[i].notificationQuestion);
				console.log(notification[i].notificationAnswer);
				console.log(notification[i].FromUser);
				console.log(notification[i].teacherprofilePic);
			
				var divId ='n'+notification[i].notificationId;
				
				notifyCount1.innerHTML=notificationLength;
				notifyCount2.innerHTML=notificationLength;
				notifications.innerHTML= notifications.innerHTML + '<section id="'+divId+'" onclick ="deleteNotification('+notification[i].notificationId+')" class="panel-body" style="border: 1px solid #E6E6E6;background-color: #A3ECDA;" >'+
					   '<article class="media">'+
			      '<div class="pull-left"> <img src="'+notification[i].teacherprofilePic+'" class="img-circle" height="40px"></span> </div>'+
			      '<div class="media-body"><b>'+notification[i].notificationQuestion+'</b> <small class="block m-t-xs">'+notification[i].notificationAnswer+'</small> <em class="text-xs">Replied By <span class="text-danger">'+notification[i].FromUser+'</span></em> </div>'+
			   '</article>'+
			'</section><br>';
				
				
		
				
				
							
			
			
			}
			
			
		}else {
			
			var notifyCount1 = document.getElementById("notifyCount1");
			var notifyCount2 = document.getElementById("notifyCount2");
			
				
				notifyCount1.innerHTML=notificationLength;
				notifyCount2.innerHTML='no';
				
				
			
		}
		
		
		
		
		
		
		
		
		
		
		
		
		sessionStorage.setItem('lclDay', day);
		sessionStorage.setItem('lclTime', time);
		var obj = JSON.parse(localResult);
		var origin1 = obj.origin;
		var respon = obj.response;
		var stsRes = respon.statusResult;
		var SchIdLis = stsRes.scheduleIdList;
		//var stTime = stsRes.studentTimeTable.length;
		$("#curr_time").html("");
		$("#schedule_commets").html("");
		$("#current_time").html("");
		$("#time_left").html("");	
		
		if(day == "Mon"){
			current_schedule = stsRes.studentTimeTable[0].Mon;
		}else if(day == "Tue"){
			current_schedule = stsRes.studentTimeTable[0].Tue;
		}else if(day == "Wed"){
			current_schedule = stsRes.studentTimeTable[0].Wed;
		}else if(day == "Thu"){
			current_schedule = stsRes.studentTimeTable[0].Thu;
		}else if(day == "Fri"){
			current_schedule = stsRes.studentTimeTable[0].Fri;
		}else if(day == "Sat"){
			current_schedule = stsRes.studentTimeTable[0].Sat;
		}
		else if(day == "Sun"){
			current_schedule = stsRes.studentTimeTable[0].Sun;
		}
		
		console.log("Today is "+day);
		var i=0;
		
		var h = parseInt(time.substring(0,time.lastIndexOf(":")) * 60);
		var m = parseInt(time.substring(time.lastIndexOf(":")+1,time.length));
	
		time = h + m;
		time = parseInt(time);
		clock_time=time;
		$("#curr_time").html(min_to_word(clock_time));
		
		var difference=99999999999;
		difference=parseInt(difference);
		index=-1;
		class_already_started=0;
		
		for(var i=0;i<current_schedule.length;i++){
			for(var j=0;j<current_schedule.length-i-1;j++){
				
				if(current_schedule[j].startTime>current_schedule[j+1].startTime){
			
					var temp=current_schedule[j];
					current_schedule[j]=current_schedule[j+1];
					current_schedule[j+1]=temp;
							
				}
		}
	}
				
		for(var i=0;i<current_schedule.length;i++){
			console.log(current_schedule[i].startTime);
		}
		
		
		for(var i=0;i<current_schedule.length;i++){
			
			
			var steps = document.getElementById('steps');
			
			
			
			
			schedule_start_time=parseInt(current_schedule[i].startTime);
			schedule_end_time=parseInt(current_schedule[i].endTime);
			
			
			var deadTime = schedule_start_time +parseInt(60);
			
			
			//alert(schedule_start_time);
			
			//alert(deadTime);
			
			//alert(time);
	
			if(time < schedule_start_time){
				
				if( (schedule_start_time - time) < difference){
					steps.innerHTML =steps.innerHTML+'<li style="cursor:pointer" onclick="setClassInfo('+i+')"><span class="badge">'+current_schedule[i].period+'</span>'+min_to_word(current_schedule[i].startTime)+'</li>';

					
				}
				
				
			
			
			}else if (time < deadTime && time >=schedule_start_time){
				
				
				steps.innerHTML =steps.innerHTML+'<li style="cursor:pointer" onclick="setClassInfo('+i+')"><span class="badge badge-info">'+current_schedule[i].period+'</span>'+min_to_word(current_schedule[i].startTime)+'</li>';

				
			}else {
				steps.innerHTML =steps.innerHTML+'<li style="cursor:pointer" onclick="setClassInfo('+i+')"><span class="badge badge-success">'+current_schedule[i].period+'</span>'+min_to_word(current_schedule[i].startTime)+'</li>';

			}
			
			
			
			
			
			//console.log('Start Time : '+        min_to_word(current_schedule[i].startTime));
		}
		
		
		
		
		
		
		
		
		for(i=0;i<current_schedule.length;i++){
			
			schedule_start_time=parseInt(current_schedule[i].startTime);
			schedule_end_time=parseInt(current_schedule[i].endTime);
	
			if(time < schedule_start_time){
				
				if( (schedule_start_time - time) < difference){
					difference = schedule_start_time - time;
					index = i;
					
				}
				
			}else if(time < schedule_end_time){
				
				console.log("Class Already started...!!");
				index = i;
				class_already_started=1;
				break;
			}
			
	}
		
		console.log("initial index is: "+index);
		var in_list = 0;
		if(index>-1 && scheduleList.length>0){
			console.log("Checking in schedule list");
			for(var i=0;i<scheduleList.length;i++){
				if(current_schedule[index].scheduleId == scheduleList[i]){
				
					in_list = 1;
					console.log("Found in schedule List");
					
				    break;
				
				}
			
			}
		
		
		if(in_list==1){
			console.log("In schedule List so no increment");
		}
		else{
				console.log("Not in schedule List so increment");
				index++;
				class_already_started=0;
		}
		}
		if(index>=current_schedule.length){
			console.log("index out of boundary");
			index=-1;
		}
		if(scheduleList.length==0){
			console.log("Schedule list is empty");
			index=-1;	
		}
		if(index<0){
			
			
			
var currentDetails = document.getElementById("current");
			
			currentDetails.innerHTML='<section class="panel bg-warning no-borders">'+
				   '<div class="row">'+
		      '<div class="col-xs-8">'+
		         '<div class="wrapper">'+
		            '<p>No Classes Are Happening Now</p>'+
		            '<p class="h2 font-bold">Now</p>'+
		            '<div class="progress progress-xs progress-striped active m-b-sm">'+
		               '<div class="progress-bar progress-bar-warning" data-toggle="tooltip" data-original-title="0%" style="width: 0%"></div>'+
		            '</div>'+
		           
		         '</div>'+
		      '</div>'+
		      '<div class="col-xs-4 wrapper text-center">'+
		        
		  ' </div>'+
		'</section>';
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			var laterDetails = document.getElementById("later");
			
			laterDetails.innerHTML='<section class="panel bg-success no-borders">'+
						   '<div class="row">'+
				      '<div class="col-xs-8">'+
				         '<div class="wrapper">'+
				            '<p>No Classes Scheduled For Later </p>'+
				            '<p class="h2 font-bold">Later</p>'+
				            '<div class="progress progress-xs progress-striped active m-b-sm">'+
				               '<div class="progress-bar progress-bar-success" data-toggle="tooltip" data-original-title="0%" style="width: 0%"></div>'+
				            '</div>'+
				           
				         '</div>'+
				      '</div>'+
				      '<div class="col-xs-4 wrapper text-center">'+
				         
				  ' </div>'+
				'</section>';
			
			
			
			
			
			console.log("Current time is -"+min_to_word(time));
			sessionStorage.setItem('currentTimeForDisplay',min_to_word(time));
			
			console.log("No Class to attend today");	
			$("#schedule_commets").html("No Scheduled Classes!!");
			
			timer_stopped=1;
		
		}else{
			
			
			
			console.log("Current day is:"+day+"Current time is -"+min_to_word(time));
			sessionStorage.setItem('currentTimeForDisplay',min_to_word(time));
			console.log("Your next class is-"+min_to_word(current_schedule[index].startTime));
			
			var curClasstime = min_to_word(current_schedule[index].startTime);

			$("#current_time").html(min_to_word(current_schedule[index].startTime)+" Hrs");
			scheduleId=current_schedule[index].scheduleId;
			
			console.log("Current scheduleId is:"+scheduleId);
			
			var currentDetails = document.getElementById("current");
			
			currentDetails.innerHTML='<section class="panel bg-warning no-borders">'+
				   '<div class="row">'+
		      '<div class="col-xs-8">'+
		         '<div class="wrapper">'+
		            '<p>Started @ '+curClasstime+' Hrs</p>'+
		            '<p class="h2 font-bold">Now</p>'+
		            '<div class="progress progress-xs progress-striped active m-b-sm">'+
		               '<div class="progress-bar progress-bar-warning" data-toggle="tooltip" data-original-title="80%" style="width: 80%"></div>'+
		            '</div>'+
		            '<div class="text-sm">On <b>'+current_schedule[index].subject+'</b></div>'+
		         '</div>'+
		      '</div>'+
		      '<div class="col-xs-4 wrapper text-center">'+
		         '<div class="inline m-t-sm">'+
		          ' <img src="'+current_schedule[index].profilePic+'" class="img-circle" height="50px;">  <br><b>'+current_schedule[index].teacherId+'</b>       </div>'+
		      '</div>'+
		  ' </div>'+
		'</section>';
			
			
			
			
			console.log("Current day is:" +day+" Current time is - "+min_to_word(time));
			console.log("Your current class time is-"+min_to_word(current_schedule[index].startTime));
			console.log("Your current class subject is-"+current_schedule[index].subject);
			console.log("Your current class teacher is-"+current_schedule[index].teacherId);
			
			
			
			var stepcontent = document.getElementById('step-content');
			stepcontent.innerHTML ='<small class="text-uc text-xs text-muted">Subject</small>'+
                '<p id="mobile">'+current_schedule[index].subject+'</p>'+
                '<div class="line"></div>'+
              '<small class="text-uc text-xs text-muted">Teacher</small> '+
              '<p id="email">'+current_schedule[index].teacherName+'</p>'+
              '<div class="line"></div>'+
              '<small class="text-uc text-xs text-muted">End Time</small>'+ 
              '<p id="dob">'+min_to_word(current_schedule[index].endTime)+'</p>';
			
			
	
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			if(index<6)
			{
				
	
				
				if(index >0){
					console.log("Your next class time is-"+min_to_word(current_schedule[index+1].startTime));
					console.log("Your next class subject is-"+current_schedule[index+1].subject);
					console.log("Your next class teacher is-"+current_schedule[index+1].teacherId);
				
					var laterClasstime = min_to_word(current_schedule[index+1].startTime);
				
				var laterDetails = document.getElementById("later");
				
				laterDetails.innerHTML='<section class="panel bg-success no-borders">'+
							   '<div class="row">'+
					      '<div class="col-xs-8">'+
					         '<div class="wrapper">'+
					            '<p>Scheduled @ '+laterClasstime+' Hrs</p>'+
					            '<p class="h2 font-bold">Later</p>'+
					            '<div class="progress progress-xs progress-striped active m-b-sm">'+
					               '<div class="progress-bar progress-bar-success" data-toggle="tooltip" data-original-title="0%" style="width: 0%"></div>'+
					            '</div>'+
					            '<div class="text-sm">On <b>'+current_schedule[index+1].subject+'</b></div>'+
					         '</div>'+
					      '</div>'+
					      '<div class="col-xs-4 wrapper text-center">'+
					         '<div class="inline m-t-sm">'+
					          ' <img src="'+current_schedule[index+1].profilePic+'" class="img-circle" height="50px;">  <br><b>'+current_schedule[index+1].teacherId+'</b>       </div>'+
					      '</div>'+
					  ' </div>'+
					'</section>';
						
			}else {
				
				
var laterDetails = document.getElementById("later");
				
				laterDetails.innerHTML='<section class="panel bg-success no-borders">'+
							   '<div class="row">'+
					      '<div class="col-xs-8">'+
					         '<div class="wrapper">'+
					            '<p>No Classes Scheduled Today</p>'+
					            '<p class="h2 font-bold">Later</p>'+
					            '<div class="progress progress-xs progress-striped active m-b-sm">'+
					               '<div class="progress-bar progress-bar-success" data-toggle="tooltip" data-original-title="0%" style="width: 0%"></div>'+
					            '</div>'+
					         
					         '</div>'+
					      '</div>'+
					     
					'</section>';
				
				
				
				
				
			}
				
				
				
				
				
			
			
			}
			
			
			
			
			
			
			
			
			
			
		//	timer_startSch();
			if(class_already_started==0){
				$("#schedule_commets").html("Your Next Class Is Scheduled @");
				schedule_start_time=parseInt(current_schedule[index].startTime);
				time_left = schedule_start_time - time;
				$("#time_left").html(min_to_word1(time_left));
			}
			
			
			
			if(class_already_started==1){
				
				if(liveSessionFlag=='1') {
					$("#schedule_commets").html("Your Class Already Started @");
					$("#time_left").html(min_to_word1(0)+"<br><br>  <a class='pull-right' href='live_class.html'><b>Attend Now <div class='fa fa-chevron-circle-right'></div><b></a>");

					
				}else {
					$("#schedule_commets").html("Your Scheduled Class Not Yet Started @");
					$("#time_left").html(min_to_word1(0));

				}
				
				
			}
			
		}
	
	}
	else{
		WL.SimpleDialog.show("CyberClaz","Server Exception",[{
			text:'Ok'
		}]);
	}
}

function timer_tickSchedule(){
	if(index>=0){
	if(class_already_started!=1){
		$("#time_left").html(min_to_word1(time_left));
		time_left--;

		if(time_left<0){
		//	timer_stopped = 1;
			class_already_started=1;
			$("#schedule_commets").html("YOUR CLASS ALREADY STARTED AT");
		}
	}
	else{
		$("#time_left").html(min_to_word1(0));
	}
	}
}

function min_tick(){
	
	var t=min_to_word(clock_time);
	$("#curr_time").html(t);
	clock_time++;
	if(clock_time == 1440){
		clock_time=0;
	}
}
/*
function min_to_word(min){
	
	var fi,se;
	if(parseInt(min/60)<10){
		fi="0"+parseInt(min/60);
	}else{
		fi=parseInt(min/60);
	}
	if(parseInt(min%60)<10){
		se="0"+parseInt(min%60);
	}else{
		se=parseInt(min%60);
	}
	
	var min_word=fi+":"+se;
	return min_word;
}
*/
function min_to_word(min){
	
	var fi,se;
	if(parseInt(min/60)<10){
		fi="0"+parseInt(min/60);
	}else{
		fi=parseInt(min/60);
	}
	if(parseInt(min%60)<10){
		se="0"+parseInt(min%60);
	}else{
		se=parseInt(min%60);
	}
	
	var min_word=fi+":"+se;
	return min_word;
}
function min_to_word1(min){
	
	var fi,se;
	if(parseInt(min/60)<10){
		fi="0"+parseInt(min/60);
	}else{
		fi=parseInt(min/60);
	}
	if(parseInt(min%60)<10){
		se="0"+parseInt(min%60);
	}else{
		se=parseInt(min%60);
	}
	
	var min_word=fi+" Hr "+se + " min. Left";
	return min_word;
}





function deleteNotification(index) {
	
	divID ="n"+index;
	
	
	$("#"+divID).css("background-color", "");
	
	
	 $.ajax({
         url: webServerUrl,
         data: 'request=studentNotificationClick&notificationId='+index,
         type: 'post',
         success: function(msg) {
       	  
 
         }
     });
	
	
	
	
	
	
}










function setClassInfo(index){
	
	
	
	
	var stepcontent = document.getElementById('step-content');
	stepcontent.innerHTML ='<small class="text-uc text-xs text-muted">Subject</small>'+
        '<p id="mobile">'+current_schedule[index].subject+'</p>'+
        '<div class="line"></div>'+
      '<small class="text-uc text-xs text-muted">Teacher</small> '+
      '<p id="email">'+current_schedule[index].teacherName+'</p>'+
      '<div class="line"></div>'+
      '<small class="text-uc text-xs text-muted">End Time</small>'+ 
      '<p id="dob">'+min_to_word(current_schedule[index].endTime)+'</p>';
	
	
	
}










