var teacherInteractedToUi = false;
var teacherRaiseHandQue = [];
var raiseHandQueueArray = [];

function raiseHand(parser_result){
	teacherRaiseHandQue.push(parser_result);
	var parser_result = teacherRaiseHandQue[0].trim();
	if(!teacherInteractedToUi) {
		teacherInteractedToUi = true;
		handleRaiseHand();
	}
}

function handleRaiseHandQue(){
	teacherInteractedToUi = false
	teacherRaiseHandQue.shift()
	if(teacherRaiseHandQue.length > 0) handleRaiseHand()
}

function handleRaiseHandQueOutSide(){
	teacherInteractedToUi = false
	if(teacherRaiseHandQue.length > 0) handleRaiseHand()
}

function handleRaiseHand(){
	
	var parser_result = teacherRaiseHandQue[0];
	console.log(parser_result);

	
	
	    var obj = JSON.parse(parser_result);
	    
	    var raiseHandStudent = obj.response.raiseHandResult.studentName;
	    var raiseHandUserId = obj.response.raiseHandResult.userId;
	    var raiseHandProfilePic = obj.response.raiseHandResult.profilePic;
	    var raiseHandDuration= obj.response.raiseHandResult.duration;
	    var raiseHandText = obj.response.raiseHandResult.raiseHandText;
	
	    raiseHandQueue1(parser_result);
	
	   /* bootbox.prompt({
            title: raiseHandStudent+ " Asked A Question : "+ raiseHandText,
            buttons: {
                confirm: {
                  label: "Answer Now"
                },
                cancel: {
                    label: "Add to Queue"
                  }
              },
            value: "",
            callback: function(result) {
              if (result === null) {
            	  
            	  raiseHandQueue1(parser_result);
              
              } else {
            	  onPrompt(result,parser_result);
              }
            }
          });*/
	
	
    
	/*debugger
	
	WL.SimpleDialog.show("Raise hand Recived From "+raise_studentName, raiseHandText, [{
	    text: 'Answer',
	    handler: raiseHandAccept
	},{
		text: 'Add to Queue',
	    handler: raiseHandQueue1
	}]);*/
}


/*function raiseHandAccept(){
	debugger
	
	WL.Logger.debug("raiseHandAccept");
	
	navigator.notification.prompt(
			raiseHandText,  // message
			onPrompt,                  // callback to invoke
			'CyberClaz',            // title
			['Ok'],             // buttonLabels
			''                 // defaultText
	);
}
*/

function onPrompt(answer,parser_result) {
	
  
	  var obj = JSON.parse(parser_result);
	    
	    var raiseHandStudent = obj.response.raiseHandResult.studentName;
	    var raiseHandUserId = obj.response.raiseHandResult.userId;
	    var raiseHandProfilePic = obj.response.raiseHandResult.profilePic;
	    var raiseHandDuration= obj.response.raiseHandResult.duration;
	    var raiseHandText = obj.response.raiseHandResult.raiseHandText;
	
	
	
	
	$.ajax({
      	url: webServerUrl,
      	data: 'request=RaiseHandAnswerNow&logText='+raiseHandStudent+' Asked A Question&userId='+raiseHandUserId+'&duration='+clazDuration+'&RHflag=RHQueueAnswerzz'+'&raiseHandText='+raiseHandText+'&raiseHandAnswer='+answer,
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
   		 		addLogs.innerHTML = '<article style="margin-right:10px;" id="chat-id-1" class="chat-item left"> <a href="javascript:void(0)" class="pull-left thumb-sm avatar"><img src="'+ raiseHandProfilePic +  '" class="img-circle"></a> <section class="chat-body"> <div class="panel text-sm m-b-none"> <div class="panel-body" style=" padding: 5px;background-color:#5BBFAB;color:#fff; "> <span class="arrow left" style="border-right-color:#5BBFAB"></span><span style="font-size:12px; margin-top:-30px;">'+raiseHandStudent+' Asked A Question</span> </div> </div> <small class="text-muted"><i class="fa fa-check text-success"></i> '+ now +  '</small> </section> </article>' + addLogs.innerHTML;
   		 	
		   
   		 	 var raiseHandDoubts = document.getElementById("raiseHandDoubts");
   	         raiseHandDoubts.innerHTML =   '<article id="' + raiseHandText + '" style="" id="chat-id-1" class="chat-item left"> <a href="javascript:void(0)" class="pull-left thumb-sm avatar"><img src="' + raiseHandProfilePic + '" class="img-circle"></a> <section class="chat-body"> <div class="panel text-sm m-b-none"> <div class="panel-body" style=" padding: 5px;background-color:#5BBFAB;color:#fff; "> <span class="arrow left" style="border-right-color:#5BBFAB;"></span>'+ raiseHandStudent +' : ' + raiseHandText + '<br>You : '+answer+'</div> </div> <small class="text-muted"><i class="fa fa-circle text-success text-xs"></i> </small> &nbsp;Answered </section> </article><br><br>' +  raiseHandDoubts.innerHTML;

			   
			
				 
			}
 	});
	
	
   handleRaiseHandQue();
}

