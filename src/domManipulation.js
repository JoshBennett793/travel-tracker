import { findDestinationByID } from './model';
import { TripCard } from './trips/trips-card';

export function displayFilteredTrips(tripData) {
  const resultsEl = document.querySelector('.results-container');
  resultsEl.innerHTML = '';

  tripData.trips.forEach(trip => {
    const destination = findDestinationByID(
      tripData.destinations,
      trip.destinationID,
    );
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

export function displayTotalSpent(total) {
  const totalSpentEl = document.querySelector('.total-spent-value');
  totalSpentEl.innerText = total.toLocaleString('en-US');
}

// Trip Request Form Inputs

export function renderAllDestinationOptions(destinations) {
  const dropdownOpts = document.querySelector('.dropdown-options');
  dropdownOpts.innerHTML = '';
  destinations.forEach(dest => {
    dropdownOpts.appendChild(new FormOption(dest));

  });
}

function FormOption(destination) {
  const destOption = document.createElement('p');
  destOption.innerText = destination.destination;

  destOption.onclick = () => {
    const destInput = document.querySelector('input#destination');
    destInput.value = destOption.innerText;
  }

  return destOption;
}

// validate for if input is present in destinations array