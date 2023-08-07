import '../stylesheets/partials/trips/_trips-base.scss';

import { userStore } from '../scripts';
import { calcTotalSpentByYear, filterTrips, getAllAPIData } from '../model';
import {
  displayFilteredTrips,
  displaySelectedFilterOption,
  displayTotalSpent,
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

export function setAndProcessData() {
  getAllAPIData()
    .then(values => {
      const [travelers, trips, destinations] = values;
      dataStore.setKey('trips', trips.trips);
      dataStore.setKey('destinations', destinations.destinations);
    })
    .then(() => {
      processData();
    });
}

function processData(criteria = 'pending') {
  let tripData = aggregateTripData(criteria);
  displayFilteredTrips(
    {
      trips: tripData.filteredTrips,
      destinations: dataStore.getKey('destinations'),
    },
    criteria,
  );
  displaySelectedFilterOption(criteria);
  displayTotalSpent(
    calcTotalSpentByYear(
      userStore.getKey('currentUser').id,
      dataStore.getKey('trips'),
      dataStore.getKey('destinations'),
      '2023',
    ),
  );
}

function aggregateTripData(filterCriteria) {
  const trips = dataStore.getKey('trips');
  const userID = userStore.getKey('currentUser').id;
  const filteredTrips = filterTrips(trips, filterCriteria, userID);
  return {
    userID,
    filteredTrips,
  };
}

// Event Listeners
window.addEventListener('load', () => {
  setAndProcessData();

  filterBtns.forEach(btn => {
    btn.onclick = e => {
      processData(e.target.id);
    };
  });
});
