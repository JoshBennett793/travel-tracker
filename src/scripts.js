import './stylesheets/index.scss';
import './header/header';

import { getAPIData } from './apiCalls';
import { getRandomTraveler } from './model';

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
  getAPIData('http://localhost:3001/api/v1/travelers').then(data => {
    userStore.setKey('currentUser', getRandomTraveler(data.travelers));
  });
}

export const userStore = initUserStore();
setAndProcessUserData();