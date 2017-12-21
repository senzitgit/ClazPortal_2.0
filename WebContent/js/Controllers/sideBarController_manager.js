
var firstName = sessionStorage.getItem("firstName");
var userRole = sessionStorage.getItem("role");
var userPic =  sessionStorage.getItem("proPic");
var userName=sessionStorage.getItem('loguser');


var picturePanel = document.getElementById("picturePanel");
picturePanel.innerHTML = '<a href="javascript:void(0)" class="thumb-sm avatar animated rollIn" data-toggle="dropdown"> <img src="'+userPic+'" alt="" class=""><span class="caret caret-white"></span></a>';






var sideBar = document.getElementById("sideBar");
sideBar.innerHTML = sideBar.innerHTML +'<li class="dropdown-submenu"> <a href="manager_dashboard.html"><i class="fa fa-dashboard"></i> Dashboard</a> </li>';


var sideBar = document.getElementById("sideBar");
sideBar.innerHTML = sideBar.innerHTML +'<li class="dropdown-submenu"> <a href="list_classes.html"><i class="fa fa-video-camera"></i>Classes</a> </li> ';


var sideBar = document.getElementById("sideBar");
sideBar.innerHTML = sideBar.innerHTML +'<li class="dropdown-submenu"> <a href="manager_area.html"><i class="fa fa-random"></i> Manager\'s Area</a> </li>';












$(document).ready(function(){
	

	   
		
		
		
		
	

	
});




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



$(document).on('click', '[data-toggle^="class"]', function(e) {
    e && e.preventDefault();
    var $this = $(e.target),
        $class, $target, $tmp, $classes, $targets;
    !$this.data('toggle') && ($this = $this.closest('[data-toggle^="class"]'));
    $class = $this.data()['toggle'];
    $target = $this.data('target') || $this.attr('href');
    $class && ($tmp = $class.split(':')[1]) && ($classes = $tmp.split(','));
    $target && ($targets = $target.split(','));
    $targets && $targets.length && $.each($targets, function(index, value) {
        ($targets[index] != '#') && $($targets[index]).toggleClass($classes[index]);
    });
    $this.toggleClass('active');
});


