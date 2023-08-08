import {
  calcTotalCostOfTrip,
  findDestinationByID,
  getDestinationNames,
} from './model';
import { TripCard } from './trips/trips-card';

export function displayFilteredTrips(tripData, criteria) {
  const resultsEl = document.querySelector('.results-container');
  resultsEl.innerHTML = '';

  tripData.trips.forEach(trip => {
    const destination = findDestinationByID(
      tripData.destinations,
      trip.destinationID,
    );
    resultsEl.appendChild(new TripCard(trip, destination, criteria));
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

/* -------------- Request Form Inputs -------------- */

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

/* -------------- Confirmation Page -------------- */

export function toggleConfirmationPage() {
  const confPage = document.querySelector('.confirmation-page-container');
  confPage.classList.toggle('collapsed');
}

export function populateConfirmationPageData(destinations, request) {
  const destination = findDestinationByID(destinations, request.destID);
  const figures = calcTotalCostOfTrip(request, destination);

  const tripTotal = document.querySelector('.trip-total');
  tripTotal.innerText = figures.total.toLocaleString('en-US');

  const destinationEl = document.querySelector('.destination-value');
  destinationEl.innerText = destination.destination;

  const flightCost = document.querySelector('.flight-cost');
  flightCost.innerText =
    destination.estimatedFlightCostPerPerson.toLocaleString('en-US');

  const flightCostTotal = document.querySelector('.flight-cost-total');
  flightCostTotal.innerText = figures.flightCost.toLocaleString('en-US');

  const livingExpenseCost = document.querySelector('.living-expense-cost');
  livingExpenseCost.innerText =
    destination.estimatedLodgingCostPerDay.toLocaleString('en-US');

  const pax = document.querySelector('.num-of-pax');
  pax.innerText = request.travelers;

  const livingExpenseTotal = document.querySelector('.living-expense-total');
  livingExpenseTotal.innerText = figures.lodgingCost.toLocaleString('en-US');

  const subTotal = document.querySelector('.subtotal');
  subTotal.innerText = figures.subTotal.toLocaleString('en-US');

  const agentFee = document.querySelector('.agent-fee-cost');
  agentFee.innerText = figures.agentFee.toLocaleString('en-US');

  const grandTotal = document.querySelector('.grand-total-cost');
  grandTotal.innerText = figures.total.toLocaleString('en-US');
}
