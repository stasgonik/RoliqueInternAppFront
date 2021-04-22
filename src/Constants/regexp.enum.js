module.exports = {
	EMAIL_REGEXP: new RegExp(/^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]+$/),
	PASSWORD_REGEXP: new RegExp(/^(?=.*[A-Za-z])(?=.*\d)([A-Za-z\d@$!%*#?&]?){4,50}/),
	PHONE_REGEXP: new RegExp(/^[\d+()-]*$/),
	FIRST_LAST_NAME_REGEXP: new RegExp(/^[a-zA-Z ,.'-]{2,50}$/)
};
