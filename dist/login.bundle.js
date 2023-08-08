/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 10:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAPIData: () => (/* binding */ getAPIData),
/* harmony export */   postFlightRequest: () => (/* binding */ postFlightRequest)
/* harmony export */ });
function getAPIData(url) {
  return fetch(url)
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      if (res.status >= 500) {
        throw new Error("There's been a network error: ");
      }
    })
    .then(data => data)
    .catch(err => console.log(err));
}

function postFlightRequest(
  url,
  previousTripID,
  userID,
  destinationID,
  travelers,
  date,
  duration,
) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      id: previousTripID + 1,
      userID,
      destinationID,
      travelers,
      date,
      duration,
      status: 'pending',
      suggestedActivities: [],
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      }

      if (resp.status === 400) {
        throw new Error('There has been a user error.');
      } else if (resp.status === 422 || resp.status === 404) {
        throw new Error(
          'The POST request is missing some information.',
        );
      } else if (resp.status >= 500) {
        throw new Error(
          `There has been a network error: ${resp.status} ${resp.statusText}. Please refresh the page or try again later.`,
        );
      } else {
        throw new Error(
          `There has been an error: ${resp.status} ${resp.statusText}.`,
        );
      }
    })
    .then(data => data)
    .catch(err => {
      console.error(err);
    });
}


/***/ }),

/***/ 15:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputValidator: () => (/* binding */ InputValidator),
/* harmony export */   displayError: () => (/* binding */ displayError),
/* harmony export */   displayFilteredTrips: () => (/* binding */ displayFilteredTrips),
/* harmony export */   displaySelectedFilterOption: () => (/* binding */ displaySelectedFilterOption),
/* harmony export */   displayTotalSpent: () => (/* binding */ displayTotalSpent),
/* harmony export */   handleFormKeyboardInput: () => (/* binding */ handleFormKeyboardInput),
/* harmony export */   navigateToPending: () => (/* binding */ navigateToPending),
/* harmony export */   populateConfirmationPageData: () => (/* binding */ populateConfirmationPageData),
/* harmony export */   renderAllDestinationOptions: () => (/* binding */ renderAllDestinationOptions),
/* harmony export */   setMinDateOption: () => (/* binding */ setMinDateOption),
/* harmony export */   toggleConfirmationPage: () => (/* binding */ toggleConfirmationPage)
/* harmony export */ });
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _trips_trips_card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);



function displayFilteredTrips(tripData, criteria) {
  const resultsEl = document.querySelector('.results-container');
  resultsEl.innerHTML = '';

  tripData.trips.forEach(trip => {
    const destination = (0,_model__WEBPACK_IMPORTED_MODULE_0__.findDestinationByID)(
      tripData.destinations,
      trip.destinationID,
    );
    resultsEl.appendChild(new _trips_trips_card__WEBPACK_IMPORTED_MODULE_1__.TripCard(trip, destination, criteria));
  });
}

function displaySelectedFilterOption(criteria) {
  const btns = document.querySelectorAll('.filter-btn');

  btns.forEach(btn => {
    if (btn.id === criteria) {
      btn.classList.add('selected');
    } else {
      btn.classList.remove('selected');
    }
  });
}

function displayTotalSpent(total) {
  const totalSpentContainer = document.querySelector('.total-spent');
  const totalSpentEl = document.querySelector('.total-spent-value');
  totalSpentEl.innerText = total.toLocaleString('en-US');
  totalSpentContainer.setAttribute('tabindex', 0);
}

/* -------------- Request Form Inputs -------------- */

const requestFormDestinationInput = document.querySelector('#destination');
const dropdownOpts = document.querySelector('.dropdown-options');
const dateInputs = document.querySelectorAll('input[type="date"]');

