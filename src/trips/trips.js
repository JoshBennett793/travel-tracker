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

export const dataStore = initDataStore();

export function setAndProcessData() {
  getAllAPIData()
    .then(values => {
      const [trips, destinations] = values;
      dataStore.setKey('trips', trips.trips);
      dataStore.setKey('destinations', destinations.destinations);
    })
    .then(() => {
      processData();
    });
}

function processData(criteria = 'pending') {
  console.log(criteria);
  const userID = userStore.getKey('currentUser').id;
  let tripData = aggregateTripData(criteria, userID);
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
      userID,
      dataStore.getKey('trips'),
      dataStore.getKey('destinations'),
      '2023',
    ),
  );
}

function aggregateTripData(filterCriteria, userID) {
  const trips = dataStore.getKey('trips');
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
