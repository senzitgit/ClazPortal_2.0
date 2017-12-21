var userId = sessionStorage.getItem("loguser");
var secz = 0; 
var minsz = 0;  
var hourz = 0; 

show();

var clazDuration = "";
var switchViewFlag = 0;
var attentionModeFlag=0;
var attachmentListFlag=1;




/*Raise Hand*/





var QraiseHandStudent = "";
var QraiseHandUserId = "";
var QraiseHandProfilePic = "";
var QraiseHandDuration= "";
var QraiseHandText = "";
var Qindex= "";



var queueCount = 0;

var raiseHands = {"raiseHand": [   
	                           	
	      						
	                           
  	                        ]                                  

  	          } ;




function answerFromQueue(index){
	
	
	
	   var valueAtIndex = raiseHandQueueArray[index];
	    
	   
	 //  alert(valueAtIndex);

	    var obj = JSON.parse(valueAtIndex);	
	
	    
	  //  alert(JSON.stringify(obj));
		
		var QraiseHandStudent = obj.response.raiseHandResult.studentName;
		var QraiseHandUserId = obj.response.raiseHandResult.userId;
		var QraiseHandProfilePic = obj.response.raiseHandResult.profilePic;
		var QraiseHandText = obj.response.raiseHandResult.raiseHandText;
		
	
		
		//alert(QraiseHandText);
		 
	    bootbox.prompt({
            title: QraiseHandStudent+ " Asked A Question : "+ QraiseHandText,
            buttons: {
                confirm: {
                  label: "Answer"
                },
                cancel: {
                    label: "Cancel"
                  }
              },
            value: "",
            callback: function(result) {
              if (result == null) {
            	  
            	  document.getElementById('raiseButton').style['-webkit-animation'] = '';
    
              
              } else {
            	  document.getElementById('raiseButton').style['-webkit-animation'] = '';
            	  answerFromQueueNow(valueAtIndex,index,result);
              }
            }
          });
		
		
		
		
		
		
		
	
		/*	var studentPanel1 = document.getElementById("studentPanel1");
			var doubtPanel1 = document.getElementById("doubtPanel1");
			
			
			studentPanel1.innerHTML ='<center><img src="'+ cur.raisePic +'" class="img-circle" height="50px;"><br><b><font color="#5BBFAB">'+cur.studentName+'</b><br><br><br><br></font>';
			doubtPanel1.innerHTML ='<font color="#000"><b>'+ cur.content +'</b></font>';
		

			  $("#replyModal").modal('show'); 
		 
		 */
	
	
}
















logs = {"classNotes": [   
                         	
    						
                       
	                        ]                                  

	          } ; 








function shareAttachment (attachmentListFlag){
	
	var liveAttachmentsJson = JSON.stringify(liveAttachments) ;
	

	
	  obj = JSON.parse(liveAttachmentsJson);
		
	 var arrayLength  = liveAttachments.liveClassAttachment.length;	
	
	var filename = '';
	var filelink = '';
	var filetype = '';

	
	 for (var i = 0; i < arrayLength; i++) {
	        var cur = obj.liveClassAttachment[i];
	        if (cur.index == attachmentListFlag) {
	        
	        	filename = cur.name;
	        	filelink = cur.link;
	        	filetype = cur.type;
	        	
	        	
	        	
	        	
	        
	        }
	    }
	 
	 
	 
	    $.ajax({
          	url: webServerUrl,
          	data: 'request=shareAttachment&name='+ filename+'&link='+filelink+'&duration='+clazDuration+'&type='+filetype,
          	type: 'post',
   			success: function(msg){
   				
   			 var loginJson = msg.trim();
			obj = JSON.parse(loginJson);
 	   		 var resultCode  = obj.response.resultcode;
 	   		 var message  = obj.response.message;
 	   		 
 	   		 
 	   		if(resultCode== 1){
 	   			
 	   			
 	   		$.ajax({
		          	url: webServerUrl,
		          	data: 'request=generalLog&logText='+filename+' file shared&userId='+userId+'&duration='+clazDuration+'&RHflag=0',
		          	type: 'post',
		   			success: function(msg){
		   				
		   				
		   				
		   				
		   				    var date = new Date(); 	
	   						currentDate = date.getDate();     // Get current date
	    				 	 month       = date.getMonth() + 1; // current month
	    				 	hour = date.getHours();
	    				    min  = date.getMinutes();
	    				    sec  = date.getSeconds(); 
	    				    year        = date.getFullYear();
	    				    
	    				   var now = "  "+currentDate + "/" + month + "/" + year +"  "+ hour + ":" + min + ":" + sec; 
	    				
		   				
		   				
		   			    var addLogs = document.getElementById('addLogs');
		   		 		addLogs.innerHTML = '<article style="margin-right:10px;" id="chat-id-1" class="chat-item left"> <a href="javascript:void(0)" class="pull-left thumb-sm avatar"><img src="'+ userPic +  '" class="img-circle"></a> <section class="chat-body"> <div class="panel text-sm m-b-none"> <div class="panel-body" style=" padding: 5px;background-color:#5BBFAB;color:#fff; "> <span class="arrow left" style="border-right-color:#5BBFAB"></span><span style="font-size:12px; margin-top:-30px;">'+ filename +  ' File Has Shared</span> </div> </div> <small class="text-muted"><i class="fa fa-check text-success"></i> '+ now +  '</small> </section> </article>' + addLogs.innerHTML;
		   		 	
		   				
		   				
		   				  document.getElementById("logArea").style.display="block";
				   		  document.getElementById("attachmentArea").style.display="none"; 
				   		  document.getElementById("raiseArea").style.display="none"; 
				   		  document.getElementById("noteArea").style.display="none"; 
		   			}
 	   			
 	    	});
 	   			
 	   			
   			}
   				
   				
   				
   			
   			
			}
		
		});
	 
	 
	 

	
	
}


