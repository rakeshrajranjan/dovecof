"use strict";
var validateEmail = function(email){
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	return emailReg.test(email);
}
$(document).ready(function(){
	$('.inner-contant').on('click','.download_btn', function(){
		var queryString = location.search.split('=');
		if(queryString[1] && validateEmail(queryString[1])){
			window.location.href = "/thanks.html?" + queryString[1];
		}else{
			$('.error').css('display','block');
		}
	});
});