function renderAllDestinationOptions(destinations) {
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
function handleFormKeyboardInput() {
  requestFormDestinationInput.onkeypress = e => {
    e.preventDefault();
    if (e.key === 'Enter' || e.keyCode === 13) {
      dropdownOpts.style.display = 'block';
    } else {
      requestFormDestinationInput.value += e.key;
    }
  };
}

function setMinDateOption() {
  dateInputs.forEach(input => {
    input.min = new Date().toISOString().split('T')[0];
  });
}

function displayError(err) {
  const errMsg = document.querySelector('.error-message');
  errMsg.innerText = err;
}

function InputValidator(destinations) {
  const destinationNames = (0,_model__WEBPACK_IMPORTED_MODULE_0__.getDestinationNames)(destinations);

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

function navigateToPending() {
  window.location.href = 'trips.html';
}

/* -------------- Confirmation Page -------------- */

function toggleConfirmationPage() {
  const confPage = document.querySelector('.confirmation-page-container');
  confPage.classList.toggle('collapsed');
}

function populateConfirmationPageData(destinations, request) {
  const destination = (0,_model__WEBPACK_IMPORTED_MODULE_0__.findDestinationByID)(destinations, request.destID);
  const figures = (0,_model__WEBPACK_IMPORTED_MODULE_0__.calcTotalCostOfTrip)(request, destination);

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


/***/ }),

/***/ 11:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calcTimeDifference: () => (/* binding */ calcTimeDifference),
/* harmony export */   calcTotalCostOfTrip: () => (/* binding */ calcTotalCostOfTrip),
/* harmony export */   calcTotalSpentByYear: () => (/* binding */ calcTotalSpentByYear),
/* harmony export */   filterTrips: () => (/* binding */ filterTrips),
/* harmony export */   findDestinationByID: () => (/* binding */ findDestinationByID),
/* harmony export */   findIDByDestination: () => (/* binding */ findIDByDestination),
/* harmony export */   getAllAPIData: () => (/* binding */ getAllAPIData),
/* harmony export */   getDestinationNames: () => (/* binding */ getDestinationNames),
/* harmony export */   validateLoginCredentials: () => (/* binding */ validateLoginCredentials)
/* harmony export */ });
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);


/* -------------- Trips -------------- */

function filterTrips(tripData, criteria, travelerID, year = '2023') {
  const date = new Date();
  const yyyy = date.toLocaleString('default', { year: 'numeric' });
  const mm = date.toLocaleString('default', { month: '2-digit' });
  const dd = date.toLocaleString('default', { day: '2-digit' });
  const currentDate = `${yyyy}/${mm}/${dd}`;

  tripData = tripData.filter(trip => trip.userID === travelerID);

  switch (criteria) {
    case 'byYear':
      return tripData.filter(trip => trip.date.slice(0, 4) === year);
    case 'past':
      return tripData.filter(
        trip => trip.date < currentDate && trip.status !== 'pending',
      );
    case 'upcoming':
      return tripData.filter(
        trip => trip.date > currentDate && trip.status === 'approved',
      );
    case 'pending':
      return tripData.filter(trip => trip.status === 'pending');
    default:
      return tripData;
  }
}

function findDestinationByID(destinations, destID) {
  return destinations.find(dest => dest.id === destID);
}

function findIDByDestination(destinations, destName) {
  const destinationNames = getDestinationNames(destinations);
  if (!destinationNames.includes(destName)) {
    return false;
  }

  return destinations.find(dest => dest.destination === destName).id;
}

function getDestinationNames(destinations) {
  return destinations.map(({ destination }) => destination);
}

/* -------------- Generic Fetch Call -------------- */
function getAllAPIData() {
  return Promise.all([
    (0,_apiCalls__WEBPACK_IMPORTED_MODULE_0__.getAPIData)('http://localhost:3001/api/v1/trips'),
    (0,_apiCalls__WEBPACK_IMPORTED_MODULE_0__.getAPIData)('http://localhost:3001/api/v1/destinations'),
  ]).then(values => values);
}

/* -------------- Calculation -------------- */

