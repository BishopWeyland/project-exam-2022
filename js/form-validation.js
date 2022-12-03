export { checkLength, validateEmail };

//check length of inputs

function checkLength(value, length) {
  if (value.trim().length >= length) {
    return true;
  }
  return false;
}

// validate e-mail

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatch = regEx.test(email);
  return patternMatch;
}
