document.getElementById("picturePanelNav").innerHTML ='<img src="'+sessionStorage.getItem("proPic")+'">';

document.getElementById("namePanelNav").innerHTML ='<b>'+sessionStorage.getItem("firstName")+'</b>';


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
loadProfile();


function loadProfile(){
	
	document.getElementById("profileUpdate").disabled = true;
	
	
	$.ajax({
        url: webServerUrl,
        data: 'request=viewProfile',
        type: 'post',
        success: function(msg) {
      	  
      	 var loginJson = msg.trim();
			 obj = JSON.parse(loginJson);
	   		 var resultCode  = obj.response.resultcode;
	   		 var message  = obj.response.message;
	   		 
	   		 
	   		if(resultCode== 1)
			{
	   			var role = sessionStorage.getItem("role");
	   			var userProfileDetails = obj.response.tokenForRegistrationResult.userProfileDetails[0];
	   			
	   			var proPicUrl = document.getElementById('proPicUrl');
	   			proPicUrl.innerHTML ='<img src="'+userProfileDetails.profilePic+'" class="img-circle">';
	   		
	   			
	   			var fullName = document.getElementById('fullName');
	   			fullName.innerHTML =userProfileDetails.firstName+" "+userProfileDetails.lastName;
	   			
	   			var userRole = document.getElementById('userRole');
	   			userRole.innerHTML ='<i class="fa fa-user"></i> &nbsp;'+role;
	   			
	   			var mobile = document.getElementById('mobile');
	   			mobile.innerHTML =userProfileDetails.mobileNumber;
	   			
	   			var email = document.getElementById('email');
	   			email.innerHTML =userProfileDetails.emailId;
	   			
	   			var dob = document.getElementById('dob');
	   			dob.innerHTML =userProfileDetails.dob;
	   			
	   			var address = document.getElementById('address');
	   			address.innerHTML =userProfileDetails.address;
	   			
	   			
	   			
	   			
	   			document.getElementById('itfirstName').value = userProfileDetails.firstName;
	   			document.getElementById('itmiddleName').value = userProfileDetails.middleName;
	   			document.getElementById('itlastName').value = userProfileDetails.lastName;
	   			
	   			document.getElementById('itdob').value = userProfileDetails.dob;
	   			document.getElementById('itmobileNumber').value = userProfileDetails.mobileNumber;
	   			document.getElementById('itemailId').value = userProfileDetails.emailId;
	   			
	   			document.getElementById('itaddress').value = userProfileDetails.address;
	   			
	   						
	   			
	   			if(role=='Student'){
	   				
	   				var detailPanelProfile = document.getElementById('detailPanelProfile');
	   				detailPanelProfile.innerHTML ='<li class="list-group-item"><a href="#" class="clear"><strong class="block">User Role</strong><small>'+sessionStorage.getItem("role")+'</small></a></li>'+
	   					'<li class="list-group-item"><a href="#" class="clear"><strong class="block">Course</strong><small>'+sessionStorage.getItem("studentCourse")+'</small></a></li>'+
	   					'<li class="list-group-item"><a href="#" class="clear"><strong class="block">Batch</strong><small>'+sessionStorage.getItem("studentBatch")+'</small></a></li>'+
	   					'<li class="list-group-item"><a href="#" class="clear"><strong class="block">Semester/Year</strong><small>'+sessionStorage.getItem("studentSem")+'</small></a></li>';
							
	   			}
	   			
	   			else  if(role=='Teacher'){
	   				
	   				
	   				
	   				
	   				

	   				var detailPanelProfile = document.getElementById('detailPanelProfile');
	   				detailPanelProfile.innerHTML ='<li class="list-group-item"><a href="#" class="clear"><strong class="block">User Role</strong><small>'+sessionStorage.getItem("role")+'</small></a></li>'+
	   					'<li class="list-group-item"><a href="#" class="clear"><strong class="block">Courses</strong><small>Electrical and Electronics<br>Computer Science and Engineering<br>Information Technology</small></a></li>'+
	   					'<li class="list-group-item"><a href="#" class="clear"><strong class="block">Subjects</strong><small>C/C++<br>Computer Science and Engineering<br>Information Technology</small></a></li>';

	   				
	   				
	   				
	   				

	   				
	   				
	   				
	   					   		
	   				
	   			}
	   			
	   		   
	   			
			}
	   		
	   
      	  
      	  
        }
    });
	   
		
		
}







