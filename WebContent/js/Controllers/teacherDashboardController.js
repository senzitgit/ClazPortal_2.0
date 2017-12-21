document.getElementById("picturePanelNav").innerHTML ='<img src="'+sessionStorage.getItem("proPic")+'">';

document.getElementById("namePanelNav").innerHTML =sessionStorage.getItem("firstName");





 
showPosition(); 
 function showPosition(position) {
	   /* alert("Latitude: " + position.coords.latitude); 
	    alert("Longitude: " + position.coords.longitude);	*/
	    
	    
	    
	    $.ajax({
	          url: 'http://api.openweathermap.org/data/2.5/weather?lat=8.571032'+'&lon=76.866331&appid=6c44249d9973722c11466ddce0ce2c62',
	          success: function(msg) {
	        	  
	        	  console.log(JSON.stringify(msg));
	        	  
	        	      	        	   
 				    weatherObj = msg;
	        	  
	        	    var humidity = document.getElementById("humidity");
	    			 humidity.innerHTML=weatherObj.main.humidity+"%";
	    			 
	    			 var pressure = document.getElementById("pressure");
	    			 pressure.innerHTML=weatherObj.main.pressure + " hpa";
	    			 
	    			 
	    			 var F =Math.round(weatherObj.main.temp * 100) / 1000;
	    			 
	    			 
	    			 var temperature = document.getElementById("temperature");
	    			 temperature.innerHTML= F + " C";
	    			 
	    			 
	    			 var wind = document.getElementById("wind");
	    			 wind.innerHTML= weatherObj.wind.speed +" m/s";
	    			 
	    			 
	    			 var curLoc = document.getElementById("curLoc");
	    			 curLoc.innerHTML= weatherObj.name;
	    			 
	    			 
	       	   		   
	        	  
	        	  
	        	/*     var loginJson = msg.trim();        	        	   
    				 obj = JSON.parse(loginJson);
       	   		 var resultCode  = obj.response.resultcode;
       	   		 var message  = obj.response.message;
       	   		 
       	   		getTime_result(loginJson);
       	   		 
       	   		if(resultCode== 1)
   				{
       	   		    var currentTimeForDisplay = obj.response.getTimeResult.time;
       	   		    sessionStorage.setItem('currentTimeForDisplay',currentTimeForDisplay);
       	   			show();
       	   			
   				}
       	   		*/
	        	  
	        	  
	        	  
	          }
	      });
	    
	    
	    
	    
	    
	    
	    
	    
	    
	}








 






var userId = sessionStorage.getItem("loguser");
var commentForm = document.getElementById("commentForm");
commentForm.innerHTML ='Welcome Back,&nbsp;'+sessionStorage.getItem("firstName");






