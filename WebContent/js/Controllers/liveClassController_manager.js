
document.getElementById("picturePanelNav").innerHTML ='<img src="'+sessionStorage.getItem("proPic")+'">';

document.getElementById("namePanelNav").innerHTML ='<b>'+sessionStorage.getItem("firstName")+'</b>';




var StartTime  = sessionStorage.getItem("StartTime");
var ProfilePicURL  = sessionStorage.getItem("ProfilePicURL");
var Subject  = sessionStorage.getItem("Subject");
var CurrentScheduleId  = sessionStorage.getItem("liveSessionFlag");
var Chaptername  = sessionStorage.getItem("Chaptername");
var TeacherName  = sessionStorage.getItem("TeacherName");
var TeacherId  = sessionStorage.getItem("liveSessionFlag");
var Topicname  = sessionStorage.getItem("Topicname");



var liveSessionFlag = sessionStorage.getItem("liveSessionFlag");






















  

var ClassInfo = document.getElementById("ClassInfo"); 
	ClassInfo.innerHTML = '<small class="text-uc text-xs text-muted">Chapter</small>'+
   ' <p>'+Chaptername+'</p>'+
   ' <small class="text-uc text-xs text-muted">Topic</small> '+
    '<p>'+Topicname+'</p>'+
    '<div class="line"></div> ';
	
	
	
	

	var Tpic = document.getElementById("Tpic"); 
	Tpic.innerHTML = '<img src="'+ProfilePicURL+'" class="img-circle">';
	

	
	

	var teachPanel = document.getElementById("teachPanel"); 
teachPanel.innerHTML = '<div class="h4 m-t-xs m-b-xs">'+TeacherName+'</div>'+
'<small class="text-muted">Class Started @ '+StartTime+'</small>';

































    sessionStorage.setItem("liveSessionFlag", "0");

    $.ajax({
        url: webServerUrl,
        data: 'request=startRecordManager',
        type: 'post',
        success: function(msg) {
        	
        	
            var loginJson = msg.trim();
            obj = JSON.parse(loginJson);
            var resultCode = obj.response.resultcode;
            var message = obj.response.message;

            if (resultCode == 1) {


                var liveSessionDetails = msg.trim();
                var liveJson = liveSessionDetails.trim();
                obj = JSON.parse(liveJson);

                var timestamp = obj.response.startRecordResult.timestamp;
                var video1 = obj.response.startRecordResult.liveCamDetails.CAM1.Url;
                var video2 = obj.response.startRecordResult.liveCamDetails.CAM2.Url;
                var video3 = obj.response.startRecordResult.liveCamDetails.CAM3.Url;
                var video4 = obj.response.startRecordResult.liveCamDetails.CAM4.Url;

                var audio1 = obj.response.startRecordResult.liveCamDetails.CAM1.Aud;
                var audio2 = obj.response.startRecordResult.liveCamDetails.CAM2.Aud;
                var audio3 = obj.response.startRecordResult.liveCamDetails.CAM3.Aud;
                var audio4 = obj.response.startRecordResult.liveCamDetails.CAM4.Aud;




                sessionStorage.setItem("vidFeed1", video1);
                sessionStorage.setItem("vidFeed2", video2);
                sessionStorage.setItem("vidFeed3", video3);
                sessionStorage.setItem("vidFeed4", video4);

                sessionStorage.setItem("audFeed1", audio1);
                sessionStorage.setItem("audFeed2", audio2);
                
                
            
                var playerInstance1 = jwplayer("liveVid1");
            	playerInstance1.setup({
            	 autostart: true,
            	 image: "images.jpg",
            	 file: video1,
            	 height: "214",
                 width: "100%",
                 logo: {
                     file: "images/logo_jw.png"
                 },
                 repeat:'always',
                 'stretching': 'exactfit',
            	 title: "My Cool Trailer"
            	});
                
                
                
                
                
                
                
                
                
                
                
                
             
                
                
                
                var playerInstance2 = jwplayer("liveVid2");
            	playerInstance2.setup({
            	 autostart: true,
            	 image: "images.jpg",
            	 file: video2,
            	 height: "350",
                 width: "100%",
                 logo: {
                     file: "images/logo_jw.png"
                 },
                 repeat:'always',
                 'stretching': 'exactfit',
            	 title: "My Cool Trailer"
            	});
                
                
                
                
                
           
                
                
                
                
                
                var playerInstance3 = jwplayer("liveVid3");
            	playerInstance3.setup({
            	 autostart: true,
            	 image: "images.jpg",
            	 file: video3,
            	 height: "214",
                 width: "100%",
                 logo: {
                     file: "images/logo_jw.png"
                 },
                 repeat:'always',
                 'stretching': 'exactfit',
            	 title: "My Cool Trailer"
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
                
                





            }

        }

    });
    
    
  












































$(document).ready(function() {


    
    
    
    
    
    


});






