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
			 '<div class="pull-right media-xs  text-muted"><a href="live_class_manager.html"> <img src="images/manager_play.png" style="height:50px !important;"></a></div> '+			 '<small class="block m-t-sm">Lecture On : '+Topicname+' </small>'+
			 '<br><div class=" media-xs  text-muted"> '+
			 '<strong class="h4">'+StartTime+'</strong><br> '+
			 '<small class="label bg-light" style="font-size:8px;">started at</small> </div> '+
			 '</div>'+
			 '</div>'+
			 '</article> ';
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 modalAttendBoday.innerHTML = modalAttendBoday.innerHTML + '<article class="media" style="border:1px solid red;padding:10px;">'+
		 '<h1 style="font-size:25px;">Class Room :102</h1><br>'+
	
		 '<center><img src="images/no_class.png" style="height:50px !important;"></center></article> ';
		 
		 
		 
		 modalAttendBoday.innerHTML = modalAttendBoday.innerHTML + '<article class="media" style="border:1px solid red;padding:10px;">'+
		 '<h1 style="font-size:25px;">Class Room :103</h1><br>'+
	
		 '<center><img src="images/no_class.png" style="height:50px !important;"></center></article> ';
		 
		 
		 
		 
		 modalAttendBoday.innerHTML = modalAttendBoday.innerHTML + '<article class="media" style="border:1px solid red;padding:10px;">'+
		 '<h1 style="font-size:25px;">Class Room :104</h1><br>'+
	
		 '<center><img src="images/no_class.png" style="height:50px !important;"></center></article> ';
		 
		 
		 
		 
		 modalAttendBoday.innerHTML = modalAttendBoday.innerHTML + '<article class="media" style="border:1px solid red;padding:10px;">'+
		 '<h1 style="font-size:25px;">Class Room :105</h1><br>'+
	
		 '<center><img src="images/no_class.png" style="height:50px !important;"></center></article> ';
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
 

	
}else {
	
	
	 modalAttendBoday.innerHTML = modalAttendBoday.innerHTML + '<article class="media" style="border:1px solid red;padding:10px;">'+
	 '<h1 style="font-size:25px;">Class Room :101</h1><br>'+

	 '<center><img src="images/no_class.png" style="height:50px !important;"></center></article> ';
	 
	
	
	 modalAttendBoday.innerHTML = modalAttendBoday.innerHTML + '<article class="media" style="border:1px solid red;padding:10px;">'+
	 '<h1 style="font-size:25px;">Class Room :102</h1><br>'+

	 '<center><img src="images/no_class.png" style="height:50px !important;"></center></article> ';
	 
	 
	 
	 modalAttendBoday.innerHTML = modalAttendBoday.innerHTML + '<article class="media" style="border:1px solid red;padding:10px;">'+
	 '<h1 style="font-size:25px;">Class Room :103</h1><br>'+

	 '<center><img src="images/no_class.png" style="height:50px !important;"></center></article> ';
	 
	 
	 
	 
	 modalAttendBoday.innerHTML = modalAttendBoday.innerHTML + '<article class="media" style="border:1px solid red;padding:10px;">'+
	 '<h1 style="font-size:25px;">Class Room :104</h1><br>'+

	 '<center><img src="images/no_class.png" style="height:50px !important;"></center></article> ';
	 
	 
	 
	 
	 modalAttendBoday.innerHTML = modalAttendBoday.innerHTML + '<article class="media" style="border:1px solid red;padding:10px;">'+
	 '<h1 style="font-size:25px;">Class Room :105</h1><br>'+

	 '<center><img src="images/no_class.png" style="height:50px !important;"></center></article> ';
	
}
