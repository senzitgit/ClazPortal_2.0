var firstName = sessionStorage.getItem("firstName");
var userRole = sessionStorage.getItem("role");
var userPic =  sessionStorage.getItem("proPic");
var userName=sessionStorage.getItem('loguser');


var picturePanelNav = document.getElementById("picturePanelNav");
picturePanelNav.innerHTML = '<a href="javascript:void(0)" class="thumb-sm avatar animated rollIn" data-toggle="dropdown"> <img src="'+userPic+'" alt="" class=""><span class="caret caret-white"></span></a>';

document.getElementById("namePanelNav").innerHTML ='<b>'+sessionStorage.getItem("firstName")+'</b>';


function signout(){
	
	
	

	sessionStorage.clear();
	window.location="index.html";
	
	
	
	   
	$.ajax({
         	url: webServerUrl,
         	data: 'request=logout',
         	type: 'post',
  			success: function(msg){
  				
  			 var loginJson = msg.trim();
				
	   		 obj = JSON.parse(loginJson);
	   		 var resultCode  = obj.response.resultcode;
	   		 var message  = obj.response.message;
	   		 

	   		if(resultCode== 1)
				{			
					
				console.log(msg);
				sessionStorage.clear();
				window.location="index.html";
		   		
		   		}
				
			
				
				
			}
		
		});	
	
	
	
	
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














var liveSessionFlag = sessionStorage.getItem("liveSessionFlag");
var userId = sessionStorage.getItem("loguser");



if(liveSessionFlag=='1') {
	
	    var liveSessionDetails = sessionStorage.getItem("liveSessionDetails");
	 
		
		 var StartTime  = sessionStorage.getItem("StartTime");
		 var ProfilePicURL  = sessionStorage.getItem("ProfilePicURL");
		 var Subject  = sessionStorage.getItem("Subject");
		 var CurrentScheduleId  = sessionStorage.getItem("liveSessionFlag");
		 var Chaptername  = sessionStorage.getItem("liveSessionFlag");
		 var TeacherName  = sessionStorage.getItem("TeacherName");
		 var TeacherId  = sessionStorage.getItem("liveSessionFlag");
		 var Topicname  = sessionStorage.getItem("Topicname");
		 

		 
		 var modalAttendBoday = document.getElementById("modalAttendBoday");
		 modalAttendBoday.innerHTML = '<article class="media" style="border:1px solid #5BBFAB;padding:10px;">'+
			 '<h1 style="font-size:25px;">Class Room :101</h1><span class="pull-left thumb-sm">'+
			 '<img src="'+ProfilePicURL+'" class="img-circle"></span>'+
			 '<div class="media-body">'+
			 '<a href="javascript:void(0)" class="h4">Subject : '+Subject+'</a> '+
			 '<small class="block"><a href="javascript:void(0)" class="">Teacher</a> '+
			 '<span class="label label-success">'+TeacherName+'</span></small> '+
			 '<div class="pull-right media-xs  text-muted"><a href="live_class_manager.html"> <img src="images/manager_play.png" style="height:50px !important;"></a></div> '+
			 '<small class="block m-t-sm">Lecture On : '+Topicname+' </small>'+
			 '<br><div class=" media-xs  text-muted"> '+
			 '<strong class="h4">'+StartTime+'</strong><br> '+
			 '<small class="label bg-light" style="font-size:8px;">started at</small> </div> '+
			 '</div>'+
			 '</div>'+
			 
			 '<footer class="panel-footer pos-rlt pull-right">'+
             '<span class="arrow top"></span> '+
        '<a href="list_classes.html">View All</a>'+
          '</footer>'+
			 '</article> ';
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 

		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
 

	
}






