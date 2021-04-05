'use strict'
const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
	ApiConnector.login(data, loginFormCallback ());
}
