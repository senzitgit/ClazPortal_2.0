
var firstName = sessionStorage.getItem("firstName");
var userRole = sessionStorage.getItem("role");
var userPic =  sessionStorage.getItem("proPic");
var userName=sessionStorage.getItem('loguser');


var picturePanel = document.getElementById("picturePanel");
picturePanel.innerHTML = '<a href="javascript:void(0)" class="thumb-sm avatar animated rollIn" data-toggle="dropdown"> <img src="'+userPic+'" alt="" class=""><span class="caret caret-white"></span></a>';

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


$(document).ready(function() 
	{ 
	 
 	$("#targetAttdSubmit").click(function(){
		  
		  
        document.getElementById("target_attdDiv").style.display="block"; 
		document.getElementById("target_passDiv").style.display="none"; 
		document.getElementById("future_GoalDiv").style.display="none"; 
		document.getElementById("intro").style.display="none";
	  

	  }); 
	
	
	$("#passPercentSubmit").click(function(){
		  
		  
		  
        document.getElementById("target_attdDiv").style.display="none"; 
		document.getElementById("target_passDiv").style.display="block"; 
		document.getElementById("future_GoalDiv").style.display="none"; 
		document.getElementById("intro").style.display="none";
	  

	  }); 
	
	
	$("#goalSubmit").click(function(){
		  
		  
		  
        document.getElementById("target_attdDiv").style.display="none"; 
		document.getElementById("target_passDiv").style.display="none"; 
		document.getElementById("future_GoalDiv").style.display="block"; 
		document.getElementById("intro").style.display="none";
	  

	  }); 
	

	 
	 $("#target_form").submit(function()
			 	{
				var teacherId = $("#attd_Teacher_Name").val();
				var classRoomNo = $("#attd_Class_Name").val();
				var attendancePercentage = $("#target_percentage").val();
				var form = $(this);
				 form.parsley().validate();
					if (form.parsley().isValid())
						{
				$.ajax({
			        url: webServerUrl,
			        data: 'request=targetAttentancePercentage&teacherId='+teacherId+'&classRoomNo='+classRoomNo+'&attendancePercentage='+attendancePercentage,
			        type: 'post',
			        success: function(msg) 
			        {
			             var loginJson = msg.trim();
			     		 obj = JSON.parse(loginJson);
			        	 var resultCode  = obj.response.resultcode;
			        	 var message  = obj.response.message;
			        	 
			        	 if(resultCode== 1)
			     		 {	
			        		 
			        		document.getElementById("failAlert").style.display="none"; 
			        		document.getElementById("successAlert").style.display="block";
			        		document.getElementById("customMessage").innerHTML=" Attendance Percentage Target Inserted..";
			     		 }
			     		 else 
			     		 {
			     			document.getElementById("failAlert").style.display="block"; 
			        		document.getElementById("successAlert").style.display="none";
			              }
			          }

			     }, 200);
					return false;
			 	}
			    });
		 	 
		/*Target Pass Percentage*/
			 
			 $("#pass_form").submit(function()
			 	{
				var teacherId = $("#pass_Teacher_Name").val();
				var classRoomNo = $("#pass_Class_Name").val();
				var passPercentage = $("#pass_percentage").val();
				var form = $(this);
				 form.parsley().validate();
					if (form.parsley().isValid())
						{
				$.ajax({
			        url: webServerUrl,
			        data: 'request=targetPassPercentage&teacherId='+teacherId+'&classRoomNo='+classRoomNo+'&passPercentage='+passPercentage,
			        type: 'post',
			        success: function(msg) 
			        {
			             var loginJson = msg.trim();
			     		 obj = JSON.parse(loginJson);
			        	 var resultCode  = obj.response.resultcode;
			        	 var message  = obj.response.message;
			        	 if(resultCode== 1)
			     		 {	
			        		 
			        		document.getElementById("failAlert").style.display="none"; 
			        		document.getElementById("successAlert").style.display="block";
			        		document.getElementById("customMessage").innerHTML=" Pass Percentage Target Inserted..";
			     		 }
			     		 else 
			     		 {
			     			document.getElementById("failAlert").style.display="block"; 
			        		document.getElementById("successAlert").style.display="none";
			              }
			          }

			     }, 200);
					return false;
			 	}
			    });
		 	 
			 
			/* Future Goal*/
			 	 
			 	 $("#futureGoal_form").submit(function()
			 	 	{
			 		var userId = $("#goal_Student_Name").val();
			 		var classRoomNo = $("#goal_Class_Name").val();
			 		var goal = $("#goals").val();
			 		var form = $(this);
					 form.parsley().validate();
						if (form.parsley().isValid())
							{
			 		$.ajax({
			 	        url: webServerUrl,
			 	        data: 'request=futureGoals&userId='+userId+'&classRoomNo='+classRoomNo+'&goal='+goal,
			 	        type: 'post',
			 	        success: function(msg) 
			 	        {
			 	             var loginJson = msg.trim();
			 	     		 obj = JSON.parse(loginJson);
			 	        	 var resultCode  = obj.response.resultcode;
			 	        	 var message  = obj.response.message;
			 	        	 
			 	        	 if(resultCode== 1)
				     		 {	
				        		 
				        		document.getElementById("failAlert").style.display="none"; 
				        		document.getElementById("successAlert").style.display="block";
				        		document.getElementById("customMessage").innerHTML=" Future Goal Inserted..";
				     		 }
				     		 else 
				     		 {
				     			document.getElementById("failAlert").style.display="block"; 
				        		document.getElementById("successAlert").style.display="none";
				              }
			 	          }

			 	     }, 200);
			 			return false;
			 	 	}
			 	    });
			  	 
			 
			/*GetTeacherName */
			 
			 $.ajax({
		         url: webServerUrl,
		         data: 'request=getTeacherList',
		         type: 'post',
		         success: function(msg)
		         	{
		        	 var teacherNameResponse = msg.trim();
		        	 
		        	 var obj = JSON.parse(teacherNameResponse );
		        	 
		        	 var resultCode = obj.response.resultcode;
		        	 var message = obj.response.message;
		        	 
		        	  var teacherName = obj.response.teacherListResult.teacherList;
		        	 
		        	  var attd_Teacher_Name = document.getElementById("attd_Teacher_Name");
		        	 var pass_Teacher_Name= document.getElementById("pass_Teacher_Name");
		        	
		        	 for (var i=0; i<=teacherName .length;i++)
		        	 {
		        		 
		        		 var cur = teacherName [i];
		        		 attd_Teacher_Name.innerHTML =  attd_Teacher_Name.innerHTML + '<option >'+cur.teacherId+'</option>';
		        		 pass_Teacher_Name.innerHTML = pass_Teacher_Name.innerHTML + '<option>'+cur.teacherId+'</option>';
		        		
		        	 }
		    
		         	}
		    	 

		 
		        	

		     });
			 
			 /*Get Class Room*/
			 $.ajax({
		         url: webServerUrl,
		         data: 'request=getClassRoom',
		         type: 'post',
		         success: function(msg)
		         	{
		        	 var classRoomResponse = msg.trim();
		        	 
		        	 var obj = JSON.parse(classRoomResponse );
		        	 
		        	 var resultCode = obj.response.resultcode;
		        	 var message = obj.response.message;
		        	 
		        	  var className = obj.response.getClassRoomResult.classRoomDetails;
		        	  var attd_Class_Name= document.getElementById("attd_Class_Name");
		          	
		        	 var pass_Class_Name= document.getElementById("pass_Class_Name");
		        	 var goal_Class_Name= document.getElementById("goal_Class_Name");
		        	 for (var i=0; i<=className.length;i++)
		        	 {
		        		 
		        		 var cur = className[i];
		        		 attd_Class_Name.innerHTML =  attd_Class_Name.innerHTML + '<option >'+cur.classRoomNo+'</option>';
		        		 pass_Class_Name.innerHTML =  pass_Class_Name.innerHTML + '<option>'+cur.classRoomNo+'</option>';
		        		 goal_Class_Name.innerHTML =  goal_Class_Name.innerHTML + '<option value="'+cur.classRoomNo+'">'+cur.classRoomNo+'</option>';
		        	 }
		      
		    
		         	}
			 });
		    	 

		 
		/*GetStudentName */
			 $.ajax({
			      url: webServerUrl,
			      data: 'request=getStudentNameFromClass',
			      type: 'post',
			      success: function(msg) 
			      {
			      	 
			     	 	 var StudentNameResponse = msg.trim();
				        	 
				        	 var obj = JSON.parse(StudentNameResponse);
				        	 
				        	 var resultCode = obj.response.resultcode;
				        	 var message = obj.response.message;
				        	 
				        	  var studentName = obj.response.studentNameListResult.studentList;
				        	 
				        	 
				        	 var goal_Student_Name = document.getElementById("goal_Student_Name");
				        	
				        	 for (var i=0; i<=studentName.length;i++)
				        	 {
				        		 
				        		 var cur = studentName[i];
				        		 
				        		
				        		 goal_Student_Name.innerHTML =  goal_Student_Name.innerHTML + '<option>'+cur.studentId+'</option>';
				 
				        		
				        	 }
				    
			     	 

			      }

			  }); 
	 
	
   	 

});


function sel_class()
{
	var classRoomNo= $("#goal_Class_Name").val();
	

	
	$.ajax({
        url: webServerUrl,
        data: 'request=getStudentNameFromClass&classRoomNo='+classRoomNo,
        type: 'post',
        success: function(msg) 
        {
        	 
       	 	 var StudentNameResponse = msg.trim();
	        	 
	        	 var obj = JSON.parse(StudentNameResponse);
	        	 
	        	 var resultCode = obj.response.resultcode;
	        	 var message = obj.response.message;
	        	 
	        	  var studentName = obj.response.studentNameListResult.studentList;
	        	 
	        	 
	        	 var goal_Student_Name = document.getElementById("goal_Student_Name");
	        	 goal_Student_Name.innerHTML ="";
	        	 for (var i=0; i<=studentName.length;i++)
	        	 {
	        		 
	        		 var cur = studentName[i];
	        		 
	        		 goal_Student_Name.innerHTML =  goal_Student_Name.innerHTML + '<option>'+cur.studentId+'</option>';
	        		 
	        	 }
	    
       	 

        }

    });
	
	
}


	
