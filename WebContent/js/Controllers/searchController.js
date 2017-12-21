

var localUserResponse =  sessionStorage.getItem("localUserResponse").trim();
var localUserResponseObj = JSON.parse(localUserResponse);
var subjectList = localUserResponseObj.response.statusResult.subjectList;
var subjectListArrayLength  = subjectList.length;







document.getElementById("picturePanelNav").innerHTML ='<img src="'+sessionStorage.getItem("proPic")+'">';

document.getElementById("namePanelNav").innerHTML ='<b>'+sessionStorage.getItem("firstName")+'</b>';





for (var i = 0; i < subjectListArrayLength; i++) {
	var subjectList = localUserResponseObj.response.statusResult.subjectList[i];


       var subjectListDiv = document.getElementById("subjectList");
       subjectListDiv.innerHTML = subjectListDiv.innerHTML+ '<option value="'+subjectList.subjectName+'">'+subjectList.subjectName+'</option>';
   
            
       
    }






$(document).ready(function(){
    
 	
 	

 	

 	
 	
 	

 	
 	
 	

	
 	
 
  
 	

 	

 	
 
 });






























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
           

           
           
    /* Advance Search */      
    
    $("#advanceSearch_form").submit(function(){
    	
    	
    	var subjectList = $("#subjectList").val();
    	var date = $("#date").val();
    	var topic = $("#topic").val();
    	
    	
    	$("#noResult").hide();
   
         
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
       		var classList  = obj.response.SearchResult.classList;
           				
       		var fullSearchListLength  = obj.response.SearchResult.fullSearchList.length;
       		var subjTopicListLength  = obj.response.SearchResult.subjTopicList.length;
       		var subjectListLength  = obj.response.SearchResult.subjectList.length;
       		var dateListLength  = obj.response.SearchResult.dateList.length;
       		var dateSubjectListLength  = obj.response.SearchResult.dateSubjectList.length;
       		var topicListLength  = obj.response.SearchResult.topicList.length;		
       		var classListLength  = obj.response.SearchResult.classList.length;	
           				
 			var searchList = document.getElementById("searchList"); 
 			searchList.innerHTML = '';
 			
 			$("#searchDataTable").show();
           				
       		   	if(resultCode== 1)
         			{				
         			
		       		   	 if(fullSearchListLength>0) {
		 			   		
		       		   	for (var i = 0; i < fullSearchListLength; i++) {
				   		       var cur = fullSearchList[i];
				   		       
				   		     searchList.innerHTML = searchList.innerHTML  + '<tr>'+
				   	         '<td>'+cur.subject+'</td>'+
				   	         '<td>'+cur.topic+'</td>'+
				   	         '<td>'+cur.teacherName+'</td>'+
				   	         '<td>'+cur.date+'</td>'+
				   	         '<td> <a href="claz_player.html?classId='+cur.eventId+'&teacher='+cur.teacherName+'&subject='+cur.subject+'" class="active" ><i style="font-size:20px;" class="fa fa-play-circle  fa-3 text-success text-active"></i></a> </td>'+
				   	      '</tr>';
				   		       
				   		       
				   		    }
					      }
		       		   	 
		       		   	 
		       		   	 else if(subjTopicListLength>0) {
		 			   		
		       		   	 for (var i = 0; i < subjTopicListLength; i++) {
				   		       var cur = subjTopicList[i];
				   		       
				   		     searchList.innerHTML = searchList.innerHTML  + '<tr>'+
				   	         '<td>'+cur.subject+'</td>'+
				   	         '<td>'+cur.topic+'</td>'+
				   	         '<td>'+cur.teacherName+'</td>'+
				   	         '<td>'+cur.date+'</td>'+
				   	         '<td> <a href="claz_player.html?classId='+cur.eventId+'&teacher='+cur.teacherName+'&subject='+cur.subject+'" class="active" ><i style="font-size:20px;" class="fa fa-play-circle  fa-3 text-success text-active"></i></a> </td>'+
				   	      '</tr>';
				   		       
				   		       
				   		    }
					      }
		       		  
		       		  
		       		  else if(subjectListLength>0) {
	 			   		
		       			 for (var i = 0; i < subjectListLength; i++) {
				   		       var cur = subjectList[i];
				   		       
				   		     searchList.innerHTML = searchList.innerHTML  + '<tr>'+
				   	         '<td>'+cur.subject+'</td>'+
				   	         '<td>'+cur.topicName+'</td>'+
				   	         '<td>'+cur.teacherName+'</td>'+
				   	         '<td>'+cur.date+'</td>'+
				   	         '<td> <a href="claz_player.html?classId='+cur.clazEventDetailId+'&teacher='+cur.teacherName+'&subject='+cur.subject+'" class="active" ><i style="font-size:20px;" class="fa fa-play-circle  fa-3 text-success text-active"></i></a> </td>'+
				   	      '</tr>';
				   		       
				   		       
				   		    }
				      }
		       		
		       		   	 
		       		   	 
		       		   	 
		       		 else if(classListLength>0) {
		 			   		
		       			 for (var i = 0; i < classListLength; i++) {
				   		       var cur = classList[i];
				   		       
				   		     searchList.innerHTML = searchList.innerHTML  + '<tr>'+
				   	         '<td>'+cur.subject+'</td>'+
				   	         '<td>'+cur.topic+'</td>'+
				   	         '<td>'+cur.teacherName+'</td>'+
				   	         '<td>'+cur.date+'</td>'+
				   	         '<td> <a href="claz_player.html?classId='+cur.eventId+'&teacher='+cur.teacherName+'&subject='+cur.subject+'" class="active" ><i style="font-size:20px;" class="fa fa-play-circle  fa-3 text-success text-active"></i></a> </td>'+
				   	      '</tr>';
				   		       
				   		       
				   		    }
				      } 
		       		   	 
		       		   	 
		       		   	 
		       		   	 
		       		   	 
		       		   	 
		       		   	 
		       		   	 
		       		
		       		 else if(dateListLength>0) {
	 			   		
		       			for (var i = 0; i < dateListLength; i++) {
				   		       var cur = dateList[i];
				   		       
				   		     searchList.innerHTML = searchList.innerHTML  + '<tr>'+
				   	         '<td>'+cur.subject+'</td>'+
				   	         '<td>'+cur.topic+'</td>'+
				   	         '<td>'+cur.teacherName+'</td>'+
				   	         '<td>'+cur.date+'</td>'+
				   	         '<td> <a href="claz_player.html?classId='+cur.eventId+'&teacher='+cur.teacherName+'&subject='+cur.subject+'" class="active" ><i style="font-size:20px;" class="fa fa-play-circle  fa-3 text-success text-active"></i></a> </td>'+
				   	      '</tr>';
				   		       
				   		       
				   		    }
				      }
		       		
		       		 else if(dateSubjectListLength>0) {
	 			   		
		       			for (var i = 0; i < dateSubjectListLength; i++) {
				   		       var cur = dateSubjectList[i];
				   		       
				   		     searchList.innerHTML = searchList.innerHTML  + '<tr>'+
				   	         '<td>'+cur.subject+'</td>'+
				   	         '<td>'+cur.topic+'</td>'+
				   	         '<td>'+cur.teacherName+'</td>'+
				   	         '<td>'+cur.date+'</td>'+
				   	         '<td> <a href="claz_player.html?classId='+cur.eventId+'&teacher='+cur.teacherName+'&subject='+cur.subject+'" class="active" ><i style="font-size:20px;" class="fa fa-play-circle  fa-3 text-success text-active"></i></a> </td>'+
				   	      '</tr>';
				   		       
				   		       
				   		    }
				      }
		       		   	 
		       		 else if(topicListLength>0) {
		 			   		
					   	 for (var i = 0; i < topicListLength; i++) {
				   		       var cur = topicList[i];
				   		       
				   		     searchList.innerHTML = searchList.innerHTML  + '<tr>'+
				   	         '<td>'+cur.subject+'</td>'+
				   	         '<td>'+cur.topic+'</td>'+
				   	         '<td>'+cur.teacherName+'</td>'+
				   	         '<td>'+cur.date+'</td>'+
				   	         '<td> <a href="claz_player.html?classId='+cur.eventId+'&teacher='+cur.teacherName+'&subject='+cur.subject+'" class="active" ><i style="font-size:20px;" class="fa fa-play-circle  fa-3 text-success text-active"></i></a> </td>'+
				   	      '</tr>';
				   		       
				   		       
				   		    }
				      }
		       		   	 
		       		 else {
		       			 
		       			 $("#noResult").show();
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