function raiseHandQueue1(parser_result){
		
	    var obj = JSON.parse(parser_result);
	    
	    var raiseHandStudent = obj.response.raiseHandResult.studentName;
	    var raiseHandUserId = obj.response.raiseHandResult.userId;
	    var raiseHandProfilePic = obj.response.raiseHandResult.profilePic;
	    var raiseHandDuration= obj.response.raiseHandResult.duration;
	    var raiseHandText = obj.response.raiseHandResult.raiseHandText;
	
	
	  
	 
	 
	 raiseHandQueueArray.push(parser_result);
	 
 
	 $.ajax({
			url: webServerUrl,
          	data: 'request=raiseHandQueueNotification&raiseDoubt='+raiseHandText+'&raiseUser='+raiseHandUserId,
          	type: 'post',
   			success: function(msg){
   				
   			 var raiseHandDoubts = document.getElementById("raiseHandDoubts");
   	         raiseHandDoubts.innerHTML =   '<div id="'+ raiseHandText +'"><article style="" id="chat-id-1" class="chat-item left" onclick="answerFromQueue('+queueCount+')"> <a href="javascript:void(0)" class="pull-left thumb-sm avatar"><img src="' + raiseHandProfilePic + '" class="img-circle"></a> <section class="chat-body"> <div class="panel text-sm m-b-none"> <div class="panel-body" style=" padding: 5px;background-color:#FF4747;color:#fff; "> <span class="arrow left" style="border-right-color:#FF4747;"></span>'+ raiseHandStudent +' : ' + raiseHandText + '</div> </div> <small class="text-muted"><i class="fa fa-circle text-danger text-xs"></i> </small> &nbsp;Added In Queue </section> </article></div><br>'+raiseHandDoubts.innerHTML ;
			
   			
   	         
   	         
   	         
   	         
   	         
   	         /*	raiseHands.raiseHand.push({ 
			        "from" :raiseHandUserId,
			        "content" :raiseHandText, 
			        "studentName" :raiseHandStudent, 
			        "raisePic" :raiseHandProfilePic, 
			        "index" :queueCount  
					
					});*/
   				
   			//alert(JSON.stringify(raiseHands));
   				
			queueCount++;
 				

   			
			}
		
		});
	 
	 handleRaiseHandQue();	
	

}

function send_raisehand_generalLog(message,raiseHandText,raiseHandAnswer,raise_studentName){
	
	genLogText[genLogCount]=message;
	genLogTime[genLogCount]=timestamp;
	genLogCount++;
	
	message = message.replace(/ /g,'%20');
	raiseHandText = raiseHandText.replace(/ /g,'%20');
	raiseHandAnswer = raiseHandAnswer.replace(/ /g,'%20');
	//alert(raiseHandText);
	var timestamp=time_stamp();
  	timestamp = timestamp.replace(/ /g,'%20');
  	
  	var cur_time = timer_value();
  	var duration=cur_time['hour']+":"+ cur_time['min']+":"+ cur_time['sec'];
  	
    generalLogObj = new generalLog_controller(); 
	generalLogObj.generalLogRequest(message,timestamp,duration,raiseHandText,raiseHandAnswer,raise_studentName,"0");
	
}

function showtt(ab)
{
	
	var id = ab;
	var whid="#show"+id;
	var ansid="#answer"+id; 
	var txtcon=$(whid).html();
	var raiseQstn = txtcon.replace(/%20/g, " ");
	var txtans=$(ansid).html();
	var raiseAns = txtans.replace(/%20/g, " ");
	teacherInteractedToUi = true

	WL.SimpleDialog.show("CyberClaz", "Question:"+raiseQstn+"  Answer:"+raiseAns, [{
	    text: 'Ok',
	    handler: clickedshowtt
	}]);
	
}



function clickedshowtt(){
	handleRaiseHandQueOutSide()
}