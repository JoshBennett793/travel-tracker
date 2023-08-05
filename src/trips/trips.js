import '../stylesheets/partials/trips/_trips-base.scss';

import { userStore } from '../scripts';
import { filterTrips } from '../model';
import { getAPIData } from '../apiCalls';
import {
  displayFilteredTrips,
  displaySelectedFilterOption,
} from '../domManipulation';

// Query Selectors

// Filter Btns

const filterBtns = document.querySelectorAll('.filter-btn');

function initDataStore() {
  const store = {
    apiKey: {
      base: 'http://localhost:3001/api/v1/',
      endpoints: {
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

export const dataStore = initDataStore();
setAndProcessData();

export function setAndProcessData() {
  Promise.all([
    getAPIData(dataStore.getAPIKey('trips')),
    getAPIData(dataStore.getAPIKey('destinations')),
  ]).then(values => {
    const [trips, destinations] = values;
    dataStore.setKey('trips', trips.trips);
    dataStore.setKey('destinations', destinations.destinations);
  });
}

// Event Listeners
window.addEventListener('load', () => {
  let tripData = aggregateTripData('past');
  displayFilteredTrips({
    trips: tripData.filteredTrips,
    destinations: dataStore.getKey('destinations'),
  });
  displaySelectedFilterOption('past');

  filterBtns.forEach(btn => {
    btn.onclick = e => {
      tripData = aggregateTripData(`${e.target.id}`);
      displayFilteredTrips({
        trips: tripData.filteredTrips,
        destinations: dataStore.getKey('destinations'),
      });
      displaySelectedFilterOption(`${e.target.id}`);
    };
  });
});

function aggregateTripData(filterCriteria) {
  const trips = dataStore.getKey('trips');
  const userID = userStore.getKey('currentUser').id;
  const filteredTrips = filterTrips(trips, filterCriteria, userID);
  return {
    userID,
    filteredTrips,
  };
}
