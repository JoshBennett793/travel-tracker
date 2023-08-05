import './stylesheets/index.scss';

import { getAPIData } from './apiCalls';
import { getRandomTraveler } from './model';

// Query Selectors

// Nav
const navBtns = document.querySelectorAll('.site-nav-list-item');


// Event Listeners

navBtns.forEach(btn => {
  btn.onclick = (e) => {
    window.location.href = `${e.target.id}.html`
  }
})

// Functions

function initStore() {
  const store = {
    apiKey: {
      base: 'http://localhost:3001/api/v1/',
      endpoints: {
        travelers: 'travelers',
        trips: 'trips',
        destinations: 'destinations',
      },
    },
  };

  return {
    getAPIKey(endpoint) {
      const ref = store.apiKey;
      return `${ref.base}${ref.endpoints[endpoint]}`;
    },

    getKey(key) {
      return store[key];
    },

    setKey(key, value) {
      store[key] = value;
    },
  };
}

export const store = initStore();
initApp();

export function initApp() {
  Promise.all([
    getAPIData(store.getAPIKey('travelers')),
    getAPIData(store.getAPIKey('trips')),
    getAPIData(store.getAPIKey('destinations')),
  ])
    .then(values => {
      const [travelers, trips, destinations] = values;
      store.setKey('travelers', travelers.travelers);
      store.setKey('trips', trips.trips);
      store.setKey('destinations', destinations.destinations);
      store.setKey('currentUser', getRandomTraveler(store.getKey('travelers')));
    })
}