$(document).ready(function() {
	
	
	
	  $("#calBack").click(function(){
	  		document.getElementById("calBack").style.display="none";
	  		document.getElementById("calendar").style.display="block";
	        document.getElementById("schedules").style.display="none"; 
	        document.getElementById("headerDate").style.display="none";
	    

	    });
	
	
	
	
	
	  $.ajax({
           url: webServerUrl,
           data: 'request=localUser',
           type: 'post',
           success: function(msg) {
        	   
        	   sessionStorage.setItem("localUserResponse",msg);
        	   
        	   localResult = msg.trim();

        		  $.ajax({
        	          url: webServerUrl,
        	          data: 'request=getTime&role=teacher',
        	          type: 'post',
        	          success: function(msg) {
        	        	  
        	        	  
        	        	     var loginJson = msg.trim();        	        	   
	          				 obj = JSON.parse(loginJson);
	             	   		 var resultCode  = obj.response.resultcode;
	             	   		 var message  = obj.response.message;
	             	   		 
	             	   		
	             	   		 scheduleInfo = loginJson;
	             	   		 
	             	   		 
	             	   		getTime_result(loginJson);
	             	   		 
	             	   		if(resultCode== 1)
	         				{
	             	   		    var currentTimeForDisplay = obj.response.getTimeResult.time;
	             	   		    sessionStorage.setItem('currentTimeForDisplay',currentTimeForDisplay);
	             	   			show();
	             	   			
	         				}
	             	   		
        	        	  
        	        	  
        	        	  
        	          }
        	      });
        	   
        	   
           }
       });

	  

	  
	  
	  
	  $('#calendar').fullCalendar({
			
			
			
		    dayClick: function(date, jsEvent, view) {

		     
		    	
		    	
		    	var dated =  date.format('dddd');
		    	
		    	var clickDate = dated.substring(0, 3);
		    	
		    	/* alert(clickDate); */
		    	
		    	
		       var scheduleJSON = localResult; 
		       var json = JSON.parse(scheduleJSON);
		       var response = json.response;
		       var statusResult = response.statusResult;
		       var schedule = statusResult.schedule;
		        
		 //   alert(JSON.stringify(schedule));  
		        
		     var div = document.getElementById('schedules'); 
		        var headerDate = document.getElementById('headerDate'); 
		     div.innerHTML ='';
		        if(clickDate == "Mon"){
		        	headerDate.innerHTML='<div class="clear"> <a href="javascript:void(0)"><strong>Your Schedules On '+date.format('DD/MM/YYYY') +'</strong></a> ';
		        	
		        	  var curDay = schedule[0].Mon;
		        	  if(curDay.length==0){
		   				div.innerHTML = div.innerHTML + '<center><br><br><br><br><br><i><b>No Schedules Found!!!</i></b></center>';	 
		          	 }
		          	 
		        	//  alert(JSON.stringify(curDay));
		        	  
		        	  for (var i = 0; i < curDay.length; i++) {
		        		    var counter = curDay[i];
		        		    console.log(counter.subject);
		        		    
		        		    var startTime = counter.startTime;
		        		    
		        		    var hours = parseInt( startTime / 60);
		        		    var minutes = "0"+parseInt( startTime % 60 );
		        		   
		        		    
		        		    var timez = hours+":"+minutes+":00";
		        		    console.log(timez);
		        		    
		        		    
		    				div.innerHTML = div.innerHTML + '<br><span class="badge bg-success">'+ timez +'</span><br><br><div style="width:300px;">Course : '+ counter.courseName +' </div><br><div style="width:300px;">Batch : '+ counter.batch +'</div><br><div style="width:300px;">Subject : '+ counter.subject +' </div><br><div style="width:300px;">Class Room : '+ counter.classRoomNo +' </div><br>';
		    				
		    
		        		    
		        		}
		        	  
		        	 
		        
		        
		        	
		        }
		    
		        if(clickDate == "Tue"){
		        	headerDate.innerHTML='<div class="clear"> <a href="javascript:void(0)"><strong>Your Schedules On '+date.format('DD/MM/YYYY') +'</strong></a> ';

		        	 var curDay = schedule[0].Tue;
		        	 if(curDay.length==0){
		  				div.innerHTML = div.innerHTML + '<center><br><br><br><br><br><i><b>No Schedules Found!!!</i></b></center>';	 
		         	 }
		         	 
		        	 for (var i = 0; i < curDay.length; i++) {
		     		    var counter = curDay[i];
		     		    console.log(counter.subject);
		     		    
		     		    var startTime = counter.startTime;
		     		    
		     		    var hours = parseInt( startTime / 60);
		     		    var minutes = "0"+parseInt( startTime % 60 );
		     		   
		     		    
		     		    var timez = hours+":"+minutes+":00";
		     		    console.log(timez);
		     		    
		     		    
						div.innerHTML = div.innerHTML + '<br><span class="badge bg-success">'+ timez +'</span><br><br><div style="width:300px;">Course : '+ counter.courseName +' </div><br><div style="width:300px;">Batch : '+ counter.batch +'</div><br><div style="width:300px;">Subject : '+ counter.subject +' </div><br><div style="width:300px;">Class Room : '+ counter.classRoomNo +' </div><br>';
		 				
		 
		     		    
		     		}
		        	
		        }
		        
		        if(clickDate == "Wed"){
		        	headerDate.innerHTML='<div class="clear"> <a href="javascript:void(0)"><strong>Your Schedules On '+date.format('DD/MM/YYYY') +'</strong></a> ';

		        	 var curDay = schedule[0].Wed;
		        	 if(curDay.length==0){
		  				div.innerHTML = div.innerHTML + '<center><br><br><br><br><br><i><b>No Schedules Found!!!</i></b></center>';	 
		         	 }
		         	 
		        	 for (var i = 0; i < curDay.length; i++) {
		     		    var counter = curDay[i];
		     		    console.log(counter.subject);
		     		    
		     		    var startTime = counter.startTime;
		     		    
		     		    var hours = parseInt( startTime / 60);
		     		    var minutes = "0"+parseInt( startTime % 60 );
		     		   
		     		    
		     		    var timez = hours+":"+minutes+":00";
		     		    console.log(timez);
		     		    
		     		    
						div.innerHTML = div.innerHTML + '<br><span class="badge bg-success">'+ timez +'</span><br><br><div style="width:300px;">Course : '+ counter.courseName +' </div><br><div style="width:300px;">Batch : '+ counter.batch +'</div><br><div style="width:300px;">Subject : '+ counter.subject +' </div><br><div style="width:300px;">Class Room : '+ counter.classRoomNo +' </div><br>';
		 				
		 
		     		    
		     		}
		        	
		        }
		        
		        if(clickDate == "Thu"){
		        	headerDate.innerHTML='<div class="clear"> <a href="javascript:void(0)"><strong>Your Schedules On '+date.format('DD/MM/YYYY') +'</strong></a> ';

		        	 var curDay = schedule[0].Thu;
		        	 if(curDay.length==0){
		  				div.innerHTML = div.innerHTML + '<center><br><br><br><br><br><i><b>No Schedules Found!!!</i></b></center>';	 
		         	 }
		         	 
		        	 for (var i = 0; i < curDay.length; i++) {
		     		    var counter = curDay[i];
		     		    console.log(counter.subject);
		     		    
		     		    var startTime = counter.startTime;
		     		    
		     		    var hours = parseInt( startTime / 60);
		     		    var minutes = "0"+parseInt( startTime % 60 );
		     		   
		     		    
		     		    var timez = hours+":"+minutes+":00";
		     		    console.log(timez);
		     		    
		     		    
						div.innerHTML = div.innerHTML + '<br><span class="badge bg-success">'+ timez +'</span><br><br><div style="width:300px;">Course : '+ counter.courseName +' </div><br><div style="width:300px;">Batch : '+ counter.batch +'</div><br><div style="width:300px;">Subject : '+ counter.subject +' </div><br><div style="width:300px;">Class Room : '+ counter.classRoomNo +' </div><br>';
		 				
		 
		     		    
		     		}
		        	
		        }
		        
		        if(clickDate == "Fri"){
		        	headerDate.innerHTML='<div class="clear"> <a href="javascript:void(0)"><strong>Your Schedules On '+date.format('DD/MM/YYYY') +'</strong></a> ';

		        	 var curDay = schedule[0].Fri;
		        	 if(curDay.length==0){
		  				div.innerHTML = div.innerHTML + '<center><br><br><br><br><br><i><b>No Schedules Found!!!</i></b></center>';	 
		         	 }
		         	 
		        	 for (var i = 0; i < curDay.length; i++) {
		     		    var counter = curDay[i];
		     		    console.log(counter.subject);
		     		    
		     		    var startTime = counter.startTime;
		     		    
		     		    var hours = parseInt( startTime / 60);
		     		    var minutes = "0"+parseInt( startTime % 60 );
		     		   
		     		    
		     		    var timez = hours+":"+minutes+":00";
		     		    console.log(timez);
		     		    
		     		    
						div.innerHTML = div.innerHTML + '<br><span class="badge bg-success">'+ timez +'</span><br><br><div style="width:300px;">Course : '+ counter.courseName +' </div><br><div style="width:300px;">Batch : '+ counter.batch +'</div><br><div style="width:300px;">Subject : '+ counter.subject +' </div><br><div style="width:300px;">Class Room : '+ counter.classRoomNo +' </div><br>';
		 				
		 
		     		    
		     		}
		        	
		        }
		        
		        
		        if(clickDate == "Sat"){
		        	headerDate.innerHTML='<div class="clear"> <a href="javascript:void(0)"><strong>Your Schedules On '+date.format('DD/MM/YYYY') +'</strong></a> ';

		        	 var curDay = schedule[0].Sat;
		        	 if(curDay.length==0){
		  				div.innerHTML = div.innerHTML + '<center><br><br><br><br><br><i><b>No Schedules Found!!!</i></b></center>';	 
		         	 }
		         	 
		        	 for (var i = 0; i < curDay.length; i++) {
		     		    var counter = curDay[i];
		     		    console.log(counter.subject);
		     		    
		     		    var startTime = counter.startTime;
		     		    
		     		    var hours = parseInt( startTime / 60);
		     		    var minutes = "0"+parseInt( startTime % 60 );
		     		   
		     		    
		     		    var timez = hours+":"+minutes+":00";
		     		    console.log(timez);
		     		    
		     		    
						div.innerHTML = div.innerHTML + '<br><span class="badge bg-success">'+ timez +'</span><br><br><div style="width:300px;">Course : '+ counter.courseName +' </div><br><div style="width:300px;">Batch : '+ counter.batch +'</div><br><div style="width:300px;">Subject : '+ counter.subject +' </div><br><div style="width:300px;">Class Room : '+ counter.classRoomNo +' </div><br>';
		 				
		 
		     		    
		     		}
		        }
		        
		        if(clickDate == "Sun"){
		        	
		        	headerDate.innerHTML='<div class="clear"> <a href="javascript:void(0)"><strong>Your Schedules On '+date.format('DD/MM/YYYY') +'</strong></a> ';

		        	 var curDay = schedule[0].Sun;
		        	 for (var i = 0; i < curDay.length; i++) {
		     		    var counter = curDay[i];
		     		    console.log(counter.subject);
		     		    
		     		    var startTime = counter.startTime;
		     		    
		     		    var hours = parseInt( startTime / 60);
		     		    var minutes = "0"+parseInt( startTime % 60 );
		     		   
		     		    
		     		    var timez = hours+":"+minutes+":00";
		     		    console.log(timez);
		     		    
		     		    
						div.innerHTML = div.innerHTML + '<br><span class="badge bg-success">'+ timez +'</span><br><br><div style="width:300px;">Course : '+ counter.courseName +' </div><br><div style="width:300px;">Batch : '+ counter.batch +'</div><br><div style="width:300px;">Subject : '+ counter.subject +' </div><br><div style="width:300px;">Class Room : '+ counter.classRoomNo +' </div><br>';
		 				
		 
		     		    
		     		}
		        	
		        }
		        
		        
		        
		        
		        document.getElementById("calendar").style.display="none";
		        document.getElementById("schedules").style.display="block";
		        document.getElementById("calBack").style.display="block";
		        document.getElementById("headerDate").style.display="block";
		        

		        
		       
		      
		      
		      
		        
		        
		        
		    }
		});
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  

});






