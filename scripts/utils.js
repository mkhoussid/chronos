function sanitizeInput(value) {
  return +value;
}

function getIsValidInput(value) {
  var startsWithValidNumber = !value.indexOf('0') == 0 && /^\d/.test(value);

  var sanitizedInput = sanitizeInput(value);

  var isInteger = typeof sanitizedInput == 'number' && sanitizedInput % 1 === 0;
  var isPositiveInteger = sanitizedInput > 0;

  return startsWithValidNumber && isInteger && isPositiveInteger && sanitizedInput;
}
