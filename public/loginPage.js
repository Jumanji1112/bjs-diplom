'use strict'
const userForm = new UserForm();
userForm.loginFormCallback = (data) =>  ApiConnector.login (data, response => {
	if (response.success == false) {
	 userForm.setLoginErrorMessage(response.error); 
	}
	location.reload();
});


userForm.registerFormCallback = (data) => ApiConnector.register (data, response => {   
	if ( response.success == true) {
		location.reload();
	} else {
		userForm.setRegisterErrorMessage(response.error);
	}
});