function start_websocket() {

    websocket = new WebSocket("ws://"+webSocketIp+"/CyberClazServer/socket/" + userId);

    websocket.onopen = function() {
        websocket.send("ID3 ");
        console.log("Message send");
    };

    websocket.onmessage = function(evt) {

        var result = evt.data;
        console.log("websocket message");
        console.log(result);

        parseResult(result);

    };

}


function show(){

	
	var currentTimeForDisplay =sessionStorage.getItem('currentTimeForDisplay');


	var curHour = currentTimeForDisplay.substring(0, 2);
	var curMin = currentTimeForDisplay.substring(3, 5);

	/* console.log(curMin);
	console.log(curHour);
	 */

	var Digital=new Date()
	/* var hours=Digital.getHours()
	var minutes=Digital.getMinutes() */
	var hours=parseInt(curHour); ;
	var minutes=parseInt(curMin); 

	/* console.log(hours);
	console.log(minutes); */
	var seconds=Digital.getSeconds();

	if (minutes<=9)
	minutes="0"+minutes;
	if (hours<=9)
		hours="0"+hours;
	if (seconds<=9)
	seconds="0"+seconds;
	document.Tick.Clock.value=hours+":"+minutes+":"+seconds+" Hrs";
	setTimeout("show()",1000);

	if(seconds=='59'){
		minutes = parseInt(minutes); 
		minutes=minutes+1;
	}



	 if(minutes>'59'){
		 minutes = parseInt(minutes); 
		 minutes=0;
		hours = parseInt(hours); 
		hours = hours+1;
	} 
	 
	 
	 if (hours>'23') {
		
		   hours = parseInt(hours); 
			hours = 00;
			 minutes = parseInt(minutes); 
			 minutes=00;
		 
	 }


	var timeNow = hours+':'+minutes;
	sessionStorage.setItem('currentTimeForDisplay',timeNow);

	}




