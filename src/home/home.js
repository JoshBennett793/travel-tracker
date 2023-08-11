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
  confirmRequestWithUser();
};

function confirmRequestWithUser() {
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
      return { tripsData, requestData };
    })
    .then(data => {
      confirmBtn.onclick = () => {
        toggleConfirmationPage();
        processTripRequest(data.requestData, data.tripsData);
      };

      cancelBtn.onclick = () => {
        toggleConfirmationPage();
      };
    });
}

function processTripRequest(requestData, trips) {
  postFlightRequest(
    'https://travel-tracker-api-two.vercel.app/api/v1/trips',
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
