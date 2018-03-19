"use strict";
var validateEmail = function(email){
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	return emailReg.test(email);
}
var onloadCallback = function(){
	grecaptcha.render("gid",{
		'sitekey':'6LfVHAETAAAAAK5e91YdgFCgsVEjtVkQfPrbNxKS'
	});
}
$(document).ready(function(){
	$('.inner-contant').on('click','.download_btn', function(){
		var queryString = location.search.split('=');
		if(queryString[1] && validateEmail(queryString[1])){
			window.location.href = "thankyou.html?" + queryString[1];
		}else{
			$('.error').css('display','block');
		}
	});
});