$(document).ready(function(){
	
	
	
	
	$('#itfirstName').bind('input',function(){ 
		document.getElementById("profileUpdate").disabled = false;
});
	$('#itmiddleName').bind('input',function(){ 
		document.getElementById("profileUpdate").disabled = false;
});
	$('#itlastName').bind('input',function(){ 
		document.getElementById("profileUpdate").disabled = false;
});
	$('#itmobileNumber').bind('input',function(){ 
		document.getElementById("profileUpdate").disabled = false;
});
	$('#itemailId').bind('input',function(){ 
		document.getElementById("profileUpdate").disabled = false;
});
	
	$('#itaddress').bind('input',function(){ 
		document.getElementById("profileUpdate").disabled = false;
});
	
	

	
	 $("#imgInp").change(function() {
			document.getElementById("uploadButton").disabled = false;
			document.getElementById("imagePreview").style.display="block"; 
	    });
	
	
	
	$("#conf_frm").submit(function()
			{
		
		
		
		  var form = $(this);
		    form.parsley().validate();
			if (form.parsley().isValid())
			{

		
		  $("#msgbox_new").removeClass().addClass('myinfo').css('color', '#5BBFAB').text('Validating Your Inputs..').fadeIn(1000);		  
		  
		  	
	
		  
		  
		  this.timer = setTimeout(function () {
				$.ajax({
					 url: webServerUrl,
				     data: 'request=updateRegistrationDetails&firstName='+ $('#itfirstName').val() +'&middleName=' + $('#itmiddleName').val()+'&lastName=' + $('#itlastName').val()+'&dob=' + $('#itdob').val()+'&address=' + $('#itaddress').val()+'&mobileNumber=' + $('#itmobileNumber').val()+'&emailId=' + $('#itemailId').val(),
		          	type: 'post',
		   			success: function(msg){
		   				
		   			  
		   	      	     var loginJson = msg.trim();
		   				 obj = JSON.parse(loginJson);
		   		   		 var resultCode  = obj.response.resultcode;
		   		   		 var message  = obj.response.message;
		   		   		 
		   		   		 
		   		   		if(resultCode== 1)
		   				{
							$("#msgbox_new").html('Updating Your Profile..').css('color', '#5BBFAB').addClass('myinfo').fadeTo(900,1,
			                  function()
			                  {
								$('#profileModal').modal('hide');
								var msgbox_new = document.getElementById('msgbox_new');
								msgbox_new.innerHTML = "";
								loadProfile();
								
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
			}return false;
		});	
	
	
	
	
	
	
	
	
	
	
	$("#password_frm").submit(function(){
		
		
		 var form = $(this);
		    form.parsley().validate();
			if (form.parsley().isValid())
			{
		$("#msgbox_password").removeClass().addClass('myinfo').css('color', '#5BBFAB').text('Validating Your Inputs..').fadeIn(1000);

		
		var newPass = $('#newPass').val();
	
		var currentPass = $('#currentPass').val();
		
	
		

			
			
			$("#msgbox_password").removeClass().addClass('myinfo').text('Validating Inputs...').fadeIn(1000);

		    this.timer = setTimeout(function () {
				$.ajax({
					url: webServerUrl,
				     data: 'request=changePassword&currentPass='+ currentPass +'&newPass=' + newPass,
		          	type: 'post',
		   			success: function(msg){
		   				
		   				 var loginJson = msg.trim();
		   				 obj = JSON.parse(loginJson);
		   		   		 var resultCode  = obj.response.resultcode;
		   		   		 var message  = obj.response.message;
		   		   		 
		   		   		 
		   		   		if(resultCode== 1)
		   				{
							
		   		   			
		   		   			$("#msgbox_password").html('Password Changed...').css('color', '#5BBFAB').addClass('myinfo').fadeTo(900,1,
			                  function()
			                  {
								
		   		   			document.getElementById("passwordPanel").style.display="none"; 
		   		   		    document.getElementById("expirePanel").style.display="block"; 
								
		   		   		setTimeout(
		   		   		  function() 
		   		   		  {
		   		   		   
		   		   			  signout();
		   		   			  
		   		   			  
		   		   		  }, 2000);
								
								
								
			                  });
	
						}
						else
						{
							
							$("#msgbox_password").html(message).css('color', 'red').addClass('myinfo').fadeTo(900,1,
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





function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        }
        
        reader.readAsDataURL(input.files[0]);
    }
}

$("#imgInp").change(function(){
    readURL(this);
});










function changePicture (fileString) {
	
	document.getElementById("msgbox_picture").style.display="block"; 
		this.timer = setTimeout(function () {
			

			 $.ajax({
	                url: webServerUrl,
	                data: 'request=changeProPic&userId='+userName+'&fileString=' +fileString,
	                type: 'post',
	                success: function(msg) {
	   			 
	   				var loginJson = msg.trim();	
	   			 obj = JSON.parse(loginJson);
		   		 var resultCode  = obj.response.resultcode;
		   		 var message  = obj.response.message;
	   				
					if(resultCode==1) 
					{	
	   			
	   			     var newPic =  obj.response.changeProPicResult.profilePicLink;
		   			 sessionStorage.setItem("proPic",newPic);
		   			 
		   			 
		   			setTimeout(
		   				  function() 
		   				  {
		   					window.location.reload();
		   				  }, 3000);
		   			 
		   		
	
					}
					else
					{
	                    
						
						$("#msgbox_pic").html(message).css('color', 'red').addClass('myinfo').fadeTo(900,1,
				                  function()
				                  {
									
									
									
				                  });
						
						
						
						
					}
				}
			
			});
		}, 200);
	return false;
	
	}



	
	
	
	
	
