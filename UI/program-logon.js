 /**
  * @description signInFunc Function -- Captures and registers `submit` events.
  * @param {null} null Does not take any parameter
  * @returns {undefined} Opens the Order Page
  */
function signInFunc() {

  event.preventDefault(); // Prevents the 'Form' from attempting to submit inputs to a server

  let emailInput = document.querySelector('input[type="email"]').value;
  let passwordInput = document.querySelector('input[type="password"]').value;

  if ( passwordInput.length > 5 && emailInput.length > 6 ) { // Sets some Input string lengths conditions to open the Order Page
    location.assign("order.html"); // Opens the Order Page
  }

}


/**
 * @description signUpFunc Function -- Captures and registers `submit` events.
 * @param {null} null Does not take any parameter
 * @returns {undefined} Opens the Order Page
 */
function signUpFunc() {

  event.preventDefault(); // Prevents the 'Form' from attempting to submit inputs to a server

  let nameInput = document.querySelector('input[type="text"]').value;
  let emailInput = document.querySelector('input[type="email"]').value;
  let passwordInput = document.querySelector('input[type="password"]').value;

  if ( passwordInput.length > 5 && emailInput.length > 6 && nameInput.length > 0 ) { // Sets some Input string lengths conditions to open the Order Page
    location.assign("order.html"); // Opens the Order Page
  }

}
