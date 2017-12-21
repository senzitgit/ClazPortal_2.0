 var videoSeek1,videoSeek2,videoSeek3,videoSeek4, playbtn, seekslider,audioSeek1,audioSeek2,audioSeek3,audioSeek4, curtimetext, durtimetext, mutebtn1,mutebtn2,mutebtn3,mutebtn4, volumeslider;
  function intializePlayer(){
  	
  	  videoSeek1 = document.getElementById("video1");
      videoSeek2 = document.getElementById("video2");
    videoSeek3 = document.getElementById("video3");
     
      audioSeek1 = document.getElementById("audio1");
      audioSeek2 = document.getElementById("audio2");
     
      
  	playbtn = document.getElementById("playpausebtn");
  	seekslider = document.getElementById("seekslider");
  	mutebtn1 = document.getElementById("mutebtn1");
  	mutebtn2 = document.getElementById("mutebtn2");
  	
  	curtimetext = document.getElementById("curtimetext");
  	durtimetext = document.getElementById("durtimetext");
  	volumeslider = document.getElementById("volumeslider");
  	// Add event listeners
  	playbtn.addEventListener("click",playPause,false);
  	seekslider.addEventListener("change",vidSeek,false);
  	videoSeek1.addEventListener("timeupdate",seektimeupdate,false);
  	volumeslider.addEventListener("change",setvolume,false);
  	mutebtn1.addEventListener("click",vid1mute,false);
  	mutebtn2.addEventListener("click",vid2mute,false);
  	videoSeek1.play();
  	videoSeek2.play();
videoSeek3.play();
  	audioSeek1.play();
  	audioSeek2.play();
  	


  }
  function playPause(){ 
  	if(videoSeek1.paused){
  		
  		videoSeek1.play();
  		videoSeek2.play();
  	videoSeek3.play();
  		
  		audioSeek1.play();
  		audioSeek2.play();
  		
  	
  		
  		
  		playbtn.innerHTML = '<div class="fa fa-pause"  style="font-size:20px; margin-top:6px;margin-left:6px;"></div>';
  	} else {
  	
  		videoSeek1.pause();
  		videoSeek2.pause();
  		videoSeek3.pause();
  		
  		audioSeek1.pause();
  		audioSeek2.pause();
  		
  		
  		
  		playbtn.innerHTML = '<div class="fa fa-play"  style="font-size:20px; margin-top:6px;margin-left:6px;"></div>';
  	}
  }
  function vidSeek(){
  	var seekto = videoSeek1.duration * (seekslider.value / 100);
  	
  	videoSeek1.currentTime = seekto;
  	videoSeek2.currentTime = seekto;
  	videoSeek3.currentTime = seekto;
  	
  	
  	audioSeek1.currentTime = seekto;
  	audioSeek2.currentTime = seekto;
  	
  	
  }
  function seektimeupdate(){
  	var nt = videoSeek1.currentTime * (100 / videoSeek1.duration);
  	seekslider.value = nt;
  	var curmins = Math.floor(videoSeek1.currentTime / 60);
  	var cursecs = Math.floor(videoSeek1.currentTime - curmins * 60);
  	var durmins = Math.floor(videoSeek1.duration / 60);
  	var dursecs = Math.floor(videoSeek1.duration - durmins * 60);
  	if(cursecs < 10){ cursecs = "0"+cursecs; }
  	if(dursecs < 10){ dursecs = "0"+dursecs; }
  	if(curmins < 10){ curmins = "0"+curmins; }
  	if(durmins < 10){ durmins = "0"+durmins; }
  	
  	 curtimetext.innerHTML = curmins + ":" + cursecs;
     durtimetext.innerHTML = durmins + ":" + dursecs;
  }


  function setvolume(){
  	videoSeek1.volume = volumeslider.value / 100;
  	videoSeek2.volume = volumeslider.value / 100;
  	videoSeek3.volume = volumeslider.value / 100;
  	
  	
  	audioSeek1.volume = volumeslider.value / 100;
  	audioSeek2.volume = volumeslider.value / 100;

  	
  }

  function audioMute(){

	  if(audioSeek1.muted && audioSeek2.muted){
			audioSeek1.muted = false;
			audioSeek2.muted = false;
			
			
			
			  var muteUnmuteButton = document.getElementById("muteUnmuteButton");
			  muteUnmuteButton.innerHTML = '<div  class="fa fa-volume-up"  style="font-size:20px; margin-top:5px;" >';
			  
		
	  } else {
			audioSeek1.muted = true;
			audioSeek2.muted = true;
			 
			var muteUnmuteButton = document.getElementById("muteUnmuteButton");
			  muteUnmuteButton.innerHTML = '<div  class="fa fa-volume-off"  style="font-size:20px; margin-top:5px;" >';
		}
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	}


  	
  	function vid1mute(){
  		if(audioSeek1.muted){
  			audioSeek1.muted = false;
  			mutebtn1.innerHTML = '<div  class="fa fa-volume-up"  style="font-size:20px; float:right;margin-top:-20px;">';
  		} else {
  			audioSeek1.muted = true;
  			mutebtn1.innerHTML = '<div  class="fa fa-volume-off"  style="font-size:20px; float:right;margin-top:-20px;">';
  		}
  		
  	}
  		
  		function vid2mute(){
  			if(audioSeek2.muted){
  				audioSeek2.muted = false;
  				mutebtn2.innerHTML = '<div  class="fa fa-volume-up"  style="font-size:20px; float:right;margin-top:-20px;">';
  			} else {
  				audioSeek2.muted = true;
  				mutebtn2.innerHTML = '<div  class="fa fa-volume-off"  style="font-size:20px; float:right;margin-top:-20px;">';
  			}
  		}	
  		
  		
  		
  		
  		function seekFeeds(seekDuration){
	    	  
	    	  var clickVideo1 = document.getElementById("video1");
	          var clickVideo2 = document.getElementById("video2");
	        var clickVideo3 = document.getElementById("video3");
	          var clickAudio1 = document.getElementById("audio1");
	          var clickAudio2 = document.getElementById("audio2");
	          
	            clickVideo1.currentTime=seekDuration;
		       	clickVideo2.currentTime=seekDuration;
		  	clickVideo3.currentTime=seekDuration;
		       
		       	clickAudio1.currentTime=seekDuration;
		       	clickAudio2.currentTime=seekDuration;
		       
	      }
  		
  		 var c=0;
	         var t;
	         var timer_is_on=0;
	         
	        
	         
	         function timedCount()
	         {
	         
	         var videoSeek1 = document.getElementById("video1"); 
	         var dur = videoSeek1.currentTime;
	         document.getElementById('txt1').value = (dur).toFixed(); 
	         document.getElementById('txt').value=c;
	         c=c+1;
	         t=setTimeout("timedCount()",1000);
	         
	         scroll_to((dur).toFixed());
	         }
	         
	         function doTimer()
	         {
	         if (!timer_is_on)
	         {
	         timer_is_on=1;
	         timedCount();
	         }
	         }
	         
	         function scroll_to(div){
	          
	             var elemId = "#s"+div;    
	           
	             $('.content').animate({
	                 scrollTop: $(elemId).parent().scrollTop() + $(elemId).offset().top - $(elemId).parent().offset().top
	             }, {
	                 duration: 1000,
	                 specialEasing: {
	                     width: 'linear',
	                     height: 'easeOutBounce'
	                 },
	                 complete: function (e) {
	                    
	                 }
	             });
	             
	             if(finalDuration==div){
	             	
	             	videoSeek1.pause();
	         		videoSeek2.pause();
	         		videoSeek3.pause();
	         		
	         		
	         		audioSeek1.pause();
	         		audioSeek2.pause();
	         		
	         
	         		videoSeek1.currentTime = 0;
	         		playbtn.innerHTML = '<div class="fa fa-play"  style="font-size:25px;"></div>';
	         		videoSeek2.currentTime = 0;
	         	videoSeek3.currentTime = 0;
	         		
	         		
	         		audioSeek1.currentTime = 0;
	         		audioSeek2.currentTime = 0;
	         		
	         		
	             }
	             
	           
	         }
	         
		
		
		
		
		
		
		

  		