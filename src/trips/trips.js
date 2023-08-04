import '../stylesheets/partials/trips/_trips-base.scss';

import { store } from '../scripts';
import { filterTrips } from '../model';
import {
  displayFilteredTrips,
  displaySelectedFilterOption,
} from '../domManipulation';

// Query Selectors

// Filter Btns

const filterBtns = document.querySelectorAll('.filter-btn');

// Event Listeners
window.onload = () => {
  let tripData = aggregateTripData('past');
  displayFilteredTrips(tripData);
  displaySelectedFilterOption('past');
};

filterBtns.forEach(btn => {
  btn.onclick = e => {
    let tripData = aggregateTripData(`${e.target.id}`);
    displayFilteredTrips(tripData);
    displaySelectedFilterOption(`${e.target.id}`);
  };
});

function aggregateTripData(filterCriteria) {
  const trips = store.getKey('trips');
  const userID = store.getKey('currentUser').id;
  const filteredTrips = filterTrips(trips, filterCriteria, userID);
  return {
    userID,
    filteredTrips,
  };
}
