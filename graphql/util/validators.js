//client side validating login and register inputs
module.exports.validateRegisterInput = (
  username,
  password,
  brandLink,
  bio,
  pfp,
  email,
  confirmPassword
) => {
  const errors = {};

  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  } else if (username.length > 40) {
    errors.username = "Username must not exceed 40 characters";
  }
  if (brandLink.trim() === "") {
    errors.brandLink = "Brand Link must not be empty";
  }
  if(brandLink.indexOf("https://")<0){
    errors.brandLink1 = "Links must begin with the https:// prefix."
  }
  if (pfp.trim() === "") {
    errors.pfp = "Logo must not be empty";
  }
  if (bio.trim() === "") {
    errors.bio = "Description must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }
  if (password === "") {
    errors.password = "Password must not be empty";
  } else {
    if (!/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password)) {
      errors.password = "Password must contain 1 number, 1 upper and 1 lower case letter, 1 special character, and at least 6 total characters.";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords must match";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

function checkPassword(str) {
  var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  return re.test(str);
}

module.exports.validateLoginInput = (username, password) => {
  const errors = {};

  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }

  if (password === "") {
    errors.password = "Password must not be empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
