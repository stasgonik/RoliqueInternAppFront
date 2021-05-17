module.exports = {
	EMAIL_REGEXP: /^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]+$/,
	FIRST_LAST_NAME_REGEXP: /^[a-zA-Z ,.'-]{2,50}$/,
	PASSWORD_REGEXP: /^(?=.*[A-Za-z])(?=.*\d)([A-Za-z\d@$!%*#?&]?){4,50}/,
	PHONE_REGEXP: /^[\d+()-]*$/,
	FOLLOWERS_REGEXP: /^[\d]*$/,
	PROFILE_REGEXP: /^[a-zA-Z .-@]{2,50}$/,
};
