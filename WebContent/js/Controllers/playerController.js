var secz = 0; 
var minsz = 0;  
var hourz = 0; 


var rated = 0;



var numberofLikes = 0;
var numberofDLikes = 0;

document.getElementById("picturePanelNav").innerHTML ='<img src="'+sessionStorage.getItem("proPic")+'">';

document.getElementById("namePanelNav").innerHTML ='<b>'+sessionStorage.getItem("firstName")+'</b>';

var queryDict = {};
location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]});
var classId = queryDict['classId'];
var teacherName = queryDict['teacher'];
var subjectName = queryDict['subject'];





getPlayerInfo(classId);







$(function () {
    $('#toGDiv').click(function () {
        $('#chatBody').slideToggle();
      
    });
    
  
    
});








var localUserResponse =  sessionStorage.getItem("localUserResponse").trim();
var localUserResponseObj = JSON.parse(localUserResponse);








$(document).ready(function(){

	
	
 
 	
 	
 	$("#likeButton").click(function(){
 		
 		
 		
 		$("#likeButton").prop('id', 'LeNouveauNomDeMaBaliseID');
 		
 		
 		
 		if(rated==0){
 			
 			$.ajax({
 	 		    url: webServerUrl,
 	          	data: 'request=userLikerating&classEventDetailId=' +sessionStorage.getItem("classEventId"),
 	          	type: 'post',
 	   			success: function(msg){
 	   				
 	   				
 	   			 var lCount = document.getElementById('lCount');
 	   			 numberofLikes = numberofLikes+1;
 	   			 lCount.innerHTML = numberofLikes;
 	   				
 	   			rated = 1;
 	   				
 	 	   	
 	 		}
 	 	
 	 	});
 			
 		}else {
 			
 			return false;
 			
 		}
 		
 			
 		
 	
 		

 	});
 	
 	
 	
 	$("#disLikeButton").click(function(){
		 
 		if(rated==0){
		
		
	  	$.ajax({
 		    url: webServerUrl,
          	data: 'request=userDislikeRating&classEventDetailId=' +sessionStorage.getItem("classEventId"),
          	type: 'post',
   			success: function(msg){
   				
   				document.getElementById("disLikeButton").disabled = true;
   			 var dCount = document.getElementById('dCount');
   			 numberofDLikes = numberofDLikes+1;
   			 dCount.innerHTML = numberofDLikes;
   			rated = 1;
 		}
		
		});
		
 		}else {
 			return false;
 			
 		}
 		
 		

 	});
 	
 	
 	
 	
 	
 	$("#clazNoteButton").click(function(){
 	  
 	  
 	  document.getElementById("logArea").style.display="none";
 	  document.getElementById("attachmentArea").style.display="none"; 
 	
 	  document.getElementById("noteArea").style.display="block"; 
 	 document.getElementById("raiseArea").style.display="none"; 
 	 
   return false;
 
   });
 	
 	
 	
 	

 	$("#raiseButton").click(function(){
 	  
 	  
 	  document.getElementById("logArea").style.display="none";
 	  document.getElementById("attachmentArea").style.display="none"; 
 	
 	  document.getElementById("noteArea").style.display="none"; 
 	  document.getElementById("raiseArea").style.display="block"; 
 	
 	 return false;
 
   });
 	
 	
 	
 	$("#logButton").click(function(){
 		  
 		
 		 document.getElementById("logArea").style.display="block";
 		  document.getElementById("attachmentArea").style.display="none"; 
 		 
 		  document.getElementById("noteArea").style.display="none"; 
 		 document.getElementById("raiseArea").style.display="none"; 
 	  
 		return false;
 	  });
 	
 	
 
 	
 	$("#attachmentButton").click(function(){
 		  
 		 document.getElementById("logArea").style.display="none";
 		  document.getElementById("attachmentArea").style.display="block"; 
 		
 		  document.getElementById("noteArea").style.display="none"; 
 	 
 		 document.getElementById("raiseArea").style.display="none"; 
 	  
 		return false;
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




function parseResult(result) {
    var Teachimage = "";
    var obj = JSON.parse(result);
    var origin = obj.origin;

    if (origin == "shareAttachment") {
    	
    	var obj = JSON.parse(result);
   	    var cur = obj.response.shareAttachmentResult;

        document.getElementById('attachmentButton').style['-webkit-animation'] = 'pulse-border 1s infinite';

        liveAttachments.liveClassAttachment.push({
	            "link": cur.link,
	            "name": cur.name,
	            "type": cur.type,
	            "index": attachmentListFlag

	        });

	        //alert(JSON.stringify(liveAttachments));

	       sessionStorage.setItem("liveClassAttachment", JSON.stringify(liveAttachments));

	        var addAttach = document.getElementById('addAttach');

	        addAttach.innerHTML = '<article id="chat-id-1" class="chat-item right"> <a href="#" class="pull-right thumb-sm avatar"><img src="' + ProfilePicURL + '" class="img-circle"></a> <section class="chat-body" > <div class="panel bg bg-success text-sm m-b-none"  style="background-color:#5BBFAB"> <div class="panel-body"> <span class="arrow right" style="border-left-color:#5BBFAB"></span>' + cur.name + '<a href="#" onclick="openPopup(' + attachmentListFlag + ')"><div class="fa fa-eye" Style="font-size:15px;float:right;color:#fff"></div> </a>    <a href="' + cur.link + '" download><div class="fa fa-download" Style="font-size:15px;float:right;margin-right:20px;color:#fff"></div></a></div>  </div> <small class="text-muted"><i class="fa fa-paperclip"></i>&nbsp;&nbsp;Type : ' + cur.type + '</small> </section> </article>' + addAttach.innerHTML;
	        attachmentListFlag++;
		




    } else if (origin == "generalLog") {

    	 var obj = JSON.parse(result);
    	 var cur = obj.response.generalLogResult;
    	
    	if (cur.raiseHandText == "0") {
            var addLogs = document.getElementById('addLogs');
            addLogs.innerHTML = '<article style="margin-right:10px;" id="chat-id-1" class="chat-item left"> <a href="#" class="pull-left thumb-sm avatar"><img src="' + cur.profilePic + '" class="img-circle"></a> <section class="chat-body"> <div class="panel text-sm m-b-none"> <div class="panel-body" style="height:30px; padding: 5px;background-color:#5BBFAB;color:#fff; "> <span class="arrow left" style="border-right-color:#5BBFAB;"></span><span style="font-size:12px; margin-top:-30px;">' + cur.logText + '</span> </div> </div> <small class="text-muted"><i class="fa fa-check text-success"></i>' + cur.timestamp + '</small> </section> </article>' + addLogs.innerHTML;
        }  
           else {

                var question = cur.raiseHandText;
                var answer = cur.raiseHandAnswer;
                var user = cur.logText;
                user = user.replace(/(\w+).*/, "$1");
                var pic = cur.profilePic;


               liveraiseHands.liveClassRaiseHand.push({
                    "question": question,
                    "answer": answer,
                    "user": user,
                    "pic": pic,
                    "index": raiseHandListFlag

                });

                //alert(JSON.stringify(liveraiseHands));
               sessionStorage.setItem("liveClassRaiseHand", JSON.stringify(liveraiseHands));

                var addLogs = document.getElementById('addLogs');
                addLogs.innerHTML = '<article style="margin-right:10px;" id="chat-id-1" class="chat-item left"> <a href="#" class="pull-left thumb-sm avatar"><img src="' + cur.profilePic + '" class="img-circle"></a> <section class="chat-body"> <div class="panel text-sm m-b-none"> <div class="panel-body" style="height:30px; padding: 5px;background-color:#5BBFAB;color:#fff; "> <span class="arrow left" style="border-right-color:#5BBFAB;"></span><span style="font-size:12px; margin-top:-30px;">' + cur.logText + '</span> <a href="#" onclick="RHModal(' + raiseHandListFlag + ')" style="float:right;"><div style="color:#fff;font-size:15px;" class="fa fa-comment"></div></a></div> </div> <small class="text-muted"><i class="fa fa-check text-success"></i>' + cur.timestamp + '</small> </section> </article>' + addLogs.innerHTML;

                raiseHandListFlag++;

                var raiseHandDoubts = document.getElementById(cur.raiseHandText);
                raiseHandDoubts.innerHTML = '<article id="' + cur.raiseHandText + '" style="" id="chat-id-1" class="chat-item left"> <a href="#" class="pull-left thumb-sm avatar"><img src="' + cur.profilePic + '" class="img-circle"></a> <section class="chat-body"> <div class="panel text-sm m-b-none">    <div class="panel-body" style=" padding: 5px;background-color:#5BBFAB;color:#fff; "> <span class="arrow left" style="border-right-color:#5BBFAB"></span>' + cur.raiseHandText + ' <br>Answer : ' + cur.raiseHandAnswer + ' </div></div> <small class="text-muted"><i class="fa fa-circle text-success text-xs"></i> </small> &nbsp;Answered </section> </article>';



        } 









    } else if (origin == "raiseHandQueueNotification") {

        var Teachimage = userPic;
        var raiseText =sessionStorage.getItem("raiseText");
        var raiseTime =sessionStorage.getItem("raiseTime");
        var raiseDuration =sessionStorage.getItem("raiseDuration");


        var hms = raiseDuration;
        var a = hms.split(':'); // split it at the colons

        // minutes are worth 60 seconds. Hours are worth 60 minutes.
        var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);

        var raiseHandDoubts = document.getElementById(raiseText);
        raiseHandDoubts.innerHTML = '<article id="' + raiseText + '" style="" id="chat-id-1" class="chat-item left"> <a href="#" class="pull-left thumb-sm avatar"><img src="' + Teachimage + '" class="img-circle"></a> <section class="chat-body"> <div class="panel text-sm m-b-none"> <div class="panel-body" style="height:30px; padding: 5px;background-color:#FF4747;color:#fff; "> <span class="arrow left" style="border-right-color:#FF4747;"></span>' + raiseText + '</div> </div> <small class="text-muted"><i class="fa fa-circle text-danger text-xs"></i> </small> &nbsp;Added In Queue </section> </article>';



    } else if (origin == "stopRecord") {

    	
    	sessionStorage.setItem("liveSessionFlag","0");
        document.getElementById("infoBar").style.display = "none";
        document.getElementById("endBar").style.display = "block";

        $.ajax({
            url: webServerUrl,
            data: 'request=exitSession&clazNotes=' + JSON.stringify(logs)+'&ClazEventDetailId='+ClazEventDetailId ,
            type: 'post',
            success: function(msg) {

                setTimeout(function() {

                    var url = "student_dashboard.html";
                    $(location).attr('href', url);


                }, 5000);


            }

        });




    } 
  
    }









$(document).ready(function() {

           $.ajax({
	        	          url: webServerUrl,
	        	          data: 'request=getTime&role=student',
	        	          type: 'post',
	        	          success: function(msg) {
	        	        	  
	        	        	 var loginJson = msg.trim();
	          				 obj = JSON.parse(loginJson);
	             	   		 var resultCode  = obj.response.resultcode;
	             	   		 var message  = obj.response.message;
	             	   		 
	             	   		 
	             	   		if(resultCode== 1)
	         				{
	             	   		    var currentTimeForDisplay = obj.response.getTimeResult.time;
	             	   		   sessionStorage.setItem('currentTimeForDisplay',currentTimeForDisplay);
	             	   			show();
	             	   			
	         				}
	             	   		
	             	   
	        	        	  
	        	        	  
	        	          }
	        	      });
           
           
           
           
   /* Ask A Doubt */      
           
    $("#doubt_form").submit(function(){
               
    	
    	
    	
    	
         
         
                   var doubt = $('#doubt').val();
                   var DoubtN= $('#doubt').val();
                    
              
                   doubt = btoa(doubt);
               
         this.timer = setTimeout(function () {
         	$.ajax({
         		    url: webServerUrl,
                  	data: 'request=askaDoubt&doubt='+ doubt +'&classEventDetailId=' +sessionStorage.getItem("classEventId"),
                  	type: 'post',
           			success: function(msg){
           				
           			 var loginJson = msg.trim();
      				 obj = JSON.parse(loginJson);
         	   		 var resultCode  = obj.response.resultcode;
         	   		 var message  = obj.response.message;
         	   		 
         	   		 console.log(msg)
         	   		 
         	   		if(resultCode== 1)
     				{
         				
         					document.getElementById("doubt_form").reset();
         					
         					
         					
         					
         					
         					
         					 var doubtsPan = document.getElementById('doubtsPan');
         					doubtsPan.innerHTML = doubtsPan.innerHTML+'<div class="direct-chat-msg right">'+
         		            '<div class="direct-chat-info clearfix">'+
       		              '<span class="direct-chat-name pull-right">'+sessionStorage.getItem("firstName")+'</span>'+
       		            '</div>'+
       		            '<!-- /.direct-chat-info -->'+
       		            '<img class="direct-chat-img" src="'+sessionStorage.getItem("proPic")+'" alt="Message User Image">'+
       		            '<div class="direct-chat-text">'+DoubtN +
       		            '</div>'+
       		          '</div>';
         					
         					
         					
         					
         					
         					
         					
         					
         					
         					
         				
                        
         			
         			}
         			else
         			{
         				
         
         			}
         		}
         	
         	});
         }, 200);
         return false;
         });
           
           
           
           
           
    /* Advance Search */      
    
    $("#advanceSearch_form").submit(function(){
    	
    	
    	var subjectList = $("#subjectList").val();
    	var date = $("#date").val();
    	var topic = $("#topic").val();
   
         
         this.timer = setTimeout(function () {
         	$.ajax({
         		    url: webServerUrl,
         		    data: 'request=advancedSearch&subject='+subjectList+'&date='+date+'&topic='+topic,
                  	type: 'post',
           			success: function(msg){
           				
           			 var ServerResp = msg.trim();
    				 obj = JSON.parse(ServerResp);
       		   		 var resultCode  = obj.response.resultcode;
       		   		 var message  = obj.response.message;
       		   	     var SearchResult  = obj.response.SearchResult;
       		   	     
       		var fullSearchList  = obj.response.SearchResult.fullSearchList;
       		var subjTopicList  = obj.response.SearchResult.subjTopicList;
       		var subjectList  = obj.response.SearchResult.subjectList;
       		var dateList  = obj.response.SearchResult.dateList;
       		var dateSubjectList  = obj.response.SearchResult.dateSubjectList;
       		var topicList  = obj.response.SearchResult.topicList;
           				
       		var fullSearchListLength  = obj.response.SearchResult.fullSearchList.length;
       		var subjTopicListLength  = obj.response.SearchResult.subjTopicList.length;
       		var subjectListLength  = obj.response.SearchResult.subjectList.length;
       		var dateListLength  = obj.response.SearchResult.dateList.length;
       		var dateSubjectListLength  = obj.response.SearchResult.dateSubjectList.length;
       		var topicListLength  = obj.response.SearchResult.topicList.length;		
           				
 			var searchList = document.getElementById("searchList"); 
 			searchList.innerHTML = '<div class="list-group-item"><div class="col-lg-2"><img src="images/books8.png" height="20px"></div><div class="col-lg-2"><img src="images/legal4.png" height="20px"></div><div class="col-lg-2"><img src="images/teacher41.png" height="20px"></div><div class="col-lg-2"><img src="images/schoolboy1.png" height="20px"></div><div class="col-lg-2"><img src="images/clock118.png" height="20px"></div><div class="col-lg-2"></div><br></div>';
           				
       		   	if(resultCode== 1)
         			{				
         			
		       		   	 if(fullSearchListLength>0) {
		 			   		
						   	 for (var i = 0; i < fullSearchListLength; i++) {
					   		       var cur = fullSearchList[i];
					   		       searchList.innerHTML = searchList.innerHTML  + '<div class="list-group-item"><div class="col-lg-2">'+cur.courseName+'</div><div class="col-lg-2">'+cur.subject+'</div><div class="col-lg-2">'+cur.topic+'</div><div class="col-lg-2">'+cur.teacherName+'</div><div class="col-lg-2">'+cur.date+'</div><div class="col-lg-2"><a href="#" class="btn btn-default btn-xs" style="background-color: #5BBFA9;" onclick="getPlayerInfo('+cur.eventId+')"><div class="fa fa-video-camera" style="font-size:10px"></div> &nbsp;&nbsp;Watch session</a></div><br><br></div>';					   		    
					   		    }
					      }
		       		   	 
		       		   	 
		       		   	 else if(subjTopicListLength>0) {
		 			   		
						   	 for (var i = 0; i < subjTopicListLength; i++) {
					   		       var cur = subjTopicList[i];
					   		       searchList.innerHTML =searchList.innerHTML  + '<div class="list-group-item"><div class="col-lg-2">'+cur.courseName+'</div><div class="col-lg-2">'+cur.subject+'</div><div class="col-lg-2">'+cur.topic+'</div><div class="col-lg-2">'+cur.teacherName+'</div><div class="col-lg-2">'+cur.date+'</div><div class="col-lg-2"><a href="#" class="btn btn-default btn-xs" style="background-color: #5BBFA9;" onclick="getPlayerInfo('+cur.eventId+')"><div class="fa fa-video-camera" style="font-size:10px"></div> &nbsp;&nbsp;Watch session</a></div><br><br></div>';					   		    
					   		    }
					      }
		       		  
		       		  
		       		  else if(subjectListLength>0) {
	 			   		
					   	 for (var i = 0; i < subjectListLength; i++) {
				   		       var cur = subjectList[i];
				   		       searchList.innerHTML = searchList.innerHTML  + '<div class="list-group-item"><div class="col-lg-2">'+cur.courseName+'</div><div class="col-lg-2">'+cur.subject+'</div><div class="col-lg-2">'+cur.topicName+'</div><div class="col-lg-2">'+cur.teacherName+'</div><div class="col-lg-2">'+cur.date+'</div><div class="col-lg-2"><a href="#" class="btn btn-default btn-xs" style="background-color: #5BBFA9;" onclick="getPlayerInfo('+cur.clazEventDetailId+')"><div class="fa fa-video-camera" style="font-size:10px"></div> &nbsp;&nbsp;Watch session</a></div><br><br></div>';					   		    
				   		    }
				      }
		       		
		       		
		       		 else if(dateListLength>0) {
	 			   		
					   	 for (var i = 0; i < dateListLength; i++) {
				   		       var cur = dateList[i];
				   		       searchList.innerHTML = searchList.innerHTML  + '<div class="list-group-item"><div class="col-lg-2">'+cur.courseName+'</div><div class="col-lg-2">'+cur.subject+'</div><div class="col-lg-2">'+cur.topic+'</div><div class="col-lg-2">'+cur.teacherName+'</div><div class="col-lg-2">'+cur.date+'</div><div class="col-lg-2"><a href="#" class="btn btn-default btn-xs" style="background-color: #5BBFA9;" onclick="getPlayerInfo('+cur.eventId+')"><div class="fa fa-video-camera" style="font-size:10px"></div> &nbsp;&nbsp;Watch session</a></div><br><br></div>';					   		    
				   		    }
				      }
		       		
		       		 else if(dateSubjectListLength>0) {
	 			   		
					   	 for (var i = 0; i < dateSubjectListLength; i++) {
				   		       var cur = dateSubjectList[i];
				   		       searchList.innerHTML = searchList.innerHTML  + '<div class="list-group-item"><div class="col-lg-2">'+cur.courseName+'</div><div class="col-lg-2">'+cur.subject+'</div><div class="col-lg-2">'+cur.topic+'</div><div class="col-lg-2">'+cur.teacherName+'</div><div class="col-lg-2">'+cur.date+'</div><div class="col-lg-2"><a href="#" class="btn btn-default btn-xs" style="background-color: #5BBFA9;" onclick="getPlayerInfo('+cur.eventId+')"><div class="fa fa-video-camera" style="font-size:10px"></div> &nbsp;&nbsp;Watch session</a></div><br><br></div>';					   		    
				   		    }
				      }
		       		   	 
		       		 else if(topicListLength>0) {
		 			   		
					   	 for (var i = 0; i < topicListLength; i++) {
				   		       var cur = topicList[i];
				   		       searchList.innerHTML = searchList.innerHTML  + '<div class="list-group-item"><div class="col-lg-2">'+cur.courseName+'</div><div class="col-lg-2">'+cur.subject+'</div><div class="col-lg-2">'+cur.topic+'</div><div class="col-lg-2">'+cur.teacherName+'</div><div class="col-lg-2">'+cur.date+'</div><div class="col-lg-2"><a href="#" class="btn btn-default btn-xs" style="background-color: #5BBFA9;" onclick="getPlayerInfo('+cur.eventId+')"><div class="fa fa-video-camera" style="font-size:10px"></div> &nbsp;&nbsp;Watch session</a></div><br><br></div>';					   		    
				   		    }
				      }
		       		   	 
		       		 else {
		       			 
		       			searchList.innerHTML ='<center><div style="font-size:100px;margin-top:150px;" class="fa fa-times"></div><div style="font-size:15px;">No Search Results Found!! Search Again..</div></center>';
		       			 
		       		 }
       		   		
  
         			
         			$('#searchModal').modal('show');
         			
         			}
         			else
         			{
         				$("#msgbox_advanced").fadeTo(200,0.1,function() //start fading the messagebox
                        	{
                            $(this).html(message).removeClass().addClass('myerror').fadeTo(900,1);
                         });
         
         			}
         		}
         	
         	});
         }, 200);
         return false;
         });  
           
          
    
    
    
    
    $("#Search_form").submit(function(){
    	
    	
    	var subjectList = $("#minSubject").val();
    	var date = $("#minDate").val();
    	var topic = $("#minTopic").val();
   
         
         this.timer = setTimeout(function () {
         	$.ajax({
         		    url: webServerUrl,
         		    data: 'request=advancedSearch&subject='+subjectList+'&date='+date+'&topic='+topic,
                  	type: 'post',
           			success: function(msg){
           				
           			 var ServerResp = msg.trim();
    				 obj = JSON.parse(ServerResp);
       		   		 var resultCode  = obj.response.resultcode;
       		   		 var message  = obj.response.message;
       		   	     var SearchResult  = obj.response.SearchResult;
       		   	     
       		var fullSearchList  = obj.response.SearchResult.fullSearchList;
       		var subjTopicList  = obj.response.SearchResult.subjTopicList;
       		var subjectList  = obj.response.SearchResult.subjectList;
       		var dateList  = obj.response.SearchResult.dateList;
       		var dateSubjectList  = obj.response.SearchResult.dateSubjectList;
       		var topicList  = obj.response.SearchResult.topicList;
           				
       		var fullSearchListLength  = obj.response.SearchResult.fullSearchList.length;
       		var subjTopicListLength  = obj.response.SearchResult.subjTopicList.length;
       		var subjectListLength  = obj.response.SearchResult.subjectList.length;
       		var dateListLength  = obj.response.SearchResult.dateList.length;
       		var dateSubjectListLength  = obj.response.SearchResult.dateSubjectList.length;
       		var topicListLength  = obj.response.SearchResult.topicList.length;		
           				
 			var searchList = document.getElementById("searchList"); 
 			searchList.innerHTML = '<div class="list-group-item"><div class="col-lg-2"><img src="images/books8.png" height="20px"></div><div class="col-lg-2"><img src="images/legal4.png" height="20px"></div><div class="col-lg-2"><img src="images/teacher41.png" height="20px"></div><div class="col-lg-2"><img src="images/schoolboy1.png" height="20px"></div><div class="col-lg-2"><img src="images/clock118.png" height="20px"></div><div class="col-lg-2"></div><br></div>';
           				
       		   	if(resultCode== 1)
         			{				
         			
		       		   	 if(fullSearchListLength>0) {
		 			   		
						   	 for (var i = 0; i < fullSearchListLength; i++) {
					   		       var cur = fullSearchList[i];
					   		       searchList.innerHTML = searchList.innerHTML  + '<div class="list-group-item"><div class="col-lg-2">'+cur.courseName+'</div><div class="col-lg-2">'+cur.subject+'</div><div class="col-lg-2">'+cur.topic+'</div><div class="col-lg-2">'+cur.teacherName+'</div><div class="col-lg-2">'+cur.date+'</div><div class="col-lg-2"><a href="#" class="btn btn-default btn-xs" style="background-color: #5BBFA9;" onclick="getPlayerInfo('+cur.eventId+')"><div class="fa fa-video-camera" style="font-size:10px"></div> &nbsp;&nbsp;Watch session</a></div><br><br></div>';					   		    
					   		    }
					      }
		       		   	 
		       		   	 
		       		   	 else if(subjTopicListLength>0) {
		 			   		
						   	 for (var i = 0; i < subjTopicListLength; i++) {
					   		       var cur = subjTopicList[i];
					   		       searchList.innerHTML =searchList.innerHTML  + '<div class="list-group-item"><div class="col-lg-2">'+cur.courseName+'</div><div class="col-lg-2">'+cur.subject+'</div><div class="col-lg-2">'+cur.topic+'</div><div class="col-lg-2">'+cur.teacherName+'</div><div class="col-lg-2">'+cur.date+'</div><div class="col-lg-2"><a href="#" class="btn btn-default btn-xs" style="background-color: #5BBFA9;" onclick="getPlayerInfo('+cur.eventId+')"><div class="fa fa-video-camera" style="font-size:10px"></div> &nbsp;&nbsp;Watch session</a></div><br><br></div>';					   		    
					   		    }
					      }
		       		  
		       		  
		       		  else if(subjectListLength>0) {
	 			   		
					   	 for (var i = 0; i < subjectListLength; i++) {
				   		       var cur = subjectList[i];
				   		       searchList.innerHTML = searchList.innerHTML  + '<div class="list-group-item"><div class="col-lg-2">'+cur.courseName+'</div><div class="col-lg-2">'+cur.subject+'</div><div class="col-lg-2">'+cur.topicName+'</div><div class="col-lg-2">'+cur.teacherName+'</div><div class="col-lg-2">'+cur.date+'</div><div class="col-lg-2"><a href="#" class="btn btn-default btn-xs" style="background-color: #5BBFA9;" onclick="getPlayerInfo('+cur.clazEventDetailId+')"><div class="fa fa-video-camera" style="font-size:10px"></div> &nbsp;&nbsp;Watch session</a></div><br><br></div>';					   		    
				   		    }
				      }
		       		
		       		
		       		 else if(dateListLength>0) {
	 			   		
					   	 for (var i = 0; i < dateListLength; i++) {
				   		       var cur = dateList[i];
				   		       searchList.innerHTML = searchList.innerHTML  + '<div class="list-group-item"><div class="col-lg-2">'+cur.courseName+'</div><div class="col-lg-2">'+cur.subject+'</div><div class="col-lg-2">'+cur.topic+'</div><div class="col-lg-2">'+cur.teacherName+'</div><div class="col-lg-2">'+cur.date+'</div><div class="col-lg-2"><a href="#" class="btn btn-default btn-xs" style="background-color: #5BBFA9;" onclick="getPlayerInfo('+cur.eventId+')"><div class="fa fa-video-camera" style="font-size:10px"></div> &nbsp;&nbsp;Watch session</a></div><br><br></div>';					   		    
				   		    }
				      }
		       		
		       		 else if(dateSubjectListLength>0) {
	 			   		
					   	 for (var i = 0; i < dateSubjectListLength; i++) {
				   		       var cur = dateSubjectList[i];
				   		       searchList.innerHTML = searchList.innerHTML  + '<div class="list-group-item"><div class="col-lg-2">'+cur.courseName+'</div><div class="col-lg-2">'+cur.subject+'</div><div class="col-lg-2">'+cur.topic+'</div><div class="col-lg-2">'+cur.teacherName+'</div><div class="col-lg-2">'+cur.date+'</div><div class="col-lg-2"><a href="#" class="btn btn-default btn-xs" style="background-color: #5BBFA9;" onclick="getPlayerInfo('+cur.eventId+')"><div class="fa fa-video-camera" style="font-size:10px"></div> &nbsp;&nbsp;Watch session</a></div><br><br></div>';					   		    
				   		    }
				      }
		       		   	 
		       		 else if(topicListLength>0) {
		 			   		
					   	 for (var i = 0; i < topicListLength; i++) {
				   		       var cur = topicList[i];
				   		       searchList.innerHTML = searchList.innerHTML  + '<div class="list-group-item"><div class="col-lg-2">'+cur.courseName+'</div><div class="col-lg-2">'+cur.subject+'</div><div class="col-lg-2">'+cur.topic+'</div><div class="col-lg-2">'+cur.teacherName+'</div><div class="col-lg-2">'+cur.date+'</div><div class="col-lg-2"><a href="#" class="btn btn-default btn-xs" style="background-color: #5BBFA9;" onclick="getPlayerInfo('+cur.eventId+')"><div class="fa fa-video-camera" style="font-size:10px"></div> &nbsp;&nbsp;Watch session</a></div><br><br></div>';					   		    
				   		    }
				      }
		       		   	 
		       		 else {
		       			 
		       			searchList.innerHTML ='<center><div style="font-size:100px;margin-top:150px;" class="fa fa-times"></div><div style="font-size:15px;">No Search Results Found!! Search Again..</div></center>';
		       			 
		       		 }
       		   		
  
         			
         			$('#searchModal').modal('show');
         			
         			}
         			else
         			{
         				$("#msgbox_advanced").fadeTo(200,0.1,function() //start fading the messagebox
                        	{
                            $(this).html(message).removeClass().addClass('myerror').fadeTo(900,1);
                         });
         
         			}
         		}
         	
         	});
         }, 200);
         return false;
         });  
    
    
    
	        	   


});




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

changestat();



function changestat(){  
stopwatch();  
}  
function stopwatch(){
	
	
var x=document.getElementById('butn').value; 
if (x=='Pause'){ 
   secz++;  
  if (secz == 60) {  
   secz = 0;  
   minsz = minsz + 1;   
} 
  else {  
   minsz = minsz;  
} 
  if (minsz == 60) {  
   minsz = 0;   
   hourz += 1;   
}  
if (secz<=9) { 
secz = "0" + secz;   
} 
 var stwa=document.getElementById('stwa'); 

 stwa.value= ((hourz<=9) ? "0"+hourz : hourz) + " : " + ((minsz<=9) ? "0" + minsz : minsz) + " : " + secz;  
 
duration= ((hourz<=9) ? "0"+hourz : houzr) + " : " + ((minsz<=9) ? "0" + minsz : minsz) + " : " + secz; 

sessionStorage.setItem('localDuration',duration);

 
SD=window.setTimeout("stopwatch();", 1000);   
			}  
			}  



function getPlayerInfo(classEventId){

	
	 sessionStorage.setItem("classEventId", classEventId);
	
	
	  $.ajax({
          url: webServerUrl,
          data: 'request=getPlayerInfo&clazEventDetailId='+classEventId ,
          type: 'post',
          success: function(msg) {
        	  
        	 var ServerResp = msg.trim();
 				 obj = JSON.parse(ServerResp);
    		   		 var resultCode  = obj.response.resultcode;
    		   		 var message  = obj.response.message;
    		   	    
    		   	     
    				
    		   	if(resultCode== 1)
      			{				
        	  
    		   		
    	 			
    		   		
    		   		
    		   		generalLog = obj.response.PlayerInfoResult.classEventDetails[0].generalLog;
    		   		AttachmentInfo = obj.response.PlayerInfoResult.AttachmentInfo;
    		   		raiseHandAskaDoubtAnswer = obj.response.PlayerInfoResult.raiseHandAskaDoubtAnswer;
    		   		var Notes = obj.response.PlayerInfoResult.Notes;
    		   		var viewersList = obj.response.PlayerInfoResult.viewersList;
    		   		
    		   		
    		   		var generalLogLength = obj.response.PlayerInfoResult.classEventDetails[0].generalLog.length;
    		   		var AttachmentInfoLength = obj.response.PlayerInfoResult.AttachmentInfo.length;
    	
    		   		
    		   		var NotesLength = obj.response.PlayerInfoResult.Notes.length;
    		   		var viewersListLength = obj.response.PlayerInfoResult.viewersList.length;
    		   		
    		   		
    		   	   sessionLikes = obj.response.PlayerInfoResult.viewersRating.like;
    		   	   sessionDisLikes = obj.response.PlayerInfoResult.viewersRating.disLike;
    		   		
    		   		
    		   	   
    		   	   
    		   	var lCount = document.getElementById('lCount');
	   			lCount.innerHTML = sessionLikes;
	   			
	   			var dCount = document.getElementById('dCount');
	   			dCount.innerHTML = sessionDisLikes;
    		   	   
    		   	   

	   			numberofLikes = sessionLikes;
	   			 numberofDLikes = sessionDisLikes;
    		   	   
    		   	   
    		   	   
    		   	   
    		   		
    		   		var teacherProPic = obj.response.PlayerInfoResult.ProfilePic;
    		   		
    		   		
    		   		
    		   		
    		   		
    		   		var teacherPic = obj.response.PlayerInfoResult.ProfilePic;
    		   		
    		   		
    		   		var listLogs = document.getElementById("listLogs");
    		   		listLogs.innerHTML ="";
			   		var listAttachment = document.getElementById("listAttachment");
			   		listAttachment.innerHTML ="";
			   		var listNotes = document.getElementById("listNotes");
			   		listNotes.innerHTML ="";
			   		
			   		var listRaiseHand = document.getElementById("listRaiseHand");
			   		listRaiseHand.innerHTML ="";
			   		
			   		
    		   		
    	 			
    	
					
					
					
			/*		var chapterInfo = document.getElementById("chapterInfo"); 
					chapterInfo.innerHTML = '<b>'+obj.response.PlayerInfoResult.classEventDetails[0].chapterName+'</b>';
					
    	 			var topicInfo = document.getElementById("topicInfo"); 
    	 			topicInfo.innerHTML = obj.response.PlayerInfoResult.classEventDetails[0].topicName;
    	 			
    	 			var viewersCount = document.getElementById("viewersCount"); 
    	 			viewersCount.innerHTML = '<b>'+obj.response.PlayerInfoResult.viewersCount+'</b>';
					
    	 			
    	 			
    	 			var noOfLikes = document.getElementById("noOfLikes"); 
    	 			noOfLikes.innerHTML = '<b>'+sessionLikes+'</b>';
    	 		 	 
    	 			var noOfDisLikes = document.getElementById("noOfDisLikes"); 
    	 			noOfDisLikes.innerHTML = '<b>'+sessionDisLikes+'</b>';
    	 			
    	 			*/
			   		
			   		
			   		

		 			var CAM1  = obj.response.PlayerInfoResult.avDetails.videoFeed1;
			   		var CAM2  = obj.response.PlayerInfoResult.avDetails.videoFeed2;
			   		var CAM3  = obj.response.PlayerInfoResult.avDetails.videoFeed3;
			   		var CAM4 =  obj.response.PlayerInfoResult.avDetails.videoFeed4;


	                var AUD1  = obj.response.PlayerInfoResult.avDetails.audioFeed1;
			   		var AUD2  = obj.response.PlayerInfoResult.avDetails.audioFeed2;
			   		var AUD3  = obj.response.PlayerInfoResult.avDetails.audioFeed3;
			   		var AUD4  = obj.response.PlayerInfoResult.avDetails.audioFeed4;
			   		
			   		
			   		
			   		
			   		
			   		
			   		
			   		
			   		
			   		
			   		
			   		
			   			var teachPanel = document.getElementById("teachPanel"); 
			   		teachPanel.innerHTML = '<div class="h4 m-t-xs m-b-xs">'+teacherName.replace(/%20/g, " ")+'</div>'+
                        '<small class="text-muted"><i class="fa fa-bookmark-o"></i> '+subjectName.replace(/%20/g, " ")+'</small>';
             
			   		
			   		
			   		
    	 			
			   		var ClassInfo = document.getElementById("ClassInfo"); 
			   		ClassInfo.innerHTML = '<small class="text-uc text-xs text-muted">Chapter</small>'+
	                   ' <p>'+obj.response.PlayerInfoResult.classEventDetails[0].chapterName+'</p>'+
	                   ' <small class="text-uc text-xs text-muted">Topic</small> '+
	                    '<p>'+obj.response.PlayerInfoResult.classEventDetails[0].topicName+'</p>'+
	                    '<div class="line"></div>'+
	                    '<small class="text-uc text-xs text-muted">download</small> '+
	                    
	                    '<div class="nav-avatar pos-rlt">'+
'<a href="#" class="thumb-sm avatar animated rollIn" data-toggle="dropdown"> '+
'<button class="btn btn-rounded btn-google btn-icon"><i class="fa fa-download"></i></button> <span class="caret "></span> </a> '+
'<ul class="dropdown-menu m-t-sm animated fadeInLeft"> <span class="arrow top"></span> '+
'<li> <a href="'+CAM1+'" download>Feed 1</a> </li> '+
'<li> <a href="'+CAM2+'" download>Feed 2</a> </li> '+
'<li> <a href="'+CAM3+'" download>Feed 3</a> </li> '+
'<li class="divider"></li> <li> <a href="javascript:void(0)">Download All</a> </li>'+
'</ul> '+
 '</div> ';
	                    
	                    
	                    
	                    
	                    
			   		
			   		
			   		
			   		var Tpic = document.getElementById("Tpic"); 
			   		Tpic.innerHTML = '<img src="'+teacherProPic+'" class="img-circle">';
			   		
			   		var countsPan = document.getElementById("countsPan"); 
			   		countsPan.innerHTML = ''+
                        '<div class="col-xs-6"> <a href="#"> <span class="m-b-xs h4 block">'+obj.response.PlayerInfoResult.viewersCount+'</span> <small class="text-muted">Viewers</small> </a> </div>';
             
			   		
			   		
			   		
			   		var doubtIntro = document.getElementById("doubtIntro"); 
			   		doubtIntro.innerHTML ='<div class="direct-chat-info clearfix">'+
			              '<span class="direct-chat-name pull-left">'+teacherName.replace(/%20/g, " ")+'</span>'+
			             
			           ' </div>'+
			            '<img class="direct-chat-img" src="'+teacherProPic+'" alt="Message User Image">'+
			            '<div class="direct-chat-text">'+
			            '  Hi '+sessionStorage.getItem("firstName")+', If you have any doubts on my session you can ask here.'+
			           '</div>';
			   		
			   		
			   		
			   		
			   		
			   		
			   		
			   		
			   		
			   		
			   		
			   		
			   		
			   		
			   		
			   		
			   		
			   		
    	 			
    	 			
    	 			
    	 			if(generalLogLength>0) {
		 			   		
					   	 for (var i = 0; i < generalLogLength; i++) {
				   		       var cur = generalLog[i];
				   		       
				   		    var hms = cur.duration; 
				   		    var a = hms.split(':'); 
				   		    var duration = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 

				   		
				   		    
				   		    var divId = 's'+duration;
			   		       finalDuration= duration;
				   		       
				   		    if(cur.raiseHandText=='0'){
	
				   		    listLogs.innerHTML = listLogs.innerHTML + '<article style="margin-right:10px;" class="chat-item left" id="'+divId+'" onclick="seekFeeds('+duration+')">'+
				             '<a href="#" class="pull-left thumb-sm avatar">'+
						     '<img src="'+cur.profilePic+'" class="img-circle"></a> '+
						     '<section class="chat-body"> <div class="panel text-sm m-b-none"> '+
							 '<div class="panel-body" style="height:30px; padding: 5px;background-color:#5BBFAB;color:#fff; ">'+
							 '<span class="arrow left" style="border-right-color:#5BBFAB;"></span>'+
							 '<span style="font-size:12px; margin-top:-30px;">'+cur.logText+'</span>'+
							 '</div> '+
							 '</div> '+
							 '<small class="text-muted"><i class="fa fa-check text-success"></i>'+cur.timestamp+'</small> '+
							 '</section> '+
							 '</article>';
				   		} else {
				   			
				   		 listLogs.innerHTML = listLogs.innerHTML + '<article style="margin-right:10px;" class="chat-item left" id="'+divId+'" onclick="seekFeeds('+cur.duration+')">'+
			             '<a href="#" class="pull-left thumb-sm avatar">'+
					     '<img src="'+cur.profilePic+'" class="img-circle"></a> '+
					     '<section class="chat-body"> <div class="panel text-sm m-b-none"> '+
						 '<div class="panel-body" style="height:30px; padding: 5px;background-color:#5BBFAB;color:#fff; ">'+
						 '<span class="arrow left" style="border-right-color:#5BBFAB;"></span>'+
						 '<span style="font-size:12px; margin-top:-30px;">'+cur.logText+'</span>'+
						 '<div onclick="showRaiseHand('+i+')" style="float:right;"><div style="color:#fff;font-size:15px;" class="fa fa-comment"></div></div>'+
						 '</div> '+
						 '</div> '+
						 '<small class="text-muted"><i class="fa fa-check text-success"></i>'+cur.timestamp+'</small> '+
						 '</section> '+
						 '</article>';
				   			
				   			
				   		}
					   	 
					   	 
					   	 }
				      }
	       		   	 
    	 			
    	 		 	 
    	 		 	 
    	 		 	 
    	 		 	if(AttachmentInfoLength>0) {
	 			   		
					   	 for (var i = 0; i < AttachmentInfoLength; i++) {
				   		       var cur = AttachmentInfo[i];
	
				   		       
				   		 if(cur.attachmentType=='pdf'){
				   		       
				   		    listAttachment.innerHTML = listAttachment.innerHTML + '<article style="margin-left:10px;" id="chat-id-1" class="chat-item right">'+ 
							 '<a href="#" class="pull-right thumb-sm avatar">'+
							 '<img src="'+teacherPic+'" class="img-circle"></a> <section class="chat-body" >'+
							 '<div class="panel bg bg-success text-sm m-b-none"  style="background-color:#5BBFAB"> <div class="panel-body"> <span class="arrow right" style="border-left-color:#5BBFAB"></span>'+cur.attachmentName+'<a href="#"  onclick="showAttachments('+i+',0)"><div class="fa fa-eye" Style="font-size:15px;float:right;color:#fff"></div> </a>    <a href="'+cur.attachmentLink+'" download><div class="fa fa-download" Style="font-size:15px;float:right;margin-right:20px;color:#fff"></div></a></div>  </div> <small class="text-muted"><i class="fa fa-paperclip"></i>&nbsp;&nbsp;Type : '+cur.attachmentType+'</small> </section>'+ 
							 '</article>';
					   	 
				   		   }else {
				   			   
				   			 listAttachment.innerHTML = listAttachment.innerHTML + '<article style="margin-left:10px;" id="chat-id-1" class="chat-item right">'+ 
							 '<a href="#" class="pull-right thumb-sm avatar">'+
							 '<img src="'+teacherPic+'" class="img-circle"></a> <section class="chat-body" >'+
							 '<div class="panel bg bg-success text-sm m-b-none"  style="background-color:#5BBFAB"> <div class="panel-body"> <span class="arrow right" style="border-left-color:#5BBFAB"></span>'+cur.attachmentName+'<a href="#"  onclick="showAttachments('+i+',1)"><div class="fa fa-eye" Style="font-size:15px;float:right;color:#fff"></div> </a>    <a href="'+cur.attachmentLink+'" download><div class="fa fa-download" Style="font-size:15px;float:right;margin-right:20px;color:#fff"></div></a></div>  </div> <small class="text-muted"><i class="fa fa-paperclip"></i>&nbsp;&nbsp;Type : '+cur.attachmentType+'</small> </section>'+ 
							 '</article>';
		   
				   		   }
					   	 
					   	 }
				      }else{
				    	  
				    	  listAttachment.innerHTML ='<center><div class="fa fa-paperclip" style="margin-top:50px;font-size:18px;"></div><br><i  style="font-size:12px;">No attachments are shared in this session!!</i></center>';
				    	  
				      }
    	 			
    	 			
    	 		 	
    	 		 	
    	 		 	
    	 		 	if(NotesLength>0) {
	 			   		
					   	 for (var i = 0; i < NotesLength; i++) {
				   		       var cur = Notes[i];
	
				   		    listNotes.innerHTML = listNotes.innerHTML + '<article id="chat-id-1" class="chat-item right">'+ 
							   '<a href="#" class="pull-right thumb-sm avatar">'+ 
							   '<img src="'+userPic+'" class="img-circle"></a> '+ 
							   '<section class="chat-body"> <div class="panel bg bg-success text-sm m-b-none"> '+ 
							   '<div class="panel-body"> <span class="arrow right"></span>'+cur.notes+'</div> </div> '+ 
							   '<small class="text-muted"><i class="fa fa-check text-success"></i>'+cur.time+'</small>'+  
							   '</section></article>';
					   	 
					   	 
					   	 }
				      } else{
				    	  
				    	  
				    	  
				    	 
				    	  
				    	  listNotes.innerHTML ='<center><div class="fa fa-file" style="margin-top:50px;font-size:18px;"></div><br><i style="font-size:12px;">No notes are found in this session!!</i></center>';
				    	  
				      }
    	 		 	
    	 		 	
    	 		 	
    	 		 /*	var listViewers = document.getElementById("listViewers");
    	 		 	listViewers.innerHTML ="";
    	 		 	
    	 		 	
    	 		 	
    	 		 	if(viewersListLength>0) {
	 			   		
					   	 for (var i = 0; i < viewersListLength; i++) {
				   		       var cur = viewersList[i];
		       
				   		    listViewers.innerHTML =  listViewers.innerHTML + '<li><a href="#" data-toggle="tab">'+cur+'</a></li>';
	
					   	 }
				      } else{
				    	  
				    	  listViewers.innerHTML ='';
				    	  
				      }
    	 		 	
    	 		 	
    	 		 	*/
    	 		 	
    	 		 	
    	 		 	
    	 		
    	 		 	
    	 		 	
    	 			if(generalLogLength>0) {
	 			   		
					   	 for (var i = 0; i < generalLogLength; i++) {
				   		       var cur = generalLog[i];
				   		       
				   		    var hms = cur.duration; 
				   		    var a = hms.split(':'); 
				   		    var duration = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 

				   		
				   		    
				   		    var divId = 's'+duration;
			   		       finalDuration= duration;
				   		       
				   		    if(cur.raiseHandText=='0'){
	
				   		   
				   		} else {
				   			
				   		var userinfo = cur.logText;
				   		var user = 	userinfo.substr(0,userinfo.indexOf(' '));
				   			
				   			
				   	listRaiseHand.innerHTML = listRaiseHand.innerHTML + '<article id="" style="" id="chat-id-1" class="chat-item left"> <a href="#" class="pull-left thumb-sm avatar"><img src="' + cur.profilePic + '" class="img-circle"></a> <section class="chat-body"> <div class="panel text-sm m-b-none">    <div class="panel-body" style=" padding: 5px;background-color:#5BBFAB;color:#fff; "> <span class="arrow left" style="border-right-color:#5BBFAB"></span>' + cur.raiseHandText + ' <br>Answer : ' + cur.raiseHandAnswer + ' </div></div><small class="text-muted"><i class="fa fa-user text-xs"></i> </small> &nbsp;&nbsp;Asked By '+ user + '</section> </article>';

				   			
				   			
				   			
				   			
				   			
				   			
				   			
				   			
				   		}
					   	 
					   	 
					   	 }
				      }else{
				    	  
				    	  listRaiseHand.innerHTML ='<center><div class="fa fa-file" style="margin-top:50px;font-size:18px;"></div><br><i  style="font-size:12px;">No doubts are asked in this session!!</i></center>';
				    	  
				      }
    	 		 	
    	 		 	
    	 		 	
    	 		 	
    	 		 	
    	 		 	
    	 		 	
    	 		 	
    	 		 	
    	 		 	
    	 		 	
    	 		 	
    	 		 	
    	 		 	
    	 		 	
    	 		 	
    	 		 	
    	 		 	
    	 		 	
    	 		 	
    	 		 	
    	 		 	
    	 		 	
    
    	 		 	
    	 		 	
    	 			
    	 			
    	 			
					
    	 			
    	 			






		   		
	   			
		   		
		   			
		   	   		
		   			
			   		
			   		var feed1 = document.getElementById("feed1");
			   		var feed2 = document.getElementById("feed2");
			   		//var feed3 = document.getElementById("feed3");
			   		
			   		
    	 			
    	 			
			   		feed1.innerHTML = '<video  id="video1" width="100%"><source src="'+CAM1+'" type="video/mp4">Your browser does not support HTML5 video.</video><audio id="audio1" src="'+AUD1+'"></audio>';
			   		feed2.innerHTML = '<video  id="video2" width="100%"><source src="'+CAM2+'" type="video/mp4">Your browser does not support HTML5 video.</video><audio id="audio2" src="'+AUD1+'" ></audio>';
			     	feed3.innerHTML = '<video id="video3"  width="130px" height="130px"  style="border-radius:100%" ><source src="'+CAM3+'" type="video/mp4">Your browser does not support the video tag.</video>';

			   		//document.getElementById("feed3").style.display="block"; 
			   		
			   		
			   		
			   		if(userRole=='Student'){
			   			
			   			document.getElementById("askadoubt").style.display="block"; 
			   		}
			   		
			   		
			   		
			   		intializePlayer();
			   		doTimer();
    	 			
    	 			
    	 			
    	 			
    	 			
					
        	  
      			}
          }  
      
      });
	
	
	
	
}

function showRaiseHand(index){
	
	var cur = generalLog[index];
	
	
	
	    var question = cur.raiseHandText;
		var answer = cur.raiseHandAnswer;
		var user = cur.logText;
		user = user.replace(/(\w+).*/,"$1");
		var pict = cur.profilePic;
	 
   
	 var Panel1 = document.getElementById("Panel1");
	 var Panel2 = document.getElementById("Panel2");
	 
	 Panel1.innerHTML ='<center><img src="'+ pict +'" class="img-circle" height="50px;"><br><b><font color="#5BBFAB">'+user+'</b><br><br><br><br></font>';
	 Panel2.innerHTML ='<font color="#000"><b>'+ question +'</b></font><br><br><font color="#5BBFAB"><b>Answer : '+ answer +'</b></font>';

	
	$('#RHModal').modal('show');
	
	
}

function showAttachments(index,type){
	
	 var cur = AttachmentInfo[index];
	 
	 var link = cur.attachmentLink;
	 var attachmentName = cur.attachmentName;
	 
	 if(type==0) {
		
		$.fancybox({
			type: 'html',
			autoSize: false,
			content: '<embed src="'+link+'#nameddest=self&page=1&view=FitH,0&zoom=80,0,0" type="application/pdf" height="99%" width="100%" />',
			beforeClose: function() {
			$(".fancybox-inner").unwrap();
			},
						helpers: {
							overlay: {
							opacity: 0.3
							} 
						}
			}); 
	
	}
	
	
	
	if(type==1) {
		
	$.fancybox([
	        	
	        	{href:link, title: attachmentName}
	        	
	        	],{
	        	//			href: this.href,
	        				helpers: {
	        					overlay: {
	        					opacity: 0.3
	        					} // overlay
	        					//, buttons: {}
	        				} // helpers
	        			}); // fancybox
	
	
	
	}
	
	
	
	
}



