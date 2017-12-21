		$(document).ready(function(){
			
	$("#reg_frm").submit(function(){
		
		
		
		
		var form = $(this);
	    form.parsley().validate();
		if (form.parsley().isValid()){
			//document.getElementById("Fform").disabled= "true";
			
		  $("#msgbox").removeClass().addClass('myinfo').text('Validating Your Details..').fadeIn(1000);

			  	this.timer = setTimeout(function () {
					$.ajax({
		                url: webServerUrl,
		                data: 'request=signupInPortal&firstname='+ $('#firstname').val() +'&username=' + $('#username').val()+'&email=' + $('#email').val()+'&password=' + $('#password').val()+'&confirmpassword=' + $('#confirmpassword').val()+'&role=Student&mobile=' + $('#mobile').val(),
			          	type: 'post',
			   			success: function(msg){
			   			 var loginJson = msg.trim();
	     				 obj = JSON.parse(loginJson);
	        	   		 var resultCode  = obj.response.resultcode;
	        	   		 var message  = obj.response.message;



	     				if(resultCode== 1)
	     				{	
	     						
								$("#msgbox").html('Creating Account.....').addClass('myinfo').fadeTo(900,1,
				                  function()
				                  {
									
									   document.getElementById("firstStep").style.display="none";
									   document.getElementById("secondStep").style.display="block";
									   
				                  });
		
							}
							else
							{
								$("#msgbox").fadeTo(200,0.1,function() //start fading the messagebox
			                	{
				                 $(this).html(message).css("color", "red").removeClass().addClass('myerror').fadeTo(900,1);
				                });
		
							}
						}
					
					});
				}, 200);
			  
			  	
				return false;
				
				
		}
	 		});
			
			
			
			
	$("#conf_frm").submit(function(){	 
	
	
		var form = $(this);
	    form.parsley().validate();
		if (form.parsley().isValid()){
			//document.getElementById("sform").disabled= "true";
		
	$("#msgbox_verify").removeClass().addClass('myinfo').text('Validating Your Inputs..').fadeIn(1000);
		
	  	this.timer = setTimeout(function () {
			$.ajax({
				
				url: webServerUrl,
	            data: 'request=tokenForRegistration&emailCode='+ $('#emailCode').val() +'&smsCode=' + $('#smsCode').val(),
	          	type: 'post',
	   			success: function(msg){
	   				
	   			 var loginJson = msg.trim();
 				 obj = JSON.parse(loginJson);
    	   		 var resultCode  = obj.response.resultcode;
    	   		 var message  = obj.response.message;



 				if(resultCode== 1)
 				{				
						
 					document.getElementById("fname").value=obj.response.tokenForRegistrationResult.firstName;
 					document.getElementById("mob").value=obj.response.tokenForRegistrationResult.mobileNo;
 					document.getElementById("emailId").value=obj.response.tokenForRegistrationResult.emailId;
 		
 					
 					
 					
 					
						$("#msgbox_verify").html('Validating Your Inputs..').css('color', '#5BBFAB').addClass('myinfo').fadeTo(900,1,
		                  function()
		                  {
							
							   document.getElementById("secondStep").style.display="none";
							   document.getElementById("thirdStep").style.display="block";
							
		                  });

					}
					else
					{
						
						$("#msgbox_verify").html(message).css('color', 'red').addClass('myinfo').fadeTo(900,1,
				                  function()
				                  {
									
									
									
				                  });
						
						

					}
				}
			
			});
		}, 200);
	  	
	  
		return false;
		
		}
	});		
			
			
			
	$("#profile_frm").submit(function(){
		
		
		var form = $(this);
	    form.parsley().validate();
		if (form.parsley().isValid()){
		
		
		  $("#msgbox_complete").removeClass().addClass('myinfo').css('color', '#5BBFAB').text('Validating Your Inputs..').fadeIn(1000);		  
		  
		  	this.timer = setTimeout(function () {
				$.ajax({
					 url: webServerUrl,
				     data: 'request=RegistrationDetails&firstName='+ $('#fname').val() +'&middleName=' + $('#mname').val()+'&lastName=' + $('#lname').val()+'&dob=' + $('#dob').val()+'&address=' + $('#address').val()+'&mobileNumber=' + $('#mob').val()+'&emailId=' + $('#emailId').val(),
		          	type: 'post',
		   			success: function(msg){
		   				
		   			  
		   	      	     var loginJson = msg.trim();
		   				 obj = JSON.parse(loginJson);
		   		   		 var resultCode  = obj.response.resultcode;
		   		   		 var message  = obj.response.message;
		   		   		 
		   		   		 
		   		   		if(resultCode== 1)
		   				{
							$("#msgbox_complete").html('creating Your Profile..').css('color', '#5BBFAB').addClass('myinfo').fadeTo(900,1,
			                  function()
			                  {
								
								
								
								document.getElementById("thirdStep").style.display="none";
								document.getElementById("lastStep").style.display="block";
								
								
								
								
			                  });
	
						}
						else
						{
							
							$("#msgbox_new").html(message).css('color', 'red').addClass('myinfo').fadeTo(900,1,
					                  function()
					                  {
										
										
										
					                  });
							
							
	
						}
					}
				
				});
			}, 200);
			return false;
			
		}
		});	
		
			
			
			
			
	
		});
		
		
		function loginPage(){
			
			
			window.location="index.html";
			
			
			
			
		}
	