<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.net.*,java.text.SimpleDateFormat,java.io.*,java.sql.*, java.util.*,org.json.*,
					org.apache.commons.httpclient.HttpClient,
					org.apache.commons.httpclient.methods.PostMethod,org.apache.commons.httpclient.MultiThreadedHttpConnectionManager,
					org.apache.commons.httpclient.HttpStatus" %>  
					
<%session.setMaxInactiveInterval(-1);


%> 


<%!	String requestToAppServer(String link,List<String> postData,HttpClient client){
	
	PostMethod method = new PostMethod("http://192.168.0.110:8080/CyberClazServer/cyberclaz/"+link);
	if(postData!=null)
		for(int i=0;i<postData.size();i+=2){
			
			method.addParameter(postData.get(i), postData.get(i+1));
		}
	
	BufferedReader br = null;
	StringBuilder responseSB = new StringBuilder();
	try{
		
		int returnCode = client.executeMethod(method);

	      if(returnCode == HttpStatus.SC_NOT_IMPLEMENTED) {
	    	  
	        System.err.println("The Post method is not implemented by this URI");
	        // still consume the response body
	        method.getResponseBodyAsString();
	        
	      } 
	      else {
	    	  
	    	  br = new BufferedReader(new InputStreamReader(method.getResponseBodyAsStream()));
	    	  String readLine;
	    	  while(((readLine = br.readLine()) != null)){
	    		  responseSB.append(readLine);
	    	  }
	      }
	}	catch (Exception e) {
	      System.err.println(e);
	      
	    } finally{
	    	
	    	method.releaseConnection();
	    	if(br != null) 
	    		try {
	    			br.close();
	    			} catch (Exception fe) {}
	    	
	    }
	
	System.out.println("ClazPortal Web Server : "+responseSB.toString());
	method.releaseConnection();
	return responseSB.toString(); 
	
}
%>


