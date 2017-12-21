$(document).ready(function() {

    $("#login_frm").submit(function() {
    	sessionStorage.clear();
        var vname = $("#username").val();
        sessionStorage.setItem("loguser", vname);
        
        
        var form = $(this);
	    form.parsley().validate();
		if (form.parsley().isValid()){
        
        
        

        $("#msgbox").css("color", "").removeClass().addClass('myinfo').text('Validating Details..').fadeIn(1000);

        this.timer = setTimeout(function() {
            $.ajax({
                url: webServerUrl,
                data: 'request=login&username=' + $('#username').val() + '&password=' + $('#password').val(),
                type: 'post',
                
               
                success: function(msg) {
                	
                	
                	 var loginJson = msg.trim();
     				 obj = JSON.parse(loginJson);
        	   		 var resultCode  = obj.response.resultcode;
        	   		 var message  = obj.response.message;


     				if(resultCode== 1)
     				{	
     					
     					var role  = obj.response.loginResult.role;
     					var proPic  = obj.response.loginResult.proPic;
     					var firstName  = obj.response.loginResult.firstName;
     					
     					var liveSessionFlag  = obj.response.loginResult.liveSessionFlag;
     					sessionStorage.setItem("proPic", proPic);
     					sessionStorage.setItem("firstName", firstName);
     					//sessionStorage.setItem("middleName", obj.response.loginResult.middleName);
     					sessionStorage.setItem("role", role);
     					sessionStorage.setItem("liveSessionFlag", liveSessionFlag);
     					
     					if(liveSessionFlag=='1'){
     						
     						
     						 var ClazEventDetailId  = obj.response.loginResult.liveSessionDetails.ClazEventDetailId;
     						 var StartTime  = obj.response.loginResult.liveSessionDetails.StartTime;
     						 var ProfilePicURL  = obj.response.loginResult.liveSessionDetails.ProfilePicURL;
     						 var Subject  = obj.response.loginResult.liveSessionDetails.Subject;
     						 var CurrentScheduleId  = obj.response.loginResult.liveSessionDetails.CurrentScheduleId;
     						 var Chaptername  = obj.response.loginResult.liveSessionDetails.Chaptername;
     						 var TeacherName  = obj.response.loginResult.liveSessionDetails.TeacherName;
     						 var TeacherId  = obj.response.loginResult.liveSessionDetails.TeacherId;
     						 var Topicname  = obj.response.loginResult.liveSessionDetails.Topicname;
     						 
     						
     						
     						sessionStorage.setItem("StartTime", StartTime);
     						sessionStorage.setItem("ClazEventDetailId", ClazEventDetailId);
     						sessionStorage.setItem("ProfilePicURL", ProfilePicURL);
     						sessionStorage.setItem("Subject", Subject);
     						sessionStorage.setItem("Topicname", Topicname);
     						sessionStorage.setItem("TeacherName", TeacherName);
     						sessionStorage.setItem("Chaptername", Chaptername);
     						
     						
     					}
     					
     					
     					 
     					 if(role=='Student'){
     						 
     						var studentCourse = obj.response.loginResult.studentProfileDetails[0].courseName;
     						var studentBatch= obj.response.loginResult.studentProfileDetails[0].batchname;
     						var studentSem= obj.response.loginResult.studentProfileDetails[0].semName;
     						 
     						
     					
     						sessionStorage.setItem("studentCourse", studentCourse);
     						sessionStorage.setItem("studentBatch", studentBatch);
     						sessionStorage.setItem("studentSem", studentSem); 
     						 
     						 
     						window.location="student_dashboard.html";
     					 }
     					 
     					 if(role=='Teacher'){
     						 
      					
      						 
      						window.location="teacher_dashboard.html";
      					 }
      					 
     					 
     					 if(role=='Manager'){
     						 
           					
      						 
       						window.location="manager_dashboard.html";
       					 }
       					 
      					 
     					 
     					 
     					 
     					 
     					 
     					 
     					 
     					 
     					 
     					 
     					 
     					 
     					 
     					
     			         

                    } else {
                        $("#msgbox").fadeTo(200, 0.1, function() //start fading the messagebox
                            {
                                $(this).html(message).css("color", "red").removeClass().addClass('myerror').fadeTo(900, 1);
                            });

                    }
                }

            });
        }, 200);
        return false;
        
        
		} 
        
        
        
    });



});