var mydate=new Date()
var theyear=mydate.getYear()
if (theyear < 1000)
theyear+=1900
var theday=mydate.getDay()
var themonth=mydate.getMonth()+1
if (themonth<10)
themonth="0"+themonth
var theday=mydate.getDate()
if (theday<10)
theday="0"+theday

//////EDIT below three variable to customize the format of the date/////

var displayfirst=themonth
var displaysecond=theday
var displaythird=theyear

////////////////////////////////////

document.dform.currentdate.value=displaysecond+"/"+displayfirst+"/"+displaythird







function parseResult(result) {
    var obj = JSON.parse(result);
    var origin = obj.origin;

    if (origin == "startRecord") {
    	
    	var obj = JSON.parse(result);
   	    var cur = obj.response.startRecordResult.liveSessionDetails;
   	 
   	    
     	    
   	sessionStorage.setItem("liveSessionFlag","1");
   	sessionStorage.setItem("liveSessionDetails",result);
   	
   	
   	$("#schedule_commets").html("Your Class Already Started @");
	$("#time_left").html(min_to_word1(0)+"<br><br>  <a class='pull-right' href='live_class.html'><b>Attend Now <div class='fa fa-chevron-circle-right'></div><b></a>");

	 
	
	 var liveClassSideMenu = document.getElementById("liveClassSideMenu");
	 liveClassSideMenu.innerHTML = '<a href="live_class.html"><i class="fa fa-users"></i> Live Class</a>';
	
	
	
		
	 var StartTime  = cur.StartTime;
	 var ProfilePicURL  = cur.ProfilePicURL;
	 var Subject  = cur.Subject;
	 var CurrentScheduleId  = cur.CurrentScheduleId;
	 var Chaptername  = cur.Chaptername;
	 var TeacherName  = cur.TeacherName;
	 var TeacherId  = cur.TeacherId;
	 var ClazEventDetailId  = cur.ClazEventDetailId;
	 var Topicname  = cur.Topicname;
	 
	 
	    sessionStorage.setItem("StartTime", StartTime);
		sessionStorage.setItem("ClazEventDetailId", ClazEventDetailId);
		sessionStorage.setItem("ProfilePicURL", ProfilePicURL);
		sessionStorage.setItem("Subject", Subject);
		sessionStorage.setItem("Topicname", Topicname);
		sessionStorage.setItem("TeacherName", TeacherName);
		sessionStorage.setItem("Chaptername", Chaptername);
	 
	 
	 
	 

	 
	 var modalAttendBoday = document.getElementById("modalAttendBoday");
	 modalAttendBoday.innerHTML = '<article class="media"><span class="pull-left thumb-sm"><img src="'+ProfilePicURL+'" class="img-circle"></span><div class="media-body"><div class="pull-right media-xs text-center text-muted"> <strong class="h4">'+StartTime+'</strong><br> <small class="label bg-light" style="font-size:8px;">started at</small> </div> <a href="javascript:void(0)" class="h4">Subject : '+Subject+'</a> <small class="block"><a href="javascript:void(0)" class="">Teacher</a> <span class="label label-success">'+TeacherName+'</span></small> <small class="block m-t-sm">Lecture On : '+Topicname+' </small></div></article> ';


$('#attendClassModal').modal('show');
   	    
   	    
   	    
	

    }
}


function startManually(){
	
	window.location="initialize_claz_manual.html";
	
	
}

