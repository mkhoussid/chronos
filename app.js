var timeout;
var error = false;
var inputField = null;
var errorMessage = null;
var generatedRows = null;
var errorBorderBottomColor = 'red';
var defaultBorderBottomColor = '#a8d483';

function onLoad() {
  errorMessage = document.getElementById('error');
  inputField = document.getElementById('input-field');
  generatedRows = document.getElementById('generated-rows');
}

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

function resetError() {
  error = false;
  errorMessage.innerHTML = null;
  inputField.style.borderBottomColor = defaultBorderBottomColor;
}

function setError(value) {
  inputField.style.borderBottomColor = errorBorderBottomColor;
  error = true;

  errorMessage.innerHTML = "The value '" + value + "' is not a positive integer.";
}

function handleOnChange(field) {
  var value = field.value;

  debounceRender(value);
}

function debounceRender(value) {
  clearTimeout(timeout);
  timeout = setTimeout(function () {
    if (generatedRows.innerHTML) {
      generatedRows.innerHTML = null;
    }
    if (error) {
      resetError();
    }
    if (value.length) {
      renderRows(value);
    }
  }, 500);
}

function renderRows(value) {
  var isValidInput = getIsValidInput(value);
  if (isValidInput) {
    var i = 0;
    for (i; i < value; i++) {
      var span = document.createElement('span');
      span.innerHTML = Math.floor(Math.random() * 10);
      if (i < value - 1) {
        span.innerHTML += ', ';
      }

      generatedRows.appendChild(span);
    }
  } else {
    if (!error) {
      setError(value);
    }
  }
}