<%
       String requestOrigin = request.getParameter("request"); 
     
       
       
       if(requestOrigin.equals("login")){
    	   
    	    String link = "login";
    	    String userName = request.getParameter("username");    
    	    String password = request.getParameter("password");
    	    
    	    
    	    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
    	    HttpClient client = new HttpClient(connectionManager);
    	    session.setMaxInactiveInterval(-1); 
    	    session.setAttribute("client",client);
    	    session.setAttribute("userName",userName);
    	    
    	    ArrayList<String> postData = new ArrayList<String>();
    	   	postData.add("userId");
    	   	postData.add(userName);
    	   	postData.add("password");
    	   	postData.add(password);
    	   	
    	   	String serverResponse = requestToAppServer(link,postData,client);
    	   	
    	   	JSONObject obj = new JSONObject(serverResponse);
    	   	String sessionId = obj.getJSONObject("response").getString("sessionID");
    	   	

    	   	session.setAttribute("userSessionId", sessionId);
    	   	session.setAttribute("userId", userName);
    	   	
    	   	
    	   	out.println(serverResponse);
    	   
       }
       
       
       else if(requestOrigin.equals("signupInPortal")){
    	   
   	    String link = "signupInPortal";
   	
		String firstName = request.getParameter("firstname");   
		String username = request.getParameter("username"); 
		
		String email = request.getParameter("email");  
		String password = request.getParameter("password");  
		String confirmpassword = request.getParameter("confirmpassword"); 
		String role = request.getParameter("role");   
		String mobile = request.getParameter("mobile"); 
		session.setAttribute("userName",username);

  	  MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
  	  HttpClient client = new HttpClient(connectionManager);   
      session.setAttribute("client",client);
  	  ArrayList<String> postData = new ArrayList<String>();
		

  	    
		postData.add("firstName");
 	   	postData.add(firstName);
		postData.add("userId");
 	   	postData.add(username);
		postData.add("emailId");
 	   	postData.add(email);
		postData.add("mobileNumber");
 	   	postData.add(mobile);
		postData.add("userRole");
 	   	postData.add(role);
		postData.add("password");
 	   	postData.add(password);
		postData.add("confirmPassword");
 	   	postData.add(confirmpassword);


	   	String serverResponse = requestToAppServer(link,postData,client);
	   	out.println(serverResponse);
 
   	   
      }
       
       
       else if(requestOrigin.equals("tokenForRegistration")){
    	   
     	    String link = "tokenForRegistration";
     	    String emailCode = request.getParameter("emailCode");   
			String smsCode = request.getParameter("smsCode");
			
			   	    
			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
     	    ArrayList<String> postData = new ArrayList<String>();
     		postData.add("smsCode");
    	   	postData.add(smsCode);
    	   	postData.add("emailCode");
   	   	    postData.add(emailCode);
   
    
     	   	String serverResponse = requestToAppServer(link,postData,client);
     	   	out.println(serverResponse);
     	   
        }
       
       else if(requestOrigin.equals("RegistrationDetails")){
      	   
		    String link = "registrationThirdStep";
			String firstName = request.getParameter("firstName");   
			String middleName = request.getParameter("middleName");   
			String lastName = request.getParameter("lastName");  
			String dob = request.getParameter("dob");   
			String address = request.getParameter("address");   
			String mobileNumber = request.getParameter("mobileNumber"); 
			String emailId = request.getParameter("emailId"); 
			String userId = session.getAttribute("userName").toString();
	 	    
	    
			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
     	    ArrayList<String> postData = new ArrayList<String>();
     		
			postData.add("firstName");
	   	   	postData.add(firstName);
			postData.add("middleName");
	   	   	postData.add(middleName);
			postData.add("lastName");
	   	   	postData.add(lastName);
			postData.add("dob");
	   	   	postData.add(dob);
			postData.add("address");
	   	   	postData.add(address);
			postData.add("mobileNumber");
	   	   	postData.add(mobileNumber);
			postData.add("emailId");
	   	   	postData.add(emailId);
	   	    postData.add("userId");
	   	   	postData.add(userId);

	
		   	String serverResponse = requestToAppServer(link,postData,client);
		   	out.println(serverResponse);
	   
	}
     
       
       
       
       
       
        
       
       else if(requestOrigin.equals("getTime")){
    	   
      	    String link = "getTime";
      	    String role = request.getParameter("role");   
			
			
	 	    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
      	    ArrayList<String> postData = new ArrayList<String>();
      		postData.add("role");
     	   	postData.add(role);
     	    postData.add("sessionID");
    	    String usersessionID = (String)session.getAttribute("userSessionId");
    	    postData.add(usersessionID);
    	    postData.add("userId");
    	   String userName = (String)session.getAttribute("userId");
    	   postData.add(userName);
     
      	   	String serverResponse = requestToAppServer(link,postData,client);
      	   	out.println(serverResponse);
      	   
         }
       
       
       
       else if(requestOrigin.equals("attendClass")){
    	   
     	    String link = "attendClass";
     	    String userId = request.getParameter("userId");   
     	    String classEventDetailIdRec = request.getParameter("classEventDetailIdRec");   
			
			
	 	    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
     	    ArrayList<String> postData = new ArrayList<String>();
     		postData.add("classEventDetailIdRec");
    	   	postData.add(classEventDetailIdRec);
    	   	postData.add("userId");
    	   	postData.add(userId);
    	   	postData.add("sessionID");
    	   String usersessionID = (String)session.getAttribute("userSessionId");
    	   postData.add(usersessionID);
    
     	   	String serverResponse = requestToAppServer(link,postData,client);
     	   	out.println(serverResponse);
     	   
        }
       
       else if(requestOrigin.equals("advancedSearch")){
    	   
    	    String link = "advancedSearch";
    	    String subject = request.getParameter("subject");    
    		String date = request.getParameter("date");
    		System.err.println(date);
    		
    		String topic = request.getParameter("topic");
    		
    		if(subject.equals("null")){
    			subject="";
    		}
			
    	 	MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
    	    ArrayList<String> postData = new ArrayList<String>();
    	    
    	    if( subject != null && !subject.isEmpty()){
    	    	 postData.add("subject");
    		   	 postData.add(subject.trim());
    	    }else {
    	    	postData.add("subject");
   		   	 	postData.add("");
    	    }
    	    
    	    
    	    if( date != null && !date.isEmpty()){
    	    	postData.add("date");
   		   	 	postData.add(date.trim());
    	   }else {
    		   	postData.add("date");
  		   	 	postData.add("");  		
    	   }
    	   
    	    
    	    if( topic != null && !topic.isEmpty()){
    	    	postData.add("topic");
   		   	 	postData.add(topic.trim());
    	   }else {
    		   postData.add("topic");
  		   	 	postData.add("");
    	   }
    	    
    	    postData.add("sessionID");
    	   String usersessionID = (String)session.getAttribute("userSessionId");
    	   postData.add(usersessionID);
    	   
    	   postData.add("userId");
    	   String userName = (String)session.getAttribute("userId");
    	   postData.add(userName);
    	   
    	   	String serverResponse = requestToAppServer(link,postData,client);
    	   	out.println(serverResponse);
    	   
       }
       
       else if(requestOrigin.equals("askaDoubt")){
    	   
    	    String link = "askaDoubt";
    	    String doubt = request.getParameter("doubt");   
    	    String classEventDetailId = request.getParameter("classEventDetailId");   
			
	
    	    
	 	    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
    	    ArrayList<String> postData = new ArrayList<String>();
    		postData.add("askDoubtText");
	   	   	postData.add(doubt);
	   	   	postData.add("classEventDetailId");
	   	   	postData.add(classEventDetailId);
	   	 postData.add("sessionID");
 	   String usersessionID = (String)session.getAttribute("userSessionId");
 	   postData.add(usersessionID);
   	   
 	  postData.add("userId");
 	 String userName = (String)session.getAttribute("userId");
 	 postData.add(userName);
   
    	   	String serverResponse = requestToAppServer(link,postData,client);
    	   	out.println(serverResponse);
    	   
       }
       
       
       else if(requestOrigin.equals("userLikerating")){
    	   
   	    String link = "userLikerating";
   	    String clazEventDetailId = request.getParameter("classEventDetailId");   
			
	
   	    
	 	    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
   	        ArrayList<String> postData = new ArrayList<String>();
   		
	   	   	postData.add("clazEventDetailId");
	   	   	postData.add(clazEventDetailId);
	   	 postData.add("sessionID");
 	   String usersessionID = (String)session.getAttribute("userSessionId");
 	   postData.add(usersessionID);
 	   
 	  postData.add("userId");
 	 String userName = (String)session.getAttribute("userId");
 	 postData.add(userName);
  
   	   	String serverResponse = requestToAppServer(link,postData,client);
   	   	out.println(serverResponse);
   	   
      }
       
       else if(requestOrigin.equals("userDislikeRating")){
    	   
      	    String link = "userDislikeRating";
      	    String clazEventDetailId = request.getParameter("classEventDetailId");   
   			
   	
      	    
   	 	    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
   			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
      	        ArrayList<String> postData = new ArrayList<String>();
      		
   	   	   	postData.add("clazEventDetailId");
   	   	   	postData.add(clazEventDetailId);
   	   	postData.add("sessionID");
	   String usersessionID = (String)session.getAttribute("userSessionId");
	   postData.add(usersessionID);
	   
	   postData.add("userId");
	   String userName = (String)session.getAttribute("userId");
	   postData.add(userName);
     
      	   	String serverResponse = requestToAppServer(link,postData,client);
      	   	out.println(serverResponse);
      	   
         }
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       else if(requestOrigin.equals("attentionMode")){
    	   
   	     	String link = "attentionMode";
	   	 	String scheduleId = request.getParameter("curscheduleId");
	    	String attentionModeFlag = request.getParameter("attentionModeFlag");   
				
			
	 	    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
   	    	ArrayList<String> postData = new ArrayList<String>();
   			postData.add("scheduleId");
	   	   	postData.add(scheduleId);
	   	   	postData.add("attention");
	   	   	postData.add(attentionModeFlag);
	   	 postData.add("sessionID");
	   	   String usersessionID = (String)session.getAttribute("userSessionId");
 	   postData.add(usersessionID);
 	 	postData.add("userId");
	   	String userName = (String)session.getAttribute("userId");
	   	postData.add(userName);
  
   	   		String serverResponse = requestToAppServer(link,postData,client);
   	   		out.println(serverResponse);
   	   
      }
       
       else if(requestOrigin.equals("generalLog")){
    	   
     	    String link = "generalLog";
     	    String logText = request.getParameter("logText");   
     		String userId = request.getParameter("userId");   
     		String duration = request.getParameter("duration");  
     		String RHflag = request.getParameter("RHflag");   
     		duration=duration.replaceAll("\\s","");
 
  			java.util.Date date= new java.util.Date();
     		String timestamp = new SimpleDateFormat("dd/MM/YYYY HH:mm:ss").format(date);
     				
  			
  	 	    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
  			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
     	    ArrayList<String> postData = new ArrayList<String>();
     		postData.add("raiseHandText");
  	   	   	postData.add("0");
  	   	   	postData.add("raiseHandAnswer");
  	   	   	
  	   	   	postData.add("0");
  	  		postData.add("timestamp");
	   	   	postData.add(timestamp);
	   		postData.add("duration");
  	   	   	postData.add(duration);
  	  		postData.add("logText");
	   	   	postData.add(logText);
	   		postData.add("studentId");
  	   	   	postData.add(userId);
  	   	 postData.add("userId");
  	   String userName = (String)session.getAttribute("userId");
  	   postData.add(userName);
  	   	   	
  	   		postData.add("RHflag");
	   	   	postData.add(RHflag);
	   	 postData.add("sessionID");
 	   String usersessionID = (String)session.getAttribute("userSessionId");
 	   postData.add(usersessionID);
  	   
     	   	String serverResponse = requestToAppServer(link,postData,client);
     	   	out.println(serverResponse);
     	   
        }
       
       else if(requestOrigin.equals("RaiseHandAnswerNow")){
    	   
    	    String link = "generalLog";
    	    String logText = request.getParameter("logText");   
    		String userId = request.getParameter("userId");   
    		String duration = request.getParameter("duration");  
    		String raiseHandText = request.getParameter("raiseHandText"); 
    		String raiseHandAnswer = request.getParameter("raiseHandAnswer"); 
    		String RHflag = request.getParameter("RHflag");   
    		duration=duration.replaceAll("\\s","");
    		
    		

 			java.util.Date date= new java.util.Date();
    		String timestamp = new SimpleDateFormat("dd/MM/YYYY HH:mm:ss").format(date);
    				
 			
 	 	    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
 			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
    	    ArrayList<String> postData = new ArrayList<String>();
    		postData.add("raiseHandText");
 	   	   	postData.add(raiseHandText);
 	   	   	postData.add("raiseHandAnswer");
 	   	   	postData.add(raiseHandAnswer);
 	  		postData.add("timestamp");
	   	   	postData.add(timestamp);
	   		postData.add("duration");
 	   	   	postData.add(duration);
 	  		postData.add("logText");
	   	   	postData.add(logText);
	   		postData.add("studentId");
 	   	   	postData.add(userId);
 	   	   	
 	   	 postData.add("userId");
 		   String userName = (String)session.getAttribute("userId");
 		   postData.add(userName);
 	   	   	
 	   		postData.add("RHflag");
	   	   	postData.add(RHflag);
	   	 postData.add("sessionID");
 	   String usersessionID = (String)session.getAttribute("userSessionId");
 	   postData.add(usersessionID);
	   	
	   	   	
 	   	   	
 	   
    	   	String serverResponse = requestToAppServer(link,postData,client);
    	   	out.println(serverResponse);
    	   
       }
      
       
       
       
       
       
       
       
       
       else if(requestOrigin.equals("changePassword")){
    	   
     	    String link = "changePassword";
     		String currentPass = request.getParameter("currentPass"); 
     	    String newPass = request.getParameter("newPass");    
  				
  			
  	 	    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
  			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
     	    ArrayList<String> postData = new ArrayList<String>();
     		postData.add("currentPassword");
  	   	   	postData.add(currentPass);
  	   	   	postData.add("newPassword");
  	   	   	postData.add(newPass);
  	   	postData.add("sessionID");
	   String usersessionID = (String)session.getAttribute("userSessionId");
	   postData.add(usersessionID);
	   postData.add("userId");
	   String userName = (String)session.getAttribute("userId");
	   postData.add(userName);
    	   
    
     	   	String serverResponse = requestToAppServer(link,postData,client);
     	   	out.println(serverResponse);
     	   
        }
       
       
       else if(requestOrigin.equals("attachmentDeletion")){
    	   
   	     	String link = "attachmentDeletion";
   	    	String attachmentId = request.getParameter("attachmentId");
				
			
	 	    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
   	    	ArrayList<String> postData = new ArrayList<String>();
			postData.add("mediaId");
 	   		postData.add(attachmentId);
 	   	postData.add("sessionID");
	   String usersessionID = (String)session.getAttribute("userSessionId");
	   postData.add(usersessionID);
	   postData.add("userId");
	   String userName = (String)session.getAttribute("userId");
	   postData.add(userName);
	
  	   
  			String serverResponse = requestToAppServer(link,postData,client);
   	   		out.println(serverResponse);
   	   
      }
       
       else if(requestOrigin.equals("exitSession")){
    	   
     	    String link = "exitSession";
     	    String clazNotes = request.getParameter("clazNotes");
     	    String ClazEventDetailId = request.getParameter("ClazEventDetailId");
  				
  			
  	 	    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
  			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
     	    ArrayList<String> postData = new ArrayList<String>();
     		postData.add("clazEventId");
  	   	   	postData.add(ClazEventDetailId);
  	   		postData.add("clazNoteJson");
	   	   	postData.add(clazNotes);
	   	 postData.add("sessionID");
 	   String usersessionID = (String)session.getAttribute("userSessionId");
 	   postData.add(usersessionID);
 	  postData.add("userId");
 	 String userName = (String)session.getAttribute("userId");
 	 postData.add(userName);
  	
    	   	String serverResponse = requestToAppServer(link,postData,client);
     	   	out.println(serverResponse);
     	   
        }
       
       else if(requestOrigin.equals("getPlayerInfo")){
    	   
   	     	String link = "getPlayerInfo";
   		 	String clazEventDetailId = request.getParameter("clazEventDetailId");  
				
			
	 	    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
   	    	ArrayList<String> postData = new ArrayList<String>();
   			postData.add("clazEventDetailId");
	   	   	postData.add(clazEventDetailId);
	   	 postData.add("sessionID");
 	   String usersessionID = (String)session.getAttribute("userSessionId");
 	   postData.add(usersessionID);
 	  postData.add("userId");
 	 String userName = (String)session.getAttribute("userId");
 	 postData.add(userName);
 	 
  	 		String serverResponse = requestToAppServer(link,postData,client);
   	   		out.println(serverResponse);
   	   
      }
       
       else if(requestOrigin.equals("inClass")){
    	   
     	    String link = "inClass";
     			
  	 	    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
  			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
     	    ArrayList<String> postData = new ArrayList<String>();
     	
     	   postData.add("sessionID");
   	   String usersessionID = (String)session.getAttribute("userSessionId");
   	   postData.add(usersessionID);
   	postData.add("userId");
   	String userName = (String)session.getAttribute("userId");
   	postData.add(userName);
  	
    	   	String serverResponse = requestToAppServer(link,postData,client);
     	   	out.println(serverResponse);
     	   
        }
       
       else if(requestOrigin.equals("takeAttendance")){
    	   
     	    String link = "takeAttendance";
     	    String scheduleId = request.getParameter("scheduleId"); 
  				
  			
  	 	    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
  			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
     	    ArrayList<String> postData = new ArrayList<String>();
     		postData.add("scheduleId");
  	   	   	postData.add(scheduleId);
  	   	postData.add("sessionID");
	   String usersessionID = (String)session.getAttribute("userSessionId");
	   postData.add(usersessionID);
	   postData.add("userId");
	   String userName = (String)session.getAttribute("userId");
	   postData.add(userName);
  	
    	   	String serverResponse = requestToAppServer(link,postData,client);
     	   	out.println(serverResponse);
     	   
        }
       
       
       else if(requestOrigin.equals("takeAttendance")){
    	   
   	     	String link = "takeAttendance";
   	    	String scheduleId = request.getParameter("scheduleId"); 
				
	 	    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
   	    	ArrayList<String> postData = new ArrayList<String>();
   			postData.add("scheduleId");
	   	   	postData.add(scheduleId);
	   	 postData.add("sessionID");
 	   String usersessionID = (String)session.getAttribute("userSessionId");
 	   postData.add(usersessionID);
 	  postData.add("userId");
 	 String userName = (String)session.getAttribute("userId");
 	 postData.add(userName);
	   	
			String serverResponse = requestToAppServer(link,postData,client);
   	   		out.println(serverResponse);
   	   
      }
       
       else if(requestOrigin.equals("localUser")){
    	   
     	    String link = "localUser";
     	    
     	    

  			MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
  			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
     	    ArrayList<String> postData = new ArrayList<String>();
     		postData.add("rebbonId");
  	   	   	postData.add("r101");
  	   	postData.add("sessionID");
  	    String usersessionID = (String)session.getAttribute("userSessionId");
  	    postData.add(usersessionID);
  	  postData.add("userId");
  	String userName = (String)session.getAttribute("userId");
  	postData.add(userName);
  	
			String serverResponse = requestToAppServer(link,postData,client);
     	   	out.println(serverResponse);
     	   
        }
       
      
	else if(requestOrigin.equals("getAllClassDetails")){
    	   
   	    	String link = "getAllClassDetails";

			MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
   	    	ArrayList<String> postData = new ArrayList<String>();	
   	    	
   	    	postData.add("sessionID");
   	    	String usersessionID = (String)session.getAttribute("userSessionId");
    	    postData.add(usersessionID);
    	    
    	    postData.add("userId");
   	    	String userName = (String)session.getAttribute("userId");
    	    postData.add(userName);
  	   
  
   	   		String serverResponse = requestToAppServer(link,postData,client);
   	   		out.println(serverResponse);
   	   
      }
       

       
    else if(requestOrigin.equals("remoteUser")){
  	   
	     	String link = "remoteUser";

			MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
	    	ArrayList<String> postData = new ArrayList<String>();
	   
	    	postData.add("sessionID");
    	   String usersessionID = (String)session.getAttribute("userSessionId");
    	   postData.add(usersessionID);
    	   postData.add("userId");
    	   String userName = (String)session.getAttribute("userId");
    	   postData.add(userName);
    	   
	   		String serverResponse = requestToAppServer(link,postData,client);
	   		out.println(serverResponse);
	   
  	}
       
    else if(requestOrigin.equals("portalAttachment")){
  	   
	     	String link = "portalAttachment";

			MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
	    	ArrayList<String> postData = new ArrayList<String>();
	   
	    	postData.add("sessionID");
    	   String usersessionID = (String)session.getAttribute("userSessionId");
    	   postData.add(usersessionID);
	    	
    	   postData.add("userId");
    	   String userName = (String)session.getAttribute("userId");
    	   postData.add(userName);
    	   
	   		String serverResponse = requestToAppServer(link,postData,client);
	   		out.println(serverResponse);
	   
  	}
       
    else if(requestOrigin.equals("raiseHand")){
  	   
	     	String link = "raiseHand";
	     	String raiseHandText = request.getParameter("raiseHandText"); 
	     	String classEventDetailId = request.getParameter("classEventDetailId"); 
	     	java.util.Date date= new java.util.Date();
	     	String timestamp = new SimpleDateFormat("dd/MM/YYYY HH:mm:ss").format(date);
		 	String duration = request.getParameter("duration");   
	     	duration=duration.replaceAll("\\s","");
	
			
	 	    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
	    	ArrayList<String> postData = new ArrayList<String>();
			postData.add("raiseHandText");
	   	   	postData.add(raiseHandText);
	   	 	postData.add("timestamp");
	   	   	postData.add(timestamp);
	   	 	postData.add("duration");
	   	   	postData.add(duration);
	   	    postData.add("classEventDetailId");
	   	   	postData.add(classEventDetailId);
	   	 postData.add("sessionID");
 	   String usersessionID = (String)session.getAttribute("userSessionId");postData.add(usersessionID);
 	   	
 	  postData.add("userId");
 	 String userName = (String)session.getAttribute("userId");
 	 postData.add(userName);
 	  	   	
	   		String serverResponse = requestToAppServer(link,postData,client);
	   		out.println(serverResponse);
	   
  	}
       
    else if(requestOrigin.equals("raiseHandAskADoubtAnswer")){
   	   
	   	 	String link = "raiseHandAskADoubtAnswer";
    		String notificationId = request.getParameter("notificationId"); 
        	String notificationFlag = request.getParameter("notificationFlag");
        	String answer = request.getParameter("answer");
	
			
	 	    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
	    	ArrayList<String> postData = new ArrayList<String>();
			postData.add("raiseHandText");
	   	   	postData.add(notificationId);
	   	 	postData.add("timestamp");
	   	   	postData.add(notificationFlag);
	   	 	postData.add("answer");
	   	   	postData.add(answer);
	   	 postData.add("sessionID");
 	   String usersessionID = (String)session.getAttribute("userSessionId");
 	   postData.add(usersessionID);
 	  postData.add("userId");
 	 String userName = (String)session.getAttribute("userId");
 	 postData.add(userName);	
 	   
	   		String serverResponse = requestToAppServer(link,postData,client);
	   		out.println(serverResponse);
	   
 	}
       
    else if(requestOrigin.equals("raiseHandQueueNotification")){
    	   
	    	String link = "raiseHandQueueNotification";
			String raiseHandText = request.getParameter("raiseDoubt"); 
	    	String userId = request.getParameter("raiseUser");
			
	 	    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
	    	ArrayList<String> postData = new ArrayList<String>();
			postData.add("userId");
	   	   	postData.add(userId);
	   	 	postData.add("raiseHandText");
	   	   	postData.add(raiseHandText);
	   	 postData.add("sessionID");
 	   String usersessionID = (String)session.getAttribute("userSessionId");
 	   postData.add(usersessionID);
	
	   		String serverResponse = requestToAppServer(link,postData,client);
	   		out.println(serverResponse);
	   
 	}
       
       
    else if(requestOrigin.equals("shareAttachment")){
 	   
	    	String link = "shareAttachment";
			String attaName = request.getParameter("name");   
			String attaLink = request.getParameter("link");   
			String duration = request.getParameter("duration");
			String type = request.getParameter("type"); 
	    	duration=duration.replaceAll("\\s","");
			java.util.Date date= new java.util.Date();
			String timestamp = new SimpleDateFormat("dd/MM/YYYY HH:mm:ss").format(date);

		    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
	    	ArrayList<String> postData = new ArrayList<String>();
			postData.add("link");
	   	   	postData.add(attaLink);
	   	 	postData.add("name");
	   	   	postData.add(attaName);
	   		postData.add("timestamp");
	   	   	postData.add(timestamp);
	   	 	postData.add("duration");
	   	   	postData.add(duration);
	   		postData.add("docType");
	   	   	postData.add(type);
	   	 postData.add("sessionID");
 	   String usersessionID = (String)session.getAttribute("userSessionId");
 	   postData.add(usersessionID);

	   		String serverResponse = requestToAppServer(link,postData,client);
	   		out.println(serverResponse);
	   
 	}
       
    else if(requestOrigin.equals("logout")){
  	   
	    	String link = "logout";
			        
			MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
	    	ArrayList<String> postData = new ArrayList<String>();
			
	    	postData.add("sessionID");
    	   String usersessionID = (String)session.getAttribute("userSessionId");
    	   postData.add(usersessionID);
    	   postData.add("userId");
    	   String userName = (String)session.getAttribute("userId");
    	   postData.add(userName);
    	   
	   		String serverResponse = requestToAppServer(link,postData,client);
	   		out.println(serverResponse);
	   
 }
       
   
  
  
    else if(requestOrigin.equals("switchVideo")){
 	   
	    	String link = "switchVideo";
	    	String switchViewFlag = request.getParameter("switchViewFlag"); 
	 	    
	    	MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
	    	ArrayList<String> postData = new ArrayList<String>();
			postData.add("switchFlag");
	   	   	postData.add(switchViewFlag);
	   	 postData.add("sessionID");
 	   String usersessionID = (String)session.getAttribute("userSessionId");
 	   postData.add(usersessionID);
 	  postData.add("userId");
 	 String userName = (String)session.getAttribute("userId");
 	 postData.add(userName);

			String serverResponse = requestToAppServer(link,postData,client);
	   		out.println(serverResponse);
	   
 	}
       
       
    else if(requestOrigin.equals("updateRegistrationDetails")){
  	   
		    String link = "updateRegistrationDetails";
			String firstName = request.getParameter("firstName");   
			String middleName = request.getParameter("middleName");   
			String lastName = request.getParameter("lastName");  
			String dob = request.getParameter("dob");   
			String address = request.getParameter("address");   
			String mobileNumber = request.getParameter("mobileNumber"); 
			String emailId = request.getParameter("emailId"); 
	 	    
	
	    	MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
	    	ArrayList<String> postData = new ArrayList<String>();
			
			postData.add("firstName");
	   	   	postData.add(firstName);
			postData.add("middleName");
	   	   	postData.add(middleName);
			postData.add("lastName");
	   	   	postData.add(lastName);
			postData.add("dob");
	   	   	postData.add(dob);
			postData.add("address");
	   	   	postData.add(address);
			postData.add("mobileNumber");
	   	   	postData.add(mobileNumber);
			postData.add("emailId");
	   	   	postData.add(emailId);
	   	    postData.add("sessionID");
	   	    
	   	    
 	   String usersessionID = (String)session.getAttribute("userSessionId");
 	   postData.add(usersessionID);
 	  postData.add("userId");
 	 String userName = (String)session.getAttribute("userId");
 	 postData.add(userName);
	
		   	String serverResponse = requestToAppServer(link,postData,client);
		   	out.println(serverResponse);
	   
 	}
       
       
    else if(requestOrigin.equals("viewProfile")){
   	   
	    	String link = "viewProfile";

	 	    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
	    	ArrayList<String> postData = new ArrayList<String>();
	    	
	    	postData.add("sessionID");
	 	   String usersessionID = (String)session.getAttribute("userSessionId");
	 	   postData.add(usersessionID);
	 	  postData.add("userId");
	 	 String userName = (String)session.getAttribute("userId");
	 	 postData.add(userName);
			
			String serverResponse = requestToAppServer(link,postData,client);
	   		out.println(serverResponse);
	   
 	}
       
       
       
    else if(requestOrigin.equals("studentNotificationClick")){
    	   
    	String link = "studentNotificationClick";
    	
    	String notificationId = request.getParameter("notificationId");

 	    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
		HttpClient client=(HttpClient)session.getAttribute("client"); 	    
    	ArrayList<String> postData = new ArrayList<String>();
		
    	
    	postData.add("notificationId");
   	   	postData.add(notificationId);
   	 postData.add("sessionID");
	   String usersessionID = (String)session.getAttribute("userSessionId");
	   postData.add(usersessionID);
	   postData.add("userId");
	   String userName = (String)session.getAttribute("userId");
	   postData.add(userName);
    	
		String serverResponse = requestToAppServer(link,postData,client);
   		out.println(serverResponse);
   
	}
   
       
    else if(requestOrigin.equals("raiseHandQueuedQuestionAnswer")){
 	   
    	String link = "raiseHandQueuedQuestionAnswer";
    	
    	String notificationId = request.getParameter("notificationId");
    	String answer = request.getParameter("answer");

 	    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
		HttpClient client=(HttpClient)session.getAttribute("client"); 	    
    	ArrayList<String> postData = new ArrayList<String>();
		
    	
    	postData.add("notificationId");
   	   	postData.add(notificationId);
   	    postData.add("answer");
	   	postData.add(answer);
	   	postData.add("sessionID");
 	   String usersessionID = (String)session.getAttribute("userSessionId");
 	   postData.add(usersessionID);
 	  postData.add("userId");
 	 String userName = (String)session.getAttribute("userId");
 	 postData.add(userName);
    	
		String serverResponse = requestToAppServer(link,postData,client);
   		out.println(serverResponse);
   
	}
       
       
       
       
       
       
    else if(requestOrigin.equals("startSession")){
    	   
	    	String link = "startSession";

	 	    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
	    	ArrayList<String> postData = new ArrayList<String>();
	    	
	    	postData.add("sessionID");
	 	   String usersessionID = (String)session.getAttribute("userSessionId");
	 	   postData.add(usersessionID);
	 	  postData.add("userId");
	 	 String userName = (String)session.getAttribute("userId");
	 	 postData.add(userName);
			
			String serverResponse = requestToAppServer(link,postData,client);
	   		out.println(serverResponse);
	   
 	}
       
       
       
    else if(requestOrigin.equals("startRecordManager")){
 	   
    	String link = "startRecordManager";

 	    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
		HttpClient client=(HttpClient)session.getAttribute("client"); 	    
    	ArrayList<String> postData = new ArrayList<String>();
    	
    	postData.add("sessionID");
 	   String usersessionID = (String)session.getAttribute("userSessionId");
 	   postData.add(usersessionID);
 	   postData.add("userId");
 	   String userName = (String)session.getAttribute("userId");
 	   postData.add(userName);
		
		String serverResponse = requestToAppServer(link,postData,client);
   		out.println(serverResponse);
   
	}
  
       
       
    else if(requestOrigin.equals("startRecord")){
  	   
		    String link = "startRecord";
		    String scheduleId = request.getParameter("scheduleId");    
		    String chapterName = request.getParameter("chapterName");
		    String topicName = request.getParameter("topicName");   
			String duration = request.getParameter("duration");
		    String subjectId = request.getParameter("subjectId"); 
		    String subjectName = request.getParameter("subjectName");
		    String courseName = request.getParameter("courseName"); 
		    
		    
		    java.util.Date date= new java.util.Date();
			System.out.println(new Timestamp(date.getTime()));
		    String timestamp = new Timestamp(date.getTime()).toString();
		    
	        MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
	    	ArrayList<String> postData = new ArrayList<String>();
			postData.add("scheduleId");
	   	   	postData.add(scheduleId);
	   	 	postData.add("chapterName");
	   	   	postData.add(chapterName);
	   	 	postData.add("topicName");
	   	   	postData.add(topicName);
	   	 	postData.add("duration");
	   	   	postData.add(duration);
	   	   	postData.add("subjectId");
	   	   	postData.add(subjectId);
	   	 	postData.add("timestamp");
	   	   	postData.add(timestamp);
	   	   
	   	   	System.err.println(timestamp);
	   	   	
	   	   	
	     	postData.add("courseName");
	   	   	postData.add(courseName);
	   	 	postData.add("subjectName");
	   	   	postData.add(subjectName);
	   	   	
	   	   	postData.add("sessionID");
	 	   String usersessionID = (String)session.getAttribute("userSessionId");
	 	   postData.add(usersessionID);
	 	  postData.add("userId");
	 	 String userName = (String)session.getAttribute("userId");
	 	 postData.add(userName);
	   	   	
			String serverResponse = requestToAppServer(link,postData,client);
	   		out.println(serverResponse);
	   
	 }
       
       
       
       
    else if(requestOrigin.equals("startRecordManual")){
   	   
	    String link = "startRecordManual";
	    String scheduleId = request.getParameter("scheduleId");    
	    String chapterName = request.getParameter("chapterName");
	    String topicName = request.getParameter("topicName");   
		String duration = request.getParameter("duration");
	    String subjectId = request.getParameter("subjectId"); 
	    java.util.Date date= new java.util.Date();
		System.out.println(new Timestamp(date.getTime()));
	    String timestamp = new Timestamp(date.getTime()).toString();
	    
        MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
		HttpClient client=(HttpClient)session.getAttribute("client"); 	    
    	ArrayList<String> postData = new ArrayList<String>();
		postData.add("scheduleId");
   	   	postData.add(scheduleId);
   	 	postData.add("chapterName");
   	   	postData.add(chapterName);
   	 	postData.add("topicName");
   	   	postData.add(topicName);
   	 	postData.add("duration");
   	   	postData.add(duration);
   	   	postData.add("subjectId");
   	   	postData.add(subjectId);
   	 	postData.add("timestamp");
   	   	postData.add(timestamp);
   	 postData.add("sessionID");
 	   String usersessionID = (String)session.getAttribute("userSessionId");
 	   postData.add(usersessionID);
 	  postData.add("userId");
 	 String userName = (String)session.getAttribute("userId");
 	 postData.add(userName);
   	   	
		String serverResponse = requestToAppServer(link,postData,client);
   		out.println(serverResponse);
   
 }
       
       
       
       
    else if(requestOrigin.equals("stopRecord")){
   	   
	    String link = "stopRecord";
	   
	    
	    
	    String reminderNotes = request.getParameter("reminderNotes");
	    String raiseHands = request.getParameter("raiseHands");
	    String scheduleId = request.getParameter("scheduleId");

	    
	    JSONArray reminderNotesArray =  new JSONArray();
	    JSONArray raiseHand =  new JSONArray();

	    if(reminderNotes != null && !reminderNotes.isEmpty())
	    {

	    JSONObject reminderNotesJson	  	= new JSONObject(reminderNotes);
	    reminderNotesArray =  reminderNotesJson.getJSONArray("classNotes");

	    }
	    
	    

JSONObject attendanceList	  	= new JSONObject();



JSONArray onlineList	  	= new JSONArray();
JSONArray offlineList	  	= new JSONArray();

attendanceList.put("onlineList", onlineList);
attendanceList.put("offlineList", offlineList);




String duration = request.getParameter("duration");
duration=duration.replaceAll("\\s","");





JSONObject stopRecordJson	  	= new JSONObject();
stopRecordJson.put("reminderNotes", reminderNotesArray);
stopRecordJson.put("raiseHand", raiseHand);
stopRecordJson.put("attendanceList", attendanceList);
	    
	    
	    
	    
	    java.util.Date date= new java.util.Date();
		System.out.println(new Timestamp(date.getTime()));
	    String timestamp = new Timestamp(date.getTime()).toString();
	    
        MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
		HttpClient client=(HttpClient)session.getAttribute("client"); 	    
    	ArrayList<String> postData = new ArrayList<String>();
		postData.add("stopRecordJson");
   	   	postData.add(stopRecordJson.toString());
   	 	postData.add("duration");
   	   	postData.add(duration);
   	 	postData.add("timestamp");
   	   	postData.add(timestamp);
   	     postData.add("scheduleId");
	   	postData.add(scheduleId);
   	    postData.add("sessionID");
	   String usersessionID = (String)session.getAttribute("userSessionId");
	   postData.add(usersessionID);
	   postData.add("userId");
	   String userName = (String)session.getAttribute("userId");
	   postData.add(userName);
	   	
		String serverResponse = requestToAppServer(link,postData,client);
   		out.println(serverResponse);
   
 }
    
       
    else if(requestOrigin.equals("subjectList"))
    {
 	   
   	    String link = "subjectList";
   	   
			
	 	    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
   	    ArrayList<String> postData = new ArrayList<String>();
   	    
   	 postData.add("sessionID");
	   String usersessionID = (String)session.getAttribute("userSessionId");
	   postData.add(usersessionID);
	   postData.add("userId");
	   String userName = (String)session.getAttribute("userId");
	   postData.add(userName);
	   
   	   	String serverResponse = requestToAppServer(link,postData,client);
   	   	out.println(serverResponse);
   	   
      }
       
       
    else if(requestOrigin.equals("getStudentNameFromClass"))
    {
 	   
  	    String link = "getStudentNameFromClass";
  	    String classRoomNo = request.getParameter("classRoomNo");
  	 
  	 
	 	    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
  	    ArrayList<String> postData = new ArrayList<String>();
  	    
  		postData.add("classRoomNo");
 	   	postData.add(classRoomNo);
 	   
 	  	  postData.add("sessionID");
 		   String usersessionID = (String)session.getAttribute("userSessionId");
 		   postData.add(usersessionID);
 	  	   
 		  postData.add("userId");
 		 String userName = (String)session.getAttribute("userId");
 		 postData.add(userName);
 		 
  		
  	   	String serverResponse = requestToAppServer(link,postData,client);
  	   	out.println(serverResponse);
  	   
     }
       
       
    else if(requestOrigin.equals("uploadImageFromPortal"))
    {
 	   
  	    String link = "uploadImageFromPortal";
  	    String classEventId = request.getParameter("classEventId");
  	  	String schedule_id = request.getParameter("schedule_id");
  		String clazDuration = request.getParameter("duration");
  		String userId = request.getParameter("userId");
  		String file = request.getParameter("imageData");
  		String imageName = request.getParameter("imageName");
  
  		java.util.Date date= new java.util.Date();
     	String timestamp = new SimpleDateFormat("YYYY-MM-dd HH:mm:ss").format(date);
  		
  	
  		
        MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
		HttpClient client=(HttpClient)session.getAttribute("client"); 	    
  	    ArrayList<String> postData = new ArrayList<String>();
  	    
	    postData.add("file");
 	   	postData.add(file);
 	   	
 	   postData.add("classEventDetailId");
	   	postData.add(classEventId);
	   	
	   	postData.add("scheduleId");
 	   	postData.add(schedule_id);
 	   	
 	   postData.add("userId");
	   	postData.add(userId);
	   	
	   	postData.add("imageName");
 	   	postData.add(imageName);
 	   	
 	   postData.add("duration");
	   	postData.add(clazDuration);
	   	
	   	
	   	postData.add("timestamp");
 	   	postData.add(timestamp);
 	   	
 	   postData.add("type");
	   	postData.add("jpg");
	   	
	   	postData.add("sessionID");
 	   String usersessionID = (String)session.getAttribute("userSessionId");
 	   postData.add(usersessionID);

  		
  	   	String serverResponse = requestToAppServer(link,postData,client);
  	   	out.println(serverResponse);
 	   
     }
    

    else if(requestOrigin.equals("getAssignmentTaskList"))
    {
 	   
  	    String link = "getAssignmentTaskList";
  	   String subject = request.getParameter("subject");
  	   
  	   
  	   System.err.println(subject);
  	   
	 	    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
  	    ArrayList<String> postData = new ArrayList<String>();
  	    
  	   postData.add("subject");
	   	   postData.add(subject);
	   	
	   	postData.add("sessionID");
 	   String usersessionID = (String)session.getAttribute("userSessionId");
 	   postData.add(usersessionID);
 	   
 	  postData.add("userId");
 	 String userName = (String)session.getAttribute("userId");
 	 postData.add(userName);
 	 
 	   	
  	  	String serverResponse = requestToAppServer(link,postData,client);
  	   	out.println(serverResponse);
  	   
     }
    
   
    else if(requestOrigin.equals("getTeacherList"))
    {
 	   
 	    String link = "getTeacherList";
 	   			
	 	    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
 	    ArrayList<String> postData = new ArrayList<String>();
 	    
 	   postData.add("sessionID");
	   String usersessionID = (String)session.getAttribute("userSessionId");
	   postData.add(usersessionID);
	   postData.add("userId");
	   String userName = (String)session.getAttribute("userId");
	   postData.add(userName);
 	    
 		String serverResponse = requestToAppServer(link,postData,client);
 	   	out.println(serverResponse);
 	   
    }   
    
    
    
    else if(requestOrigin.equals("getClassRoom"))
    {
 	   
 	    String link = "getClassRoom";
 	   
	 	    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
 	    ArrayList<String> postData = new ArrayList<String>();
 	    
 	   postData.add("sessionID");
	   String usersessionID = (String)session.getAttribute("userSessionId");
	   postData.add(usersessionID);
	   postData.add("userId");
	   String userName = (String)session.getAttribute("userId");
	   postData.add(userName);
 	    
 	    
 	   	String serverResponse = requestToAppServer(link,postData,client);
 	   	out.println(serverResponse);
 	   
    }    
    
    
    
    else if(requestOrigin.equals("teacherRecommendation"))
    {
 	   
	   	   	 String link = "teacherRecommendation";
	   	     String userId = request.getParameter("userId");
		   	 String subject = request.getParameter("subject");
		   	 String rating = request.getParameter("rating");
		   	String term = request.getParameter("term");
	   	 
		 	 MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
			 HttpClient client=(HttpClient)session.getAttribute("client"); 	    
	   	     ArrayList<String> postData = new ArrayList<String>();
	   	        
	   	     postData.add("userId");
	 	   	 postData.add(userId);
	 	   	 postData.add("subject");
		   	 postData.add(subject);
		   	 postData.add("rating");
		   	 postData.add(rating);
		   	postData.add("term");
		   	 postData.add(term);
		   	postData.add("sessionID");
	 	   String usersessionID = (String)session.getAttribute("userSessionId");
	 	   postData.add(usersessionID);
	   	    
	   		 String serverResponse = requestToAppServer(link,postData,client);
	   	   	 out.println(serverResponse);
	   
   }  
    else if(requestOrigin.equals("addAssignment"))
    {
 	   
  	    String link = "addAssignment";
  	   String subject = request.getParameter("subject");
	      	 String topic = request.getParameter("topic");
	 	    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
  	    ArrayList<String> postData = new ArrayList<String>();
  	   postData.add("subject");
	   	   	postData.add(subject);
	   	   	postData.add("topic");
	   	   	postData.add(topic);
	   	 postData.add("sessionID");
	 	   String usersessionID = (String)session.getAttribute("userSessionId");
	 	   postData.add(usersessionID);
	 	  postData.add("userId");
	 	 String userName = (String)session.getAttribute("userId");
	 	 postData.add(userName);
	 	 
  	  	String serverResponse = requestToAppServer(link,postData,client);
  	   	out.println(serverResponse);
  	   
     }
    
    
	 else if(requestOrigin.equals("assignAssignment"))
   {
 	   
	      	 String link = "assignAssignment";
	      	 String userId = request.getParameter("userId");
	      	 String subject = request.getParameter("subject");
	      	 String topic = request.getParameter("topic");
	      	 
	   		MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
	   		HttpClient client=(HttpClient)session.getAttribute("client"); 	    
	      	ArrayList<String> postData = new ArrayList<String>();
	      	        
	      	postData.add("userId");
	    	postData.add(userId);
	    	postData.add("subject");
	   	   	postData.add(subject);
	   	 postData.add("topic");
	   	   	postData.add(topic);
	   	 postData.add("sessionID");
	 	   String usersessionID = (String)session.getAttribute("userSessionId");
	 	   postData.add(usersessionID);    
	   	   	
	     	String serverResponse = requestToAppServer(link,postData,client);
	      	out.println(serverResponse);
	      	   
      }  
    

    
    else if(requestOrigin.equals("assignmentStatusUpdation"))
    {
 	   
  	     String link = "assignmentStatusUpdation";
  	   	 String userId = request.getParameter("userId");
	     	 String subject = request.getParameter("subject");
	     	 String status = request.getParameter("status");
  	 
			
	 	    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
  	    ArrayList<String> postData = new ArrayList<String>();
  	        
  	    postData.add("userId");
	   	 	postData.add(userId);
	   		postData.add("subject");
	   		postData.add(subject);
	   		postData.add("status");
	   		postData.add(status);
	   		postData.add("sessionID");
	 	   String usersessionID = (String)session.getAttribute("userSessionId");
	 	   postData.add(usersessionID);
  	    
  		String serverResponse = requestToAppServer(link,postData,client);
  	   	out.println(serverResponse);
  	   
     }  
    
    
    else if(requestOrigin.equals("progressReports"))
    {
 	   
 	     String link = "progressReports";
 		 String userId = request.getParameter("userId");
	    	 String term = request.getParameter("term");
	    	 String subject = request.getParameter("subject");
	      	 String mark = request.getParameter("mark");
 	 
			
	 	    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
 	    ArrayList<String> postData = new ArrayList<String>();
 	        
 	     postData.add("userId");
	   	 	 postData.add(userId);
	   		 postData.add("term");
	   	 	 postData.add(term);
	   	 	 postData.add("subject");
	   		 postData.add(subject);
	   		 postData.add("mark");
	   	     postData.add(mark);
	   	  postData.add("sessionID");
	 	   String usersessionID = (String)session.getAttribute("userSessionId");
	 	   postData.add(usersessionID);
	 	   	
	 	   	
 		String serverResponse = requestToAppServer(link,postData,client);
 	   	out.println(serverResponse);
 	   
    }  
    
    
    else if(requestOrigin.equals("targetAttentancePercentage"))
    {
 	   
	   		 String link = "targetAttentancePercentage";
	   		 String teacherId = request.getParameter("teacherId");
		   	 String classRoomNo = request.getParameter("classRoomNo");
		   	 String attendancePercentage = request.getParameter("attendancePercentage");
  	 
	   	 	 MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
			 HttpClient client=(HttpClient)session.getAttribute("client"); 	    
	         ArrayList<String> postData = new ArrayList<String>();
	  
	   	     postData.add("teacherId");
	 	   	 postData.add(teacherId);
	 	   	 postData.add("classRoomNo");
		   	 postData.add(classRoomNo);
	 	   	 postData.add("attendancePercentage");
		     postData.add(attendancePercentage);
		     postData.add("sessionID");
		 	   String usersessionID = (String)session.getAttribute("userSessionId");
		 	  postData.add(usersessionID);
		 	 postData.add("userId");
		 	String userName = (String)session.getAttribute("userId");
		 	postData.add(userName);
	   	
	   		 String serverResponse = requestToAppServer(link,postData,client);
	   	     out.println(serverResponse);
	   
   }  
    
    
   else if(requestOrigin.equals("targetPassPercentage"))
   {
 	   
   	    String link = "targetPassPercentage";
   	    String teacherId = request.getParameter("teacherId");
   	    String classRoomNo = request.getParameter("classRoomNo");
   	    String passPercentage = request.getParameter("passPercentage");
     	 
   	    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
   	    ArrayList<String> postData = new ArrayList<String>();
   	        
   	    postData.add("teacherId");
 	    postData.add(teacherId);
 	    postData.add("classRoomNo");
	   	    postData.add(classRoomNo);
 	   	postData.add("passPercentage");
	   		postData.add(passPercentage);
	   		postData.add("sessionID");
	 	   String usersessionID = (String)session.getAttribute("userSessionId");
	 	  postData.add(usersessionID);
	 	 postData.add("userId");
	 	String userName = (String)session.getAttribute("userId");
	 	postData.add(userName);
	 	
	   		String serverResponse = requestToAppServer(link,postData,client);
   	   	out.println(serverResponse);
   	   
      }  
    
    
   else if(requestOrigin.equals("futureGoals"))
   {
	   
 	    String link = "futureGoals";
 	    String userId = request.getParameter("userId");
	    	String classRoomNo = request.getParameter("classRoomNo");
	    	String goal = request.getParameter("goal");
   	 
	    	MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
			HttpClient client=(HttpClient)session.getAttribute("client"); 	    
 	    ArrayList<String> postData = new ArrayList<String>();
 	        
 	    postData.add("userId");
	   	 	postData.add(userId);
	   		postData.add("classRoomNo");
	   	 	postData.add(classRoomNo);
	   	 	postData.add("goal");
	   		postData.add(goal);
	   		postData.add("sessionID");
	 	   String usersessionID = (String)session.getAttribute("userSessionId");
	 	   postData.add(usersessionID);
	 	   	
	 	   	
	   	
	   		String serverResponse = requestToAppServer(link,postData,client);
 	   	out.println(serverResponse);
 	   
    }  
       
       
       
       
       
       
       
       
   else if(requestOrigin.equals("changeProPic"))
   {
	   
 	    String link = "changeProPic";
 	    String userId = request.getParameter("userId");
	    String fileString = request.getParameter("fileString");
	    
	    
	    /* String[] parts = fileString.split("\\,");
		
		String beforeFirstDot = parts[1]; 
		
	    	system.out.println() */
   	 
	    MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();    	    
		HttpClient client=(HttpClient)session.getAttribute("client"); 	    
 	    ArrayList<String> postData = new ArrayList<String>();
 	        
 	        postData.add("userId");
	   	 	postData.add(userId);
	   		postData.add("file");
	   	 	postData.add(fileString);
	   	 postData.add("sessionID");
	 	   String usersessionID = (String)session.getAttribute("userSessionId");
	 	   postData.add(usersessionID);
	   	 	

	   	String serverResponse = requestToAppServer(link,postData,client);
 	   	out.println(serverResponse);
 	   
    }  
    
     

%>
       
   	
   	

