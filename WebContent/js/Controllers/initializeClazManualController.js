var userId = sessionStorage.getItem("loguser");
var is_mobile = false;


var localUserResponse =  sessionStorage.getItem("localUserResponse").trim();
var localUserResponseObj = JSON.parse(localUserResponse);
var subjectList = localUserResponseObj.response.statusResult.subjectList;
var subjectListArrayLength  = subjectList.length;




for (var i = 0; i < subjectListArrayLength; i++) {
	var subjectList = localUserResponseObj.response.statusResult.subjectList[i];


       var subjectListDiv = document.getElementById("subjectList");
       subjectListDiv.innerHTML = subjectListDiv.innerHTML+ '<option value="'+subjectList.subjectName+'">'+subjectList.subjectName+'</option>';
   
            
       
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



show();
start_websocket();






$(document).ready(function(){
	
	
	

		
		
		 $.ajax({
	         url: webServerUrl,
	         data: 'request=takeAttendance&scheduleId=101',
	         type: 'post',
	         success: function(msg) {
	       	console.log(msg);
	       	          var loginJson = msg.trim();
					  obj = JSON.parse(loginJson);
		   		      var resultCode  = obj.response.resultcode;
		   		      var message  = obj.response.message;
		   		 
		   		 
		   		if(resultCode== 1)
				{
		   		    
		   			var attendanceResult = obj.response.attendanceResult;
		   			
		   			 offline = attendanceResult.offline;
		   			 local = attendanceResult.local;
		   			 remote = attendanceResult.remote;
		   			
		   			 offlineLength = attendanceResult.offline.length;
		   			 localLength = attendanceResult.local.length;
		   			 remoteLength = attendanceResult.remote.length;
		   			
		   		  onlineStudents = document.getElementById("onlineStudents");
		   		  remoteStudents = document.getElementById("remoteStudents");
		   		 OfflineStudents = document.getElementById("OfflineStudents");
		   		   		 
		   		
			
		   			
		   		if(offlineLength>0) {
		   			
		   			for (var i = 0; i < offlineLength; i++) {
		   		        var cur = offline[i];
		   		        
		   		       
		   		     OfflineStudents.innerHTML = OfflineStudents.innerHTML + '<div id="'+cur.userId+'">'+
		   		    	'<a href="javascript:void(0)"> <span class="thumb avatar pull-left m-r"> '+
		   		    	'<img src="'+cur.proPic+'" class="dker" alt="..."> '+
		   		    	'<i class="on md b-black" style="border: none; width:10px;height:10px; background-color: red;"></i>'+
		   		    	'<br> <center><b>'+cur.name+'</b></center>'+
		   		    	'</span></a></div>';
		   		        
		   		        
		   		        
		   		        
		   		        
		   			}
		   			
		   		}
		   			
		   		
		   		
		   		
		   		
		   		


		   		
		   		
				if(remoteLength>0) {
		   			
		   			for (var i = 0; i < remoteLength; i++) {
		   		        var cur = remote[i];
		   		        
		   		        
		   		         remoteStudents.innerHTML = remoteStudents.innerHTML + '<div id="'+cur.userId+'">'+
		   		    	'<a href="javascript:void(0)"> <span class="thumb avatar pull-left m-r"> '+
		   		    	'<img src="'+cur.proPic+'" class="dker" alt="..."> '+
		   		    	'<i class="on md b-black" style="border: none; width:10px;height:10px; background-color: yellow;"></i>'+
		   		    	'<br> <center><b>'+cur.name+'</b></center>'+
		   		    	'</span></a></div>';
		   		        
		   		        
		   			}
		   			
		   		}else{
		   			
		   			remoteStudents.innerHTML = '<br><br> <center><b><i>No remote students are present!!</i></b></center>';
			   			
			   		}
				
				

				
				
				
				
				
				
				if(localLength>0) {
		   			
		   			for (var i = 0; i < localLength; i++) {
		   		        var cur = local[i];
		   		        
		   		        
		   		        onlineStudents.innerHTML = onlineStudents.innerHTML + '<div id="'+cur.userId+'">'+
		   		    	'<a href="javascript:void(0)"> <span class="thumb avatar pull-left m-r"> '+
		   		    	'<img src="'+cur.proPic+'" class="dker" alt="..."> '+
		   		    	'<i class="on md b-black" style="border: none; width:10px;height:10px; background-color: #1aae88;"></i>'+
		   		    	'<br> <center><b>'+cur.name+'</b></center>'+
		   		    	'</span></a></div>';
		   		        
		   		        
		   		        
		   		        
		   			}
		   			
		   		}else{
		   			
		   		  onlineStudents.innerHTML = '<br><br> <center><b><i>No students are present in class room!!</i></b></center>';
		   			
		   		}
		   			
		   			
		   		
		   		
		   		
		   			
		   			
		   			
		   			
		   			
		   			
		   			
				}
		   		
		   
	       	  
	       	  
	         }
	     });
		
		
		
		
		
		
		
		
		
		
		
		
		

	
	
	
	 
	 
	 
	 
	 
	 	
	 	$("#startrecord_frm_manual").submit(function(){
			
		    var curcourseName = $('#curcourseName').val();
		    var cursemester = $('#cursemester').val();
		    var cursubject = $('#subjectList').val();
		    var topicName = $('#topicName').val();
		    var chapterName = $('#chapterName').val();
		    var scheduleId = $('#scheduleId').val();
		    var subjectId = $('#subjectId').val();
		    var duration = $('#duration').val();
		    
		    
		   
              this.timer = setTimeout(function () {
					$.ajax({
						url: webServerUrl,
					     data: 'request=startRecord&scheduleId='+ 101 +'&chapterName=' + chapterName+'&topicName=' + topicName+'&duration=' + duration+'&subjectId=' + subjectId+'&subjectName=' + cursubject+'&courseName=' + curcourseName,
			          	type: 'post',
			   			success: function(msg){
			   				
			   				 var loginJson = msg.trim();
			   				 obj = JSON.parse(loginJson);
			   		   		 var resultCode  = obj.response.resultcode;
			   		   		 var message  = obj.response.message;
			   		   		 
			   		   		 
			   		   		if(resultCode== 1)
			   				{
			   		   		    var classEventId  = obj.response.startRecordResult.classEventId;
			   		   			
			   		   			sessionStorage.setItem("startRecordResult",loginJson);
			   		   		    sessionStorage.setItem("cursubject",cursubject);
			   		   	        sessionStorage.setItem("topicName",topicName);
			   		   	        sessionStorage.setItem("chapterName",chapterName);
			   		   	        sessionStorage.setItem("classEventId",classEventId);
			   		   	        
			   		   	        
			   		   	        
			   		   	        
			   		   	        
			   		   	        
			   		   	        
			   		   	        
			   		   	  if( $('#isMobile').css('display')=='none') {
			   		        is_mobile = true;       
			   		    }

			   		    

			   		    if (is_mobile == true) {
			   		    	window.location="claz_recorder_mobile.html";
			   		    }else {
			   		    	
			   		    	window.location="claz_recorder.html";
			   		    	
			   		    }
			   		   	        
			   		   	        
			   		   	        
			   		   	        
			   		   	        
			   		   	        
			   		   	        
			   		   	        
			   		   			
			   		   	       
			   		   			
		
							}
							else
							{
								
					
		
							}
						}
					
					});
				}, 200);
		
		
			
			
			
				return false;
			});	
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 

	 
	
});


function parseResult(result) {
	   
	var obj = JSON.parse(result);
    var origin = obj.origin;

    if (origin == "addToAttendance") {
   	    
    	var userId = obj.response.result.userId;
      	
    	
    	if(offlineLength>0) {
   			
   			for (var i = 0; i < offlineLength; i++) {
   		        var cur = offline[i];
   		        
   		       
   		          if(cur.userId==userId){
   		        	  
   		        	  var userPic = cur.proPic;
   		        	  var name = 	cur.name;
   		        	  
   		        	   document.getElementById(userId).remove();
   		        	   
   		        	   
   		        
   		        		   
   		        		onlineStudents.innerHTML = onlineStudents.innerHTML + '<div id="'+userId+'">'+
   		   		    	'<a href="javascript:void(0)"> <span class="thumb avatar pull-left m-r"> '+
   		   		    	'<img src="'+userPic+'" class="dker" alt="..."> '+
   		   		    	'<i class="on md b-black" style="border: none; width:10px;height:10px; background-color: #1aae88;"></i>'+
   		   		    	'<br> <center><b>'+name+'</b></center>'+
   		   		    	'</span></a></div>';
   		  
   		        	  
   		        	  
   		        	  
   		          }
   		        
   		        
   		        
   		        
   		        
   			}
   			
   		}


    }
    
    
    
    
    
    
    
   if (origin == "removeFromAttendance") {
   	    
    	var userId = obj.response.result.userId;
    	var status = obj.response.result.status;
    	
    	
    	
    	
    	
    	if(localLength>0) {
   			
   			for (var i = 0; i < localLength; i++) {
   		        var cur = local[i];
   		        
   		       
   		          if(cur.userId==userId){
   		        	  
   		        	  var userPic = cur.proPic;
   		        	  var name = 	cur.name;
   		        	  
   		        	   document.getElementById(userId).remove();
   		        	   
   		        	   
   		        	   
   		        	OfflineStudents.innerHTML = OfflineStudents.innerHTML + '<div id="'+userId+'">'+
	   		    	'<a href="javascript:void(0)"> <span class="thumb avatar pull-left m-r"> '+
	   		    	'<img src="'+userPic+'" class="dker" alt="..."> '+
	   		    	'<i class="on md b-black" style="border: none; width:10px;height:10px; background-color: red;"></i>'+
	   		    	'<br> <center><b>'+name+'</b></center>'+
	   		    	'</span></a></div>';
   		        	   
   		        	   
   		        	   
   		        	   }
   		        		  
   		        	  
   		        	  
   		          }
   		        
   		        
   		        
   		        
   		        
   			}
   			
   		}


    }
    
    

    
    
    
    
    
    
    
    








