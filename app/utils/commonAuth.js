const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 2 * 60 * 60; // 2 hour in seconds

const getLoginAttemptsKey = (username) => `login_attempts:${username}`;

function generateOTP() {
  return crypto.randomInt(100000, 999999).toString();
}

function uppercaseCheck(password) {
  return /[A-Z]/.test(password); // At least one uppercase character
}

function lowercaseCheck(password) {
  return /[a-z]/.test(password); // At least one lowercase character
}

function digitCheck(password) {
  return /[0-9]/.test(password); // At least one digit
}

function specialCharacterCheck(password) {
  return /[!@#$%^&*(),.?":{}|<>]/.test(password); // At least one special character
}

function userInputPasswordCheck(password) {
  // At least 8 characters long with uppercase, lowercase, digit, and special character
  if (
    password.length >= 8 &&
    uppercaseCheck(password) &&
    lowercaseCheck(password) &&
    digitCheck(password) &&
    specialCharacterCheck(password)
  ) {
    return true;
  } else {
    return false;
  }
  /*
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }
  if (!uppercaseCheck(password)) {
    errors.push("Password must contain at least one uppercase letter.");
  }
  if (!lowercaseCheck(password)) {
    errors.push("Password must contain at least one lowercase letter.");
  }
  if (!digitCheck(password)) {
    errors.push("Password must contain at least one digit.");
  }
  if (!specialCharacterCheck(password)) {
    errors.push("Password must contain at least one special character.");
  }
    */
}

module.exports = {
  MAX_LOGIN_ATTEMPTS,
  LOCK_TIME,
  getLoginAttemptsKey,
};
