module.exports = {
	EMAIL_REGEXP: /^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]+$/,
	FIRST_LAST_NAME_REGEXP: /^[a-zA-Z ,.'-]{2,50}$/,
	PASSWORD_REGEXP: /^(?=.*[A-Za-z])(?=.*\d)([A-Za-z\d@$!%*#?&]?){4,50}/,
	PHONE_REGEXP: /^[\d+()-]{7,15}$/,
	FOLLOWERS_REGEXP: /^[\d]{1,15}$/,
	PROFILE_REGEXP: /^[a-zA-Z .-@_]{2,50}$/,
};
