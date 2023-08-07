import { displayError } from '../domManipulation';
import { validateLoginCredentials } from '../model';

// Query Selectors

const loginForm = document.querySelector('#login-form');

// Event Listeners

loginForm.onsubmit = e => {
  e.preventDefault();

  const formData = new FormData(loginForm);
  const loginData = [...formData.entries()].reduce((acc, input) => {
    acc[input[0]] = input[1];
    return acc;
  }, {});

  const loginIsValid = validateLoginCredentials(
    loginData.username,
    loginData.password,
  );

  if (loginIsValid) {
    localStorage.setItem('currentUserID', loginData.username.slice(8));
    window.location.href = 'home.html';
  } else {
    displayError(
      'Incorrect username or password. Please double-check and try again or reach out to josh@vantagejets.com for assistance.',
    );
  }
};
