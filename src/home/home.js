import { getAPIData, postFlightRequest } from '../apiCalls';
import { displayError, navigateToPending } from '../domManipulation';
import { getAllAPIData } from '../model';
import { userStore } from '../scripts';
import { setAndProcessData } from '../trips/trips';
import './form';
import { packageFormDataForAPI } from './form';

// Query Selectors

const requestForm = document.querySelector('#request-form');

requestForm.onsubmit = e => {
  e.preventDefault();

  getAllAPIData().then(apiData => {
    const [travelers, trips, destinations] = apiData;
    const requestData = packageFormDataForAPI(
      requestForm,
      destinations.destinations,
    );

    postFlightRequest(
      'http://localhost:3001/api/v1/trips',
      trips.trips[trips.trips.length - 1].id,
      userStore.getKey('currentUser').id,
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
          throw new Error('An error occurred during the POST request process.');
        }
      })
      .catch(err => {
        console.error(err);
      });
  });
};
