import './css/styles.css';

import { getAPIData } from './apiCalls';

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

export let store;

window.onload = () => {
  store = initStore();
  initApp();
};

export function initApp() {
  Promise.all([
    getAPIData(store.getAPIKey('travelers')),
    getAPIData(store.getAPIKey('trips')),
    getAPIData(store.getAPIKey('destinations')),
  ]).then(values => {
    console.log(values);
    const [travelers, trips, destinations] = values;
    store.setKey('travelers', travelers);
    store.setKey('trips', trips);
    store.setKey('destinations', destinations);
    console.log('travelers', travelers);
    console.log('trips', trips);
    console.log('destinations', destinations);
  });
}