function openPopup(attachmentListFlag) {
	

	var liveAttachmentsJson = JSON.stringify(liveAttachments) ;
	

	
	  obj = JSON.parse(liveAttachmentsJson);
		
	 var arrayLength  = liveAttachments.liveClassAttachment.length;	
	
	var filename = '';
	var filelink = '';
	var filetype = '';

	
	 for (var i = 0; i < arrayLength; i++) {
	        var cur = obj.liveClassAttachment[i];
	        if (cur.index == attachmentListFlag) {
	        
	        	filename = cur.name;
	        	filelink = cur.link;
	        	filetype = cur.type;
	        	
	        	
	        	
	        	
	        
	        }
	    }
		
		if(filetype=='pdf') {
			$.fancybox({
				type: 'html',
				autoSize: false,
				content: '<embed src="'+filelink+'#nameddest=self&page=1&view=FitH,0&zoom=80,0,0" type="application/pdf" height="99%" width="100%" />',
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
		
		else {
			
			
			$.fancybox([
			        	{href:filelink, title: filename}
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

var liveAttachments = {"liveClassAttachment": [   
              		                           	
                                               
              	    	                        ]                                  

              	    	          } ;



var userPic =  sessionStorage.getItem("proPic");
var notzPic = document.getElementById("notzPic");
notzPic.innerHTML = '<img src="'+userPic+'" class="img-circle">';

function formatDate(date) {
	  var hours = date.getHours();
	  var minutes = date.getMinutes();
	  var seconds = date.getSeconds();
	  var ampm = hours >= 12 ? 'pm' : 'am';
	  hours = hours % 12;
	  hours = hours ? hours : 12; // the hour '0' should be '12'
	  minutes = minutes < 10 ? '0'+minutes : minutes;
	  seconds = seconds < 10 ? '0'+seconds : seconds;
	  var strTime = hours + ':' + minutes +':' + seconds;
	  return date.getDate() + "/" + date.getMonth()+1 + "/" + date.getFullYear() + "  " + strTime;
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



function parseResult(result) {

    var obj = JSON.parse(result);
    var origin = obj.origin;
    
    if (origin == "raiseHand") {
    	
    	    raiseHand(result);
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	
  /*  raiseHandStudent = obj.response.raiseHandResult.studentName;
    raiseHandUserId = obj.response.raiseHandResult.userId;
    raiseHandProfilePic = obj.response.raiseHandResult.profilePic;
    raiseHandDuration= obj.response.raiseHandResult.duration;
    raiseHandText = obj.response.raiseHandResult.raiseHandText;
    	

	var studentPanel = document.getElementById("studentPanel");
	var doubtPanel = document.getElementById("doubtPanel");
	
	
	studentPanel.innerHTML ='<center><img src="'+ raiseHandProfilePic +'" class="img-circle" height="50px;"><br><b><font color="#5BBFAB">'+raiseHandStudent+'</b><br><br><br><br></font>';
	doubtPanel.innerHTML ='<font color="#000"><b>'+ raiseHandText +'</b></font>';
	
	
	$("#liveModal").modal('show');*/
    	
    	
    	
    	
    	
    	
    	
    	
    	
    }
    
    
}









start_websocket();



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

clazDuration = duration;


SD=window.setTimeout("stopwatch();", 1000);   
			}  
			}  




$(document).ready(function() {

	
	
	$(window).on('beforeunload', function(){
		websocket.close();
	});
	
	
	
	
	
	
	
	$("#clazNoteButtonMob").click(function(){
		  
		  
		  document.getElementById("logArea").style.display="none";
		  document.getElementById("attachmentArea").style.display="none"; 
		  document.getElementById("raiseArea").style.display="none"; 
		  document.getElementById("noteArea").style.display="block"; 
	 
	  

	  });
		
		
		$("#logButtonMob").click(function(){
			  
			 document.getElementById('logButton').style['-webkit-animation'] = '';
			 document.getElementById("logArea").style.display="block";
			  document.getElementById("attachmentArea").style.display="none"; 
			  document.getElementById("raiseArea").style.display="none"; 
			  document.getElementById("noteArea").style.display="none"; 

		  

		  });
		
		
		
		
	   $("#raiseButtonMob").click(function(){
		   
			 document.getElementById('raiseButton').style['-webkit-animation'] = '';
			 
			  document.getElementById("logArea").style.display="none";
			  document.getElementById("attachmentArea").style.display="none"; 
			  document.getElementById("raiseArea").style.display="block"; 
			  document.getElementById("noteArea").style.display="none"; 
		 

		  

		  });
	   
	   
	   $("#attachmentButtonMob").click(function(){
			 document.getElementById('attachmentButton').style['-webkit-animation'] = '';

			  
			 document.getElementById("logArea").style.display="none";
			  document.getElementById("attachmentArea").style.display="block"; 
			  document.getElementById("raiseArea").style.display="none"; 
			  document.getElementById("noteArea").style.display="none"; 
		 

		  });
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	$("#clazNoteButton").click(function(){
	  
	  
	  document.getElementById("logArea").style.display="none";
	  document.getElementById("attachmentArea").style.display="none"; 
	  document.getElementById("raiseArea").style.display="none"; 
	  document.getElementById("noteArea").style.display="block"; 
 
  

  });
	
	
	$("#logButton").click(function(){
		  
		 document.getElementById('logButton').style['-webkit-animation'] = '';
		 document.getElementById("logArea").style.display="block";
		  document.getElementById("attachmentArea").style.display="none"; 
		  document.getElementById("raiseArea").style.display="none"; 
		  document.getElementById("noteArea").style.display="none"; 

	  

	  });
	
	
	
	
   $("#raiseButton").click(function(){
	   
		 document.getElementById('raiseButton').style['-webkit-animation'] = '';
		 
		  document.getElementById("logArea").style.display="none";
		  document.getElementById("attachmentArea").style.display="none"; 
		  document.getElementById("raiseArea").style.display="block"; 
		  document.getElementById("noteArea").style.display="none"; 
	 

	  

	  });
   
   
   $("#attachmentButton").click(function(){
		 document.getElementById('attachmentButton').style['-webkit-animation'] = '';

		  
		 document.getElementById("logArea").style.display="none";
		  document.getElementById("attachmentArea").style.display="block"; 
		  document.getElementById("raiseArea").style.display="none"; 
		  document.getElementById("noteArea").style.display="none"; 
	 

	  });
   
   
   
	$("#answernowButton").click(function(){
		  
		
		 document.getElementById("answerBox").style.display="block";
		 document.getElementById("bothFooter").style.display="none";
		 document.getElementById("singleFooter").style.display="block";
		 

	  });
	
	
	

		 
	
		 

	
	
	
	
	
	
	
	
   
   
   
   
	$("#notzButton").click(function(){

		   var formInput = document.getElementById('notes').value;
			
			var d = new Date();
		    var e = formatDate(d);
		     
		    var div = document.getElementById('classNotes');
			div.innerHTML = ' <article id="chat-id-1" class="chat-item right"> <a href="javascript:void(0)" class="pull-right thumb-sm avatar"><img src="'+ userPic +'" class="img-circle"></a> <section class="chat-body" > <div class="panel bg bg-success text-sm m-b-none"> <div class="panel-body"> <span class="arrow right"></span>'+ formInput +'</div> </div> <small class="text-muted"><i class="fa fa-check text-success"></i>'+ e +'</small> </section> </article>'+ div.innerHTML;
			logs.classNotes.push({ 
			        "time" :e,
			        "notes" :formInput  
					
					});
							
		   document.getElementById('notes').value='';
		   sessionStorage.setItem("clazNotes",JSON.stringify(logs));
		   
		  // alert(JSON.stringify(logs));

	

	});
	

	
	
	$("#stopButton").click(function(){
		  
		 document.getElementById("infoBar").style.display="none";
		document.getElementById("confirmBar").style.display="block";
			

	});

	$("#exitNo").click(function(){
	  
	     document.getElementById("infoBar").style.display="block";
		 document.getElementById("confirmBar").style.display="none";

	});
	
	
	
	
	
	$("#exitYes").click(function(){
		  
		
		
		$.ajax({
          	url: webServerUrl,
          	data: 'request=generalLog&logText=Recording Stopped&userId='+userId+'&duration='+clazDuration+'&RHflag=0',
          	type: 'post',
   			success: function(msg){
   				
   			 var loginJson = msg.trim();
				 obj = JSON.parse(loginJson);
 	   		 var resultCode  = obj.response.resultcode;
 	   		 var message  = obj.response.message;
 	   		 
 	   		 
 	   		if(resultCode== 1)
				{
   				
 	   			
 	   		 var date = new Date(); 	
				currentDate = date.getDate();     // Get current date
		 	 month       = date.getMonth() + 1; // current month
		 	hour = date.getHours();
		    min  = date.getMinutes();
		    sec  = date.getSeconds(); 
		    year        = date.getFullYear();
		    
		   var now = "  "+currentDate + "/" + month + "/" + year +"  "+ hour + ":" + min + ":" + sec; 
		
		
		
	    var addLogs = document.getElementById('addLogs');
 		addLogs.innerHTML = '<article style="margin-right:10px;" id="chat-id-1" class="chat-item left"> <a href="javascript:void(0)" class="pull-left thumb-sm avatar"><img src="'+ userPic +  '" class="img-circle"></a> <section class="chat-body"> <div class="panel text-sm m-b-none"> <div class="panel-body" style=" padding: 5px;background-color:#5BBFAB;color:#fff; "> <span class="arrow left" style="border-right-color:#5BBFAB"></span><span style="font-size:12px; margin-top:-30px;">Recording Stopped</span> </div> </div> <small class="text-muted"><i class="fa fa-check text-success"></i> '+ now +  '</small> </section> </article>' + addLogs.innerHTML;
 	
		
		
		  document.getElementById("logArea").style.display="block";
		  document.getElementById("attachmentArea").style.display="none"; 
		  document.getElementById("raiseArea").style.display="none"; 
		  document.getElementById("noteArea").style.display="none"; 
	
		
 	   			
 
 	   			
 	   			
   				
 	   		$.ajax({
 				url: webServerUrl,
 		     	data: 'request=stopRecord&duration='+clazDuration+'&reminderNotes='+JSON.stringify(logs)+'&raiseHands='+JSON.stringify(raiseHands),
 		     	type: 'post',
 					success: function(msg){
 						 
 						var liveVid1 = document.getElementById("liveVid1");
 						liveVid1.innerHTML ='<img src="images/poster0.jpg" height="220px;">';
 						
 						
 						var liveVid2 = document.getElementById("liveVid2");
 						liveVid2.innerHTML ='<img src="images/poster.jpg" height="420px;">';
 						
 						
 						$('#stopModal').modal('show');	
 		
 	}

 	});
   				
   				
   				
   				
   				
   				   
				
				
				}
				
				
				
				
				}
		
		
		
		
		

		
		
		
		
		

		
		
		
		
		
		
			
 	});
		
		
		
		
		
		
		
		
		
		
		
	
	
   
		  });
	
	
	
	
	
	
	
	
	$("#attentionButton").click(function(){
		  
		
		
		if(attentionModeFlag==0){
			attentionModeFlag = 1;
		}else {
			attentionModeFlag = 0;
		}
	

		if(attentionModeFlag==0){
			document.getElementById("attentiontxt").style.color = "";
			document.getElementById("attentionfa").style.color = "";
			document.getElementById("attentiontxt").style.fontWeight = "";
			document.getElementById("attentionfa").style.fontWeight = "";
		}else {
			document.getElementById("attentiontxt").style.color = "#CC0000";
			document.getElementById("attentionfa").style.color = "#CC0000";
			document.getElementById("attentiontxt").style.fontWeight = "900";
			document.getElementById("attentionfa").style.fontWeight = "900";
		}
	
		
		
		
		
		
		
		  
		var schedule_id = sessionStorage.getItem("curscheduleId");
		

	    $.ajax({
          	url: webServerUrl,
          	data: 'request=attentionMode&curscheduleId='+ schedule_id+'&attentionModeFlag='+attentionModeFlag,
          	type: 'post',
   			success: function(msg){
   			
   			
			}
		
		});
	    

	  });
	
	
	
	


				
				
				
				var  startRecordResult =  sessionStorage.getItem("startRecordResult");
				var  cursubject =     sessionStorage.getItem("cursubject");
				var  topicName =     sessionStorage.getItem("topicName");
				var  chapterName =    sessionStorage.getItem("chapterName");
				var  classEventId =     sessionStorage.getItem("classEventId");
				
				
				var Chapter = document.getElementById("Chapter");
				Chapter.innerHTML = cursubject;

				var Topic = document.getElementById("Topic");
				Topic.innerHTML = topicName;

				var Teacher = document.getElementById("Teacher");
				Teacher.innerHTML = chapterName;
				
				
				var startRecordResultObj = JSON.parse(startRecordResult);
      	        console.log(startRecordResult);
	        	   
                attachmentList = startRecordResultObj.response.startRecordResult.attachmentList;
                attachmentListLength = startRecordResultObj.response.startRecordResult.attachmentList.length;
                
                
                
                
                
                if(attachmentListLength>0){
                
                
                	for (var i = 0; i < attachmentListLength; i++) {
			   		       var cur = attachmentList[i];
			   		    
			   		    liveAttachments.liveClassAttachment.push({
		    	            "link": cur.attachmentLink,
		    	            "name": cur.attachmentName,
		    	            "type": cur.documentType,
		    	            "index": attachmentListFlag

		    	        });
                	
			   		    
			   		    
			   		    
			   		  var addAttach = document.getElementById('addAttach');

				      addAttach.innerHTML = '<article id="chat-id-1" class="chat-item right"> <a href="javascript:void(0)" class="pull-right thumb-sm avatar"><img src="' + userPic + '" class="img-circle"></a> <section class="chat-body" > <div class="panel bg bg-success text-sm m-b-none"  style="background-color:#5BBFAB"> <div class="panel-body" style="padding-left: 15px;padding-right: 15px;padding-top: 8px;padding-bottom:2px;"> <span class="arrow right" style="border-left-color:#5BBFAB"></span>' + cur.attachmentName + '<a href="javascript:void(0)" onclick="openPopup(' + attachmentListFlag + ')"><div class="fa fa-eye" Style="font-size:15px;float:right;color:#fff"></div> </a>    <a href="javascript:void(0)" onclick="shareAttachment(' + attachmentListFlag + ')"><div class="fa fa-share-square-o" Style="font-size:15px;float:right;margin-right:20px;color:#fff"></div></a></div>  </div> <small class="text-muted"><i class="fa fa-paperclip"></i>&nbsp;&nbsp;Type : ' + cur.documentType + '</small> </section> </article>' + addAttach.innerHTML;
				
			   		    
			   		    
			   		    
			   		    
			   		    
			   		    
			   		    attachmentListFlag++;
                	}
                	
                	
                	$.ajax({
    		          	url: webServerUrl,
    		          	data: 'request=generalLog&logText=Recording Started&userId='+userId+'&duration=00:00:00&RHflag=0',
    		          	type: 'post',
    		   			success: function(msg){
    		   				
    		   				
    		   				
    		   				
    		   				    var date = new Date(); 	
    	   						currentDate = date.getDate();     // Get current date
    	    				 	 month       = date.getMonth() + 1; // current month
    	    				 	hour = date.getHours();
    	    				    min  = date.getMinutes();
    	    				    sec  = date.getSeconds(); 
    	    				    year        = date.getFullYear();
    	    				    
    	    				   var now = "  "+currentDate + "/" + month + "/" + year +"  "+ hour + ":" + min + ":" + sec; 
    	    				
    		   				
    		   				
    		   			    var addLogs = document.getElementById('addLogs');
    		   		 		addLogs.innerHTML = '<article style="margin-right:10px;" id="chat-id-1" class="chat-item left"> <a href="javascript:void(0)" class="pull-left thumb-sm avatar"><img src="'+ userPic +  '" class="img-circle"></a> <section class="chat-body"> <div class="panel text-sm m-b-none"> <div class="panel-body" style=" padding: 5px;background-color:#5BBFAB;color:#fff; "> <span class="arrow left" style="border-right-color:#5BBFAB"></span><span style="font-size:12px; margin-top:-30px;">Recording Started</span> </div> </div> <small class="text-muted"><i class="fa fa-check text-success"></i> '+ now +  '</small> </section> </article>' + addLogs.innerHTML;
    		   		 	
    		   				
    		   				
    		   				  document.getElementById("logArea").style.display="block";
    				   		  document.getElementById("attachmentArea").style.display="none"; 
    				   		  document.getElementById("raiseArea").style.display="none"; 
    				   		  document.getElementById("noteArea").style.display="none"; 
    		   			}
     	   			
     	    	});
                	
                
                
                
                } 
                
                
                var video1 = startRecordResultObj.response.startRecordResult.liveCamDetails.CAM2.Url;
                var video2 = startRecordResultObj.response.startRecordResult.liveCamDetails.CAM1.Url;
                var video3 = startRecordResultObj.response.startRecordResult.liveCamDetails.CAM3.Url;
                var video4 = startRecordResultObj.response.startRecordResult.liveCamDetails.CAM4.Url;

                var audio1 = startRecordResultObj.response.startRecordResult.liveCamDetails.CAM1.Aud;
                var audio2 = startRecordResultObj.response.startRecordResult.liveCamDetails.CAM2.Aud;
                var audio3 = startRecordResultObj.response.startRecordResult.liveCamDetails.CAM3.Aud;
                var audio4 = startRecordResultObj.response.startRecordResult.liveCamDetails.CAM4.Aud;
                
           
                          
                
               sessionStorage.setItem("vidFeed1",video1);
               sessionStorage.setItem("vidFeed2",video2);
               sessionStorage.setItem("vidFeed3",video3);
               sessionStorage.setItem("vidFeed4",video4);
                
               sessionStorage.setItem("audFeed1",audio1);
               sessionStorage.setItem("audFeed2",audio2);
               
               
               
               
               
               
               
               
            var playerInstance1 = jwplayer("liveVid1");
           	playerInstance1.setup({
           	 autostart: true,
           	file: video1,
            width: "100%",
                logo: {
                    file: "images/logo_jw.png"
                },
                repeat:'always',
                'stretching': 'exactfit'
           	});
               
               
               
               
           	var playerInstance2 = jwplayer("liveVid2");
           	playerInstance2.setup({
           	 autostart: true,
           	file: video2,
            width: "100%",
                logo: {
                    file: "images/logo_jw.png"
                },
                repeat:'always',
                'stretching': 'exactfit'
           	});
               
           	
              jwplayer("liveAud1").setup({
                   autostart: true,
                   file: audio1,

                   rtmp: {
                       bufferlength: 0
                   },


                   height: "0",
                   width: "0",
                   primary: "flash",
                   'stretching': 'exactfit',
                   logo: {
                       file: "images/logo_jw.png"
                   },
					mute:"false"

               });
               
               
               
               
               jwplayer("liveAud2").setup({
                   autostart: true,
                   file: audio2,

                   rtmp: {
                       bufferlength: 0
                   },


                   height: "0",
                   width: "0",
                   primary: "flash",
                   'stretching': 'exactfit',
                   logo: {
                       file: "images/logo_jw.png"
                   },
					mute:"false"


               });
               
               
               
               

               
               
               
           	$("#switchButton").click(function(){
        		
        		
        		if(switchViewFlag==0){
        			switchViewFlag = 1;
        		}else {
        			switchViewFlag = 0;
        		}
        	

        		if(switchViewFlag==0){
        			document.getElementById("switchtxt").style.color = "";
        			document.getElementById("switchfa").style.color = "";
        			document.getElementById("switchtxt").style.fontWeight = "";
        			document.getElementById("switchfa").style.fontWeight = "";
        		

        		    
                   	var playerInstance = jwplayer("liveVid2");
                   	playerInstance.setup({
                   	 autostart: true,
                   	file: video2, 
                   	width: "100%",
                        logo: {
                            file: "images/logo_jw.png"
                        },
                        repeat:'always',
                        'stretching': 'exactfit'
                   	});
                   	
                   	
                   	
                    
        			}else {
        			document.getElementById("switchtxt").style.color = "green";
        			document.getElementById("switchfa").style.color = "green";
        			document.getElementById("switchtxt").style.fontWeight = "900";
        			document.getElementById("switchfa").style.fontWeight = "900";
        			 

        		    
                   	var playerInstance = jwplayer("liveVid2");
                   	playerInstance.setup({
                   	 autostart: true,
                   	file: video4,
                    width: "100%",
                        logo: {
                            file: "images/logo_jw.png"
                        },
                        repeat:'always',
                        'stretching': 'exactfit'
                   	});
        								
        		}
        	


        	
        	
        	$.ajax({
              	url: webServerUrl,
              	data: 'request=switchVideo&switchViewFlag='+switchViewFlag,
              	type: 'post',
        			success: function(msg){
        			
        			
        		}
        	
        	});
            

          });
               
               
       
           
});






function uploadFeed() {
	   
    $(location).attr('href','teacher_dashboard.html');
   
}    



function answerFromQueueNow(valueAtIndex,index,answer){
	  
	      var obj = JSON.parse(valueAtIndex);	
		
		    
		  //  alert(JSON.stringify(obj));
			
			var QraiseHandStudent = obj.response.raiseHandResult.studentName;
			var QraiseHandUserId = obj.response.raiseHandResult.userId;
			var QraiseHandProfilePic = obj.response.raiseHandResult.profilePic;
			var QraiseHandText = obj.response.raiseHandResult.raiseHandText;
			
	    

	   
	
		$.ajax({
         	url: webServerUrl,
         	data: 'request=RaiseHandAnswerNow&logText='+QraiseHandStudent+' Asked A Question&userId='+QraiseHandUserId+'&duration='+clazDuration+'&RHflag=RHQueueAnswer'+'&raiseHandText='+QraiseHandText+'&raiseHandAnswer='+answer,
         	type: 'post',
  			success: function(msg){
  				
  				
  				
  				
  				    var date = new Date(); 	
					currentDate = date.getDate();     // Get current date
				 	month       = date.getMonth() + 1; // current month
				 	hour = date.getHours();
				    min  = date.getMinutes();
				    sec  = date.getSeconds(); 
				    year        = date.getFullYear();
				    
				   var now = "  "+currentDate + "/" + month + "/" + year +"  "+ hour + ":" + min + ":" + sec; 
				   

				
				   
				 var addLogs = document.getElementById('addLogs');
	   		     addLogs.innerHTML = '<article style="margin-right:10px;" id="chat-id-1" class="chat-item left"> <a href="javascript:void(0)" class="pull-left thumb-sm avatar"><img src="'+ QraiseHandProfilePic +  '" class="img-circle"></a> <section class="chat-body"> <div class="panel text-sm m-b-none"> <div class="panel-body" style=" padding: 5px;background-color:#5BBFAB;color:#fff; "> <span class="arrow left" style="border-right-color:#5BBFAB"></span><span style="font-size:12px; margin-top:-30px;">'+QraiseHandStudent+' Asked A Question</span> </div> </div> <small class="text-muted"><i class="fa fa-check text-success"></i> '+ now +  '</small> </section> </article>' + addLogs.innerHTML;
	   		 	
				 	
	   		 	  
	   		 	 var raiseHandDoubts = document.getElementById(QraiseHandText);
	   	         raiseHandDoubts.innerHTML =   '<article id="" style="" id="chat-id-1" class="chat-item left"> <a href="javascript:void(0)" class="pull-left thumb-sm avatar"><img src="' + QraiseHandProfilePic + '" class="img-circle"></a> <section class="chat-body"> <div class="panel text-sm m-b-none"> <div class="panel-body" style=" padding: 5px;background-color:#5BBFAB;color:#fff; "> <span class="arrow left" style="border-right-color:#5BBFAB;"></span>'+ QraiseHandStudent +' : ' + QraiseHandText + '<br>You : '+answer+'</div> </div> <small class="text-muted"><i class="fa fa-circle text-success text-xs"></i> </small> &nbsp;Answered </section> </article>';

				   
				   
				
  				 
  			}
	 	});
	 	
	 	  
	 	
				
				
				
		
				
				
	 	
	 		
}

function save()
{
	
	
	
	var customAttachName = document.getElementById('customAttachName').value;
	var customAttachNameLength = customAttachName.length;
	
	if(customAttachNameLength>0){
	
	$("#test").data("jqScribble").save(function(imageData)
	{    
		var schedule_id = sessionStorage.getItem("curscheduleId");
		var  classEventId =     sessionStorage.getItem("classEventId");

		$.ajax({
         	url: webServerUrl,
         	data: 'request=uploadImageFromPortal&imageData='+imageData+'&userId='+userId+'&duration='+clazDuration+'&classEventId='+classEventId+'&schedule_id='+schedule_id+'&imageName='+customAttachName,
         	type: 'post',
  			success: function(msg){
  				
  		
  				document.getElementById("customAttachName").value = "";
  				document.getElementById("customAttachName").placeholder = "Enter Image Name";
  				
  				
  				
  				
  				
  	   			 var loginJson = msg.trim();
  				obj = JSON.parse(loginJson);
  	 	   		 var resultCode  = obj.response.resultcode;
  	 	   		 var message  = obj.response.message;
  	 	   		 
  	 	   		 
  	 	   		if(resultCode== 1){
  	 	   			
  	 	   			
  	 	   		$.ajax({
  			          	url: webServerUrl,
  			          	data: 'request=generalLog&logText='+customAttachName+' file shared&userId='+userId+'&duration='+clazDuration+'&RHflag=0',
  			          	type: 'post',
  			   			success: function(msg){
  			   				
  			   				
  			   				
  			   				
  			   				    var date = new Date(); 	
  		   						currentDate = date.getDate();     // Get current date
  		    				 	 month       = date.getMonth() + 1; // current month
  		    				 	hour = date.getHours();
  		    				    min  = date.getMinutes();
  		    				    sec  = date.getSeconds(); 
  		    				    year        = date.getFullYear();
  		    				    
  		    				   var now = "  "+currentDate + "/" + month + "/" + year +"  "+ hour + ":" + min + ":" + sec; 
  		    				
  			   				
  			   				
  			   			    var addLogs = document.getElementById('addLogs');
  			   		 		addLogs.innerHTML = '<article style="margin-right:10px;" id="chat-id-1" class="chat-item left"> <a href="javascript:void(0)" class="pull-left thumb-sm avatar"><img src="'+ userPic +  '" class="img-circle"></a> <section class="chat-body"> <div class="panel text-sm m-b-none"> <div class="panel-body" style=" padding: 5px;background-color:#5BBFAB;color:#fff; "> <span class="arrow left" style="border-right-color:#5BBFAB"></span><span style="font-size:12px; margin-top:-30px;">'+ customAttachName +  ' file shared</span> </div> </div> <small class="text-muted"><i class="fa fa-check text-success"></i> '+ now +  '</small> </section> </article>' + addLogs.innerHTML;
  			   		 	
  			   				
  			   				
  			   				  document.getElementById("logArea").style.display="block";
  					   		  document.getElementById("attachmentArea").style.display="none"; 
  					   		  document.getElementById("raiseArea").style.display="none"; 
  					   		  document.getElementById("noteArea").style.display="none"; 
  			   			}
  	 	   			
  	 	    	});
  	 	   			
  	 	   			
  	   			}
  	   				
  				
  				
  				
  				
  				
  				
  				
  				
  				
  				
  				
  				
  				
  				
				
  				 
  			}
	 	});
	 	
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	});
	
	$("#test").data("jqScribble").clear();
	$('#myModal').modal('hide');
	
	
		}else {
			document.getElementById("customAttachName").placeholder = "Image Name Cannot Be Empty..";
		}
}
  
