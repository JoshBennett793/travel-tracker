/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 17:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   displayFilteredTrips: () => (/* binding */ displayFilteredTrips),
/* harmony export */   displaySelectedFilterOption: () => (/* binding */ displaySelectedFilterOption),
/* harmony export */   displayTotalSpent: () => (/* binding */ displayTotalSpent),
/* harmony export */   renderAllDestinationOptions: () => (/* binding */ renderAllDestinationOptions)
/* harmony export */ });
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _trips_trips_card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);



function displayFilteredTrips(tripData) {
  const resultsEl = document.querySelector('.results-container');
  resultsEl.innerHTML = '';

  tripData.trips.forEach(trip => {
    const destination = (0,_model__WEBPACK_IMPORTED_MODULE_0__.findDestinationByID)(
      tripData.destinations,
      trip.destinationID,
    );
    resultsEl.appendChild(new _trips_trips_card__WEBPACK_IMPORTED_MODULE_1__.TripCard(trip, destination));
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
  const totalSpentEl = document.querySelector('.total-spent-value');
  totalSpentEl.innerText = total.toLocaleString('en-US');
}

// Trip Request Form Inputs

function renderAllDestinationOptions(destinations) {
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

/***/ }),

/***/ 19:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _domManipulation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);


window.onload = () => {
  fetch('http://localhost:3001/api/v1/destinations')
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      }
    })
    .then(data => {
      (0,_domManipulation__WEBPACK_IMPORTED_MODULE_0__.renderAllDestinationOptions)(data.destinations);
    });
};

/***/ }),

/***/ 10:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calcTotalCostOfTrip: () => (/* binding */ calcTotalCostOfTrip),
/* harmony export */   calcTotalSpentByYear: () => (/* binding */ calcTotalSpentByYear),
/* harmony export */   filterTrips: () => (/* binding */ filterTrips),
/* harmony export */   findDestinationByID: () => (/* binding */ findDestinationByID),
/* harmony export */   getRandomTraveler: () => (/* binding */ getRandomTraveler)
/* harmony export */ });
/* -------------- Util -------------- */

function filterTrips(tripData, criteria, travelerID, year = '2023') {
  const date = new Date();
  const yyyy = date.toLocaleString('default', { year: 'numeric' });
  const mm = date.toLocaleString('default', { month: '2-digit' });
  const dd = date.toLocaleString('default', { day: '2-digit' });
  const currentDate = `${yyyy}/${mm}/${dd}`;

  tripData = tripData.filter(trip => trip.userID === travelerID);

  switch (criteria) {
    case 'byYear':
      return tripData.filter(
        trip => trip.date.slice(0, 4) === year && trip.status !== 'pending',
      );
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

/* -------------- Travelers -------------- */

function getRandomTraveler(travelers) {
  return travelers[Math.floor(Math.random() * travelers.length)];
}

/* -------------- Calculation -------------- */

function calcTotalSpentByYear(userID, trips, destinations, year) {
  return filterTrips(trips, 'byYear', userID, year).reduce((acc, trip) => {
    const destination = findDestinationByID(destinations, trip.destinationID);
    const total = calcTotalCostOfTrip(trip, destination);

    acc += total;

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

  return subTotal + agentFee;
}

/* -------------- Trips -------------- */

function findDestinationByID(destinations, destID) {
  return destinations.find(dest => dest.id === destID);
}


/***/ }),

/***/ 18:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TripCard: () => (/* binding */ TripCard)
/* harmony export */ });
function TripCard(trip, destination) {
  const card = document.createElement('article');
  card.id = trip.id;
  card.classList.add('trip-card');

  const imgContainer = document.createElement('div');
  imgContainer.classList.add('img-container');
  card.appendChild(imgContainer);

  const destinationImg = document.createElement('img');
  destinationImg.src = destination.image;
  destinationImg.alt = destination.alt;
  imgContainer.appendChild(destinationImg);

  const dataContainer = document.createElement('div');
  dataContainer.classList.add('card-data-container');
  card.appendChild(dataContainer);
  
  const destinationTitle = document.createElement('h2');
  destinationTitle.innerText = destination.destination;
  dataContainer.appendChild(destinationTitle);

  const lastVisitDate = document.createElement('p');
  lastVisitDate.innerText = `Last visited: ${trip.date}`;
  dataContainer.append(lastVisitDate);
  
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
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);


})();

/******/ })()
;
//# sourceMappingURL=home.bundle.js.map