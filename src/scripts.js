import './stylesheets/index.scss';
import './header/header';

import { getAPIData } from './apiCalls';

// Query Selectors

// Nav
const navBtns = document.querySelectorAll('.site-nav-list-item');

// Event Listeners

navBtns.forEach(btn => {
  btn.onclick = e => {
    window.location.href = `${e.target.id}.html`;
  };
});

// Functions

function initUserStore() {
  const store = {};

  return {
    getKey(key) {
      return store[key];
    },

    setKey(key, value) {
      store[key] = value;
    },
  };
}

export function setAndProcessUserData() {
  const currentUserID = localStorage.getItem('currentUserID');
  getAPIData(`http://localhost:3001/api/v1/travelers/${currentUserID}`)
    .then(user => {
      userStore.setKey('currentUser', user);
      userStore.setKey('currentUserID', currentUserID);
    },
  );
}

export const userStore = initUserStore();
setAndProcessUserData();
