var methods = {};

methods.validateEmail = function(mail) {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
		return (true);
	return (false);
}

methods.checkPassword = function(pass) {
	var regex=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
	if(pass.match(regex))
		return true;
	return false;
}

methods.registerValidation = function(data) {
	if (data.firstName.length < 2)
		return ("First name must be at least 2 characters long");
	else if (data.lastName.length < 0)
		return ("Last name must be at least 2 characters long");
	else if (data.username.length < 2 || data.username.length > 20)
		return ("Username must be between 2 and 20 characters");
	else if (data.email.length == 0)
		return ("Missing email");
	else if (data.password.length < 8)
		return ("Password must be at least 8 characters long");
	else if (!methods.validateEmail(data.email))
		return("Invalid email!");
	else if (!methods.checkPassword(data.password))
		return("Password not strong enough");
	return (1);
}

methods.generateOtp = () => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 10; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

exports.data = methods;
