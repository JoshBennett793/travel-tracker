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
const requestFormDestinationInput = document.querySelector('#destination');
const dropdownOpts = document.querySelector('.dropdown-options');
const dateInputs = document.querySelectorAll('input[type="date"]')

export function renderAllDestinationOptions(destinations) {
  dropdownOpts.innerHTML = '';
  destinations.forEach(dest => {
    dropdownOpts.appendChild(new FormOption(dest));
  });
}

function FormOption(destination) {
  const destOption = document.createElement('p');
  destOption.innerText = destination.destination;
  destOption.setAttribute('tabindex', 0);

  destOption.onclick = () => {
    requestFormDestinationInput.value = destOption.innerText;
  };

  destOption.onkeypress = e => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      e.target.click();
      dateInputs[0].focus();
      dropdownOpts.style.display = 'none';
    }
  };

  return destOption;
}
export function openDropdownOnEnterKeyPress() {
  requestFormDestinationInput.onkeypress = e => {
    e.preventDefault();
    if (e.key === 'Enter' || e.keyCode === 13) {
      dropdownOpts.style.display = 'block';
    }
  };
}

export function setMinDateOption() {
  dateInputs.forEach(input => {
    input.min = new Date().toISOString().split('T')[0];
  })
}

// validate for if input is present in destinations array
