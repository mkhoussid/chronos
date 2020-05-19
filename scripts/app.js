var timeout;
var error = false;
var inputField = null;
var errorMessage = null;
var generatedRows = null;
var palette = {
  error: 'red',
  primary: '#a8d483',
};

function onLoad() {
  errorMessage = document.getElementById('error');
  inputField = document.getElementById('input-field');
  generatedRows = document.getElementById('generated-rows');
}

function setError(value = null) {
  var message = null;
  if (value) {
    message = "The value '" + value + "' is not a positive integer.";
  }

  error = !!value;
  errorMessage.innerHTML = message;
  inputField.style.borderBottomColor = palette[value ? 'error' : 'primary'];
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
    setError(value);
  }
}

function debounceRender(value) {
  clearTimeout(timeout);
  timeout = setTimeout(function () {
    if (generatedRows.innerHTML) {
      generatedRows.innerHTML = null;
    }
    if (error) {
      setError();
    }
    if (value.length) {
      renderRows(value);
    }
  }, 500);
}

function handleOnChange(field) {
  var value = field.value;

  debounceRender(value);
}