function calcTotalSpentByYear(userID, trips, destinations, year) {
  return filterTrips(trips, 'byYear', userID, year).reduce((acc, trip) => {
    const destination = findDestinationByID(destinations, trip.destinationID);
    const total = calcTotalCostOfTrip(trip, destination);

    acc += total.total;

    return acc;
  }, 0);
}

function calcTotalCostOfTrip(trip, destination) {
  const flightCost =
    trip.travelers * (destination.estimatedFlightCostPerPerson * 2);

  const lodgingCost =
    trip.duration * destination.estimatedLodgingCostPerDay * trip.travelers;
  const subTotal = flightCost + lodgingCost;
  const agentFee = subTotal * 0.1;
  const total = subTotal + agentFee;

  return {
    flightCost,
    lodgingCost,
    subTotal,
    agentFee,
    total,
  }; // this is going to break the test
}

function calcTimeDifference(date1, date2) {
  // Dates are passed in in the format yyyy-mm-dd
  const splitDate1 = date1.split('-');
  const splitDate2 = date2.split('-');
  // Date object needs date format to be mm/dd/yyyy
  date1 = new Date(`${splitDate1[1]}/${splitDate1[2]}/${splitDate1[0]}`);
  date2 = new Date(`${splitDate2[1]}/${splitDate2[2]}/${splitDate2[0]}`);

  const diffInMs = Math.abs(date1 - date2);

  return diffInMs / (1000 * 60 * 60 * 24);
}

/* -------------- Login -------------- */

function validateLoginCredentials(username, password) {
  const regex = '^traveler(?:[1-9]|[1-4][0-9]|50)$';
  return username.match(regex) && password === 'travel';
}


/***/ }),

/***/ 16:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TripCard: () => (/* binding */ TripCard)
/* harmony export */ });
function TripCard(trip, destination, criteria) {
  const card = document.createElement('article');
  card.id = trip.id;
  card.classList.add('trip-card');
  card.setAttribute('tabindex', 0);

  const imgContainer = document.createElement('div');
  imgContainer.classList.add('img-container');
  card.appendChild(imgContainer);

  const destinationImg = document.createElement('img');
  destinationImg.src = destination.image;
  destinationImg.alt = destination.alt;
  imgContainer.appendChild(destinationImg);
  destinationImg.setAttribute('tabindex', 0);

  const dataContainer = document.createElement('div');
  dataContainer.classList.add('card-data-container');
  card.appendChild(dataContainer);

  const destinationTitle = document.createElement('h2');
  destinationTitle.innerText = destination.destination;
  dataContainer.appendChild(destinationTitle);
  destinationTitle.setAttribute('tabindex', 0);

  const lastVisitDate = document.createElement('p');

  lastVisitDate.innerText = `Trip date: ${trip.date}`;

  dataContainer.appendChild(lastVisitDate);
  lastVisitDate.setAttribute('tabindex', 0);

  if (criteria !== 'past') {
    const status = document.createElement('p');
    status.innerText = `Status: ${trip.status}`;
    dataContainer.appendChild(status);
  }

  return card;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _domManipulation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);



// Query Selectors

const loginForm = document.querySelector('#login-form');

// Event Listeners

loginForm.onsubmit = e => {
  e.preventDefault();

  const formData = new FormData(loginForm);
  const loginData = [...formData.entries()].reduce((acc, input) => {
    acc[input[0]] = input[1];
    return acc;
  }, {});

  const loginIsValid = (0,_model__WEBPACK_IMPORTED_MODULE_1__.validateLoginCredentials)(
    loginData.username,
    loginData.password,
  );

  if (loginIsValid) {
    localStorage.setItem('currentUserID', loginData.username.slice(8));
    window.location.href = 'home.html';
  } else {
    (0,_domManipulation__WEBPACK_IMPORTED_MODULE_0__.displayError)(
      'Incorrect username or password. Please double-check and try again or reach out to josh@vantagejets.com for assistance.',
    );
  }
};

})();

/******/ })()
;
//# sourceMappingURL=login.bundle.js.map