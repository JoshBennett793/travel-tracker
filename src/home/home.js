import { postFlightRequest } from '../apiCalls';
import {
  displayError,
  navigateToPending,
  populateConfirmationPageData,
  toggleConfirmationPage,
} from '../domManipulation';
import { getAllAPIData } from '../model';
import { userStore } from '../scripts';
import './form';
import { packageFormDataForAPI } from './form';

// Query Selectors

const requestForm = document.querySelector('#request-form');

// Event Listeners

requestForm.onsubmit = e => {
  e.preventDefault();
  console.log('Submitting form...');
  confirmRequestWithUser();
};

function confirmRequestWithUser() {
  let trips;
  toggleConfirmationPage();

  const confirmBtn = document.querySelector('.confirm-trip-request');
  const cancelBtn = document.querySelector('.cancel-trip-request');

  getAllAPIData()
    .then(apiData => {
      const [tripsData, destinations] = apiData;
      const requestData = packageFormDataForAPI(
        requestForm,
        destinations.destinations,
      );
      populateConfirmationPageData(destinations.destinations, requestData);
      return {tripsData, requestData};
    })
    .then(data => {
      // Confirm Button Event Listener
      confirmBtn.onclick = () => {
        toggleConfirmationPage();
        console.log(data.tripsData);
        console.log(data.requestData);
        processTripRequest(data.requestData, data.tripsData);
      };

      // Cancel Button Event Listener
      cancelBtn.onclick = () => {
        toggleConfirmationPage();
      };
    });
}

function processTripRequest(requestData, trips) {
  console.log(trips);
  postFlightRequest(
    'http://localhost:3001/api/v1/trips',
    trips.trips[trips.trips.length - 1].id,
    userStore.getKey('currentUserID'),
    requestData.destID,
    requestData.travelers,
    requestData.startDate,
    requestData.duration,
  )
    .then(resp => {
      if (resp.message) {
        navigateToPending();
      } else {
        throw new Error(
          'The destination you wish to travel to is not within our travel network. Please select from our dropdown list of destinations.',
        );
      }
    })
    .catch(err => {
      console.error(err);
      displayError(err);
    });
}
