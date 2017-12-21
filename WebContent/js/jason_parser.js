function jason_parser(result)
{

	var obj = JSON.parse(JSON.stringify(result));
	

	
	var resultcode = obj['response'].resultcode;
	var message = obj['response'].message;
	
	
	if (resultcode == 0){
		console.log("Server Error Message is= " + message);
		return '0';
	}
	else if (resultcode == 1){
		console.log("Server Success Message is= " + message);
		return(obj);
		
	}
	else if(resultcode == 2){
		console.log("Server Exception Message is= " + message);
		return '0';
	}
}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
	//alert(origin);
//	if(origin.match('localUser')){
//		var lateObj = new lateStudent();
//		lateObj.loginLate();
//	}
	
	/*
	var resultcode = obj['response'].resultcode;
	//alert("ResultCode:" +resultcode);
	sessionStorage.setItem('lclResltCode', resultcode);
	
	var rebResponse = obj['response'].RebbonResponse;
	var rebId = rebResponse.RebbonId;
	
	if(rebId != '0'){
		ping_result();
	}
	sessionStorage.setItem('lclrebId', rebId);
	if(origin.match('localUser')){
		
		var lateObj = new lateStudent();
		lateObj.loginLate();
	}
	var message = obj['response'].message;
	
	if (resultcode == 0){
		console.log("Server Error Message is= " + message);
		WL.SimpleDialog.show("Failure", message, [{
            text: 'Ok'
        }]);
		return '0';
	}
	else if (resultcode == 1){
		console.log("Server Success Message is= " + message);
		var ClazResult = obj['response'].ClazResult;
		console.log(ClazResult);
		return(ClazResult);
		
	}
	else if(resultcode == 2){
		console.log("Server Exception Message is= " + message);
		return '0';
	}
}
    **/