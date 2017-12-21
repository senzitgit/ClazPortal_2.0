attachmentListFlag=0;


document.getElementById("picturePanelNav").innerHTML ='<img src="'+sessionStorage.getItem("proPic")+'">';

document.getElementById("namePanelNav").innerHTML ='<b>'+sessionStorage.getItem("firstName")+'</b>';



$(function () {
    $('#toGDiv').click(function () {
        $('#box-body').slideToggle();
      
    });
    
  
    
});


$(function () {
    $('#toGDivButton').click(function () {
        $('#box-body').slideToggle();
      
    });
    
  
    
});














	
	listAttachments = {"listUserAttachments": [   
	             		                           	
	                                                 
	             	    	                        ]                                  

	             	    	          } ;
	             	  	


	
	
	
	function deleteAttachment(attachmentId) {
		
		
		
		BootstrapDialog.show({
            title: '<i class="fa fa-trash-o"></i>&nbsp;&nbsp;Delete File',
            message: 'Are you sure want to delete this file??</b>',
            buttons: [{
                label: 'NO',
                action: function(dialog) {
                   dialog.close();
                }
            }, {
                label: 'YES',
                action: function(dialog) {
                   
                	$.ajax({
       				 url: webServerUrl,
       		         data: 'request=attachmentDeletion&attachmentId='+ attachmentId,
       				  	type: 'post',
       						success: function(msg){
       							
       							var loginJson = msg.trim();
       							 obj = JSON.parse(loginJson);
       				   		 var resultCode  = obj.response.resultcode;
       				   		 var message  = obj.response.message;
       				   		 
       				   		 
       				   		if(resultCode== 1)
       						{
       							callportalAttachment();
       							
       						}else{
       							alert("Unable to delete file");
       						}
       				   		
       				   		
       						}
       				
       				});
				  
				   dialog.close();  
				  
				  
				  
				  
                }
            }]
        });
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	}
	
	
	
	
	
	
	function previewAttachment(attachmentId) {
		

		  var arrayLength  = listAttachments.listUserAttachments.length;
		
		  
		  for (var i = 0; i < arrayLength; i++) {
		        var cur = listAttachments.listUserAttachments[i];
		        
		       if (cur.attachmentId == attachmentId) {
		    	  previewModal(cur.attachmentType,cur.attachmentLink)
		        }
		  }
		
	}
	
	
	
	function previewModal(attachmentType,attachmentLink){
		
		   
   	    
	   	  if(attachmentType=='pdf'){
	   	    
	   		$.fancybox({
	   			type: 'html',
	   			autoSize: false,
	   			content: '<embed src="'+attachmentLink+'#nameddest=self&page=1&view=FitH,0&zoom=80,0,0" type="application/pdf" height="99%" width="100%" />',
	   			beforeClose: function() {
	   			$(".fancybox-inner").unwrap();
	   			},
	   						helpers: {
	   							overlay: {
	   							opacity: 0.3
	   							} // overlay
	   						}
	   			}); //fancybox
	   	    
	   	  }
	   	  else if(attachmentType=='doc'||attachmentType=='docx'||attachmentType=='ppt'||attachmentType=='pptx'||attachmentType=='txt'){
	   		  
	   		  
	   		$.fancybox({
	   			type: 'iframe',
	   			autoSize: false,
	   			content: '<iframe src="http://docs.google.com/gview?url=http://192.168.10.50:8080/ATTACHMENT/java.pdf&embedded=true&embedded=true" style="width:100%; height:99%;" frameborder="0"></iframe>',
	   			beforeClose: function() {
	   			$(".fancybox-inner").unwrap();
	   			},
	   						helpers: {
	   							overlay: {
	   							opacity: 0.3
	   							} // overlay
	   						}
	   			}); //fancybox
	   	  
	   	  
	   	  }
	   	  
	   	  
		   	else if(attachmentType=='mp4'||attachmentType=='avi'||attachmentType=='3gp'||attachmentType=='mkv'||attachmentType=='webm'){
		   		  
		   		var $video_player, _player, _isPlaying = false;
		   		
		   		//var l = 'http://192.168.0.117:8080/ATTACHMENT/12645332_1532687740357224_586857755_n.mp4';
		   		
		   		$.fancybox({
		   			type: "html",
		   	        // other API options
		   	        scrolling: "no",
		   	        autoPlay    : true,
		   	        fitToView: true,
		   	        autoSize: false,
		   	        beforeLoad: function () {
		   	            // build the HTML5 video structure for fancyBox content with specific parameters
		   	            this.content = "<video id='video_player' autoplay='true' src='" + attachmentLink + "' poster='" + $(this.element).data("poster") + "' width='460' height='315' controls='controls' preload='none'></video>";
		   	            // set fancyBox dimensions
		   	            this.width = 460; // same as video width attribute
		   	            this.height = 315; // same as video height attribute
		   	        }
				});

		  
		   		
		   	  
		   	  }
		   	  
	   	  

	   	  
	   	  
	   	  
	   	  else{
	   	    
	   	   $.fancybox([
	   		     	{href:attachmentLink, title: '01'}
	   		     	
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


function callportalAttachment() {
		
		
		$.ajax({
			 url: webServerUrl,
	         data: 'request=portalAttachment',
	         type: 'post',
					success: function(msg){
						
			
				    var fileListJson = msg.trim();
				
			   		 obj = JSON.parse(fileListJson);
			   		 var arrayLength  = obj.response.portalAttachmentResult.attachmentList.length;
				   	 var fileListing= document.getElementById('fileListing');
				    fileListing.innerHTML='';
	
			 
			   		for (var i = 0; i < arrayLength; i++) {
		   		        var cur = obj.response.portalAttachmentResult.attachmentList[i];
		   		        
		   		      
		   		        
		   		     listAttachments.listUserAttachments.push({ 
		 		        "attachmentId" :cur.attachmentId,
		 		        "attachmentLink" :cur.attachmentLink, 
		 		        "attachmentType" :cur.attachmentType
		 		       });
		   		        
		   		    
		   		
		   	   
		   		        
		   		     fileListing.innerHTML='<tr>'+
                         '<td width="20%">'+cur.attachmentName+'</td>'+
                         '<td width="25%">'+cur.attachmentDescription+'</td>'+
                         '<td width="25%">'+cur.attachmentType+'</td>'+
                         '<td width="15%">'+cur.uploadedOn+'</td>'+
                         '<td width="15%"><div class="btn-group open" style="margin-right:15px;font-size:15px;float:right"> <a href="javascript:void(0)" onclick="deleteAttachment('+cur.attachmentId+');"><i class="fa fa-trash-o"></i></a></div>'+
                        ' <div class="btn-group open" style="margin-right:15px;font-size:15px;float:right"> <a href="javascript:void(0)" onclick="previewAttachment('+cur.attachmentId+');"><i class="fa fa-eye"></i></a></div>'+
                         '<div class="btn-group open" style="margin-right:15px;font-size:15px;float:right"> <a href="'+cur.attachmentLink+'" download><i class="fa fa-download"></i></a></div></td>'+
                      '</tr>'+fileListing.innerHTML;
		   	        
	
				}
			   		$('#example').DataTable();}
			
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



show();
callportalAttachment();



$(document).ready(function(){
	
	
	
	$("#upload_frm").submit(function(){
		
		$("#msgbox_upload").removeClass().addClass('myinfo').text('Validating Details..').fadeIn(1000);

		  var jForm = new FormData();
        jForm.append("atta_name", $('#attaname').val());
        jForm.append("atta_desc", $('#attadesc').val());
 

        jForm.append("file", $('#file').get(0).files[0]);
		  
        
        this.timer = setTimeout(function () {
				$.ajax({
					 url: libraryUploadUrl,     
		          	 type: "POST",
	                   data: jForm,
	                   mimeType: "multipart/form-data",
	                   contentType: false,
	                   cache: false,
	                   processData: false,
		   			success: function(msg){
		   				
		   				
		   			
		   				var loginJson = msg.trim();
						 obj = JSON.parse(loginJson);
			   		 var resultCode  = obj.response.resultcode;
			   		 var message  = obj.response.message;
			   		 
			   		 
			   		if(resultCode== 1)
					{
			   		  
							$("#msgbox_upload").html('Uploading File....').addClass('myinfo').fadeTo(900,1,
			                  function()
			                  {
								$('#uploadModal').modal('hide');
								
								document.getElementById('attaname').value="";
								document.getElementById('attadesc').value="";
								document.getElementById('file').value="";
							    var msgbox_upload = document.getElementById("msgbox_upload");
							
							    msgbox_upload.innerHTML="";
							    callportalAttachment();
								   
			                  });
	
						}
						else
						{
							$("#msgbox_upload").fadeTo(200,0.1,function() //start fading the messagebox
		                	{
			                 $(this).html('Oopsss!! Try Again..').removeClass().addClass('myerror').fadeTo(900,1);
			                });
	
						}
					}
				
				});
			}, 200);
			return false;
		});	
	
	
	
	
	
	
	
	
	
	
	
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

	
	 
});
	
	
	
	
	
	
	
