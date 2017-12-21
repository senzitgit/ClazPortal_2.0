<%@ page import ="java.sql.*" %>
<%@ page import ="org.json.*" %>
<%@ page import ="java.io.*"%>
<%@ page import ="java.util.*"%>
<%@ page import="java.io.File" %>
<%@ page import="org.apache.commons.fileupload.servlet.ServletFileUpload"%>
<%@ page import="org.apache.commons.fileupload.disk.DiskFileItemFactory"%>
<%@ page import="org.apache.commons.fileupload.*"%>
<%@ page import ="java.io.File"%>


<%@ page import="java.net.*, java.io.*, java.util.*,org.json.*,
					org.apache.commons.httpclient.HttpClient,
					org.apache.commons.httpclient.methods.PostMethod,
					org.apache.commons.httpclient.HttpStatus" %>  


<%@ page import ="org.apache.commons.httpclient.methods.multipart.FilePart"%>
<%@ page import ="org.apache.commons.httpclient.methods.multipart.StringPart"%>
<%@ page import ="org.apache.commons.httpclient.methods.multipart.MultipartRequestEntity"%>
<%@ page import ="org.apache.commons.httpclient.methods.multipart.Part"%>


<%@ page import ="org.apache.http.entity.mime.content.FileBody"%>
<%@ page import ="org.apache.http.entity.mime.content.StringBody"%>
<%@ page import ="org.apache.http.entity.mime.content.ByteArrayBody"%>
<%@ page import ="java.net.*"%>









<%  
String userName =session.getAttribute("userName").toString();


System.out.println(userName);
String AttachmentName = "";
String AttachmentDesc = "";	


			
			boolean isMultipart = ServletFileUpload.isMultipartContent(request);
			if (!isMultipart) {
				
				
				
			} else {
			FileItemFactory factory = new DiskFileItemFactory();
			ServletFileUpload upload = new ServletFileUpload(factory);
			List items = null;
			try {
			items = upload.parseRequest(request);
			} catch (FileUploadException e) {
			e.printStackTrace();
			}
			Iterator itr = items.iterator();
			while (itr.hasNext()) {
			FileItem item = (FileItem) itr.next();
			if (item.isFormField()) {
				 String name = item.getFieldName();
				  String value = item.getString();
				  if(name.equals("atta_name"))
			           {
					  AttachmentName=value;
		            		 
					   }
					  if(name.equals("atta_desc"))
			                  {
						  AttachmentDesc=value;            		 
		                       }
			
			} else {
			try {
			String itemName = item.getName();
			
			
			System.out.println(AttachmentName);
			System.out.println(AttachmentDesc);		
			
			

			String root = getServletContext().getRealPath("/");
            File path = new File(root + "/uploads");
            if (!path.exists()) {
                boolean status = path.mkdirs();
            }
            System.err.println(path + "/" + itemName);
            File uploadedFile = new File(path + "/" + itemName);
            item.write(uploadedFile);
			
			HttpClient httpClient = (HttpClient)session.getAttribute("client"); 
			PostMethod postMethod = new PostMethod("http://192.168.0.117:8080/CyberClazServer/cyberclaz/uploadAttachmentViaPortal"); 
			
		
		 	   String usersessionID = (String)session.getAttribute("userSessionId");
		 	 
			    
			try
			{

				File fileToUpload = new File(path + "/" + itemName);
				
				Part[] parts = {
						  new StringPart("userId",userName),
					      new StringPart("attName",AttachmentName),
					      new StringPart("attDescription",AttachmentDesc),
					      new StringPart("sessionID",usersessionID),
					      new FilePart("fileName", fileToUpload)
						  
						  
					  };
				
				postMethod.setRequestEntity(new MultipartRequestEntity(parts, postMethod.getParams()));
				httpClient.executeMethod(postMethod);
				System.out.println("ClazPortal Web Server : "+postMethod.getResponseBodyAsString());
				out.println(postMethod.getResponseBodyAsString());
			}catch (Exception e) {
				        System.err.println(e);
				      } finally
						{
							postMethod.releaseConnection();
						}
			
			} catch (Exception e) {
			e.printStackTrace();
			}
			}
			}
			}
%>


