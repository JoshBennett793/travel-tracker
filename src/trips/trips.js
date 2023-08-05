import '../stylesheets/partials/trips/_trips-base.scss';

import { aggregateTripData } from '../model';
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
  displayFilteredTrips(tripData.filteredTrips);
  displaySelectedFilterOption('past');
};

filterBtns.forEach(btn => {
  btn.onclick = e => {
    let tripData = aggregateTripData(`${e.target.id}`);
    displayFilteredTrips(tripData.filteredTrips);
    displaySelectedFilterOption(`${e.target.id}`);
  };
});
