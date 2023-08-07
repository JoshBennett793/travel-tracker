import { findDestinationByID, getDestinationNames } from './model';
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
  const totalSpentContainer = document.querySelector('.total-spent');
  const totalSpentEl = document.querySelector('.total-spent-value');
  totalSpentEl.innerText = total.toLocaleString('en-US');
  totalSpentContainer.setAttribute('tabindex', 0);
}

// Trip Request Form Inputs
const requestFormDestinationInput = document.querySelector('#destination');
const dropdownOpts = document.querySelector('.dropdown-options');
const dateInputs = document.querySelectorAll('input[type="date"]');

export function renderAllDestinationOptions(destinations) {
  dropdownOpts.innerHTML = '';
  if (requestFormDestinationInput.value) {
    destinations = destinations.filter(dest =>
      dest.destination.includes(requestFormDestinationInput.value),
    );
  }

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
export function handleFormKeyboardInput() {
  requestFormDestinationInput.onkeypress = e => {
    e.preventDefault();
    if (e.key === 'Enter' || e.keyCode === 13) {
      dropdownOpts.style.display = 'block';
    } else {
      requestFormDestinationInput.value += e.key;
    }
  };
}

export function setMinDateOption() {
  dateInputs.forEach(input => {
    input.min = new Date().toISOString().split('T')[0];
  });
}

export function displayError(err) {
  const errMsg = document.querySelector('.error-message');
  errMsg.innerText = err;
}

// validate for if input is present in destinations array

// export function validateDestinationInput(destinations, value) {
//   const destinationNames = getDestinationNames(destinations);
//   if (
//     destinationNames.includes(dest =>
//       dest.every(letter => letter === value[dest.indexOf(letter)]),
//     )
//   ) {
//     console.log("it's valid");
//     requestFormDestinationInput.setCustomValidity('Valid field.');
//   } else {
//     console.log("it's invalid");
//     requestFormDestinationInput.setCustomValidity('Invalid field.');
//     console.log('valid? ', requestFormDestinationInput.validity.valid);
//   }
// }

export function InputValidator(destinations) {
  const destinationNames = getDestinationNames(destinations);

  return {
    validateDestinationInput(value) {
      if (destinationNames.includes(value)) {
        // set field to valid
        requestFormDestinationInput.setCustomValidity('');
      } else {
        // set field to invalid
        requestFormDestinationInput.setCustomValidity('Invalid field.');
      }
    },
  };
}

export function navigateToPending() {
  window.location.href = 'trips.html';
}
