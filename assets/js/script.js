"use strict";
var validateEmail = function(email){
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	return emailReg.test(email);
}
var onloadCallback = function(){
	grecaptcha.render("welcome_recaptcha",{
		'sitekey':'6LfJGykTAAAAAFJDiX26rXA053VikR3zoIgUxfPo'
	});
}
var printCoupon = function(){
	var webPin = window.btoa($('#welcome_email').val());
	if(webPin.length > 50) webPin = webPin.substring(0,50);
	$("#welcome_form").append('<input type="hidden" name="webpin" value='+webPin+' />');

	var selectionCode= $('.download_btn').attr('data-selection-offercode');
	var brickEncryptionUrl = "https://campaignwidgetservices-uat.unileversolutions.com/dove_us_dakota_en_us/en-us/campaign/getcoupon/"+selectionCode+"/"+webPin;
	$.ajax({
		  url:brickEncryptionUrl,
		  type: "get", //send it through get method
		  
		  success: function(response) {
			//alert("CPT = "+response.CPT + " Check Code = " +response.CheckCode);
			window.location.href="http://bricks.coupons.com/enable.asp?o="+selectionCode+"&c="+response.CheckCode + "&p="+webPin+"&cpt=" + response.CPT;
		},
		error: function(xhr) {
		//Do Something to handle error
		}
	});
};
$(document).ready(function(){
	$('.inner-contant').on('click','.download_btn', function(){
		var email = $('#welcome_email').val();
		if(email!="" && validateEmail(email) ){	
			$('.email_req_error').css('display','none');
			$('.email_error').css('display','none');		
			var response = grecaptcha.getResponse();
			if (response.length == 0) {
				var destElementOffset =  window.innerHeight - $('.g-recaptcha').position().top;
				$('html, body').animate({ scrollTop: destElementOffset }, 100);
				$('.recaptcha_error').show();
				return false;
			}
			else {
				$('.recaptcha_error').hide();
				printCoupon();
				return false;
			}
		}else{
			if(!email){
				$('#welcome_email').focus();
				$('.email_req_error').css('display','block');
				$('.email_error').css('display','none');
			}else{
				$('#welcome_email').focus();
				$('.email_error').css('display','block');
				$('.email_req_error').css('display','none');
			}
			return false;
		}
	});
	
	
});