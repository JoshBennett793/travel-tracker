import { findDestinationByID } from './model';
import { TripCard } from './trips/trips-card';

export function displayFilteredTrips(tripData) {
  const resultsEl = document.querySelector('.results-container');
  resultsEl.innerHTML = '';

  tripData.forEach(trip => {
    const destination = findDestinationByID(trip.destinationID);
    resultsEl.appendChild(new TripCard(trip, destination));
  });
}

export function displaySelectedFilterOption(criteria) {
  const btns = document.querySelectorAll('.filter-btn');

  btns.forEach(btn => {
    if (btn.id === criteria) {
      btn.classList.add('selected');
    } else {
      btn.classList.remove('selected');
    }
  });
}
