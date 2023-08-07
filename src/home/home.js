import { postFlightRequest } from '../apiCalls';
import { displayError, navigateToPending } from '../domManipulation';
import { getAllAPIData } from '../model';
import { userStore } from '../scripts';
import './form';
import { packageFormDataForAPI } from './form';

// Query Selectors

const requestForm = document.querySelector('#request-form');

// Event Listeners

requestForm.onsubmit = e => {
  e.preventDefault();

  getAllAPIData().then(apiData => {
    const [trips, destinations] = apiData;
    const requestData = packageFormDataForAPI(
      requestForm,
      destinations.destinations,
    );

    postFlightRequest(
      'http://localhost:3001/api/v1/trips',
      trips.trips[trips.trips.length - 1].id,
      userStore.getKey('currentUserID'),
      requestData.destID,
      requestData.pax,
      requestData.startDate,
      requestData.duration,
    )
      .then(resp => {
        console.log(resp);
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
  });
};
