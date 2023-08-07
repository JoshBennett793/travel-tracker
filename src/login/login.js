import { validateLoginCredentials } from '../model';

// Query Selectors

const loginForm = document.querySelector('#login-form');

loginForm.onsubmit = e => {
  e.preventDefault();

  const formData = new FormData(loginForm);
  const loginData = [...formData.entries()].reduce((acc, input) => {
    acc[input[0]] = input[1];
    return acc;
  }, {});

  const loginIsValid = validateLoginCredentials(
    loginData.username,
    loginData.password
  );

  if (loginIsValid) {
    localStorage.setItem('currentUserID', loginData.username.slice(-2));
    console.log(localStorage.getItem('currentUserID'));
    window.location.href = 'home.html';
  }
};
