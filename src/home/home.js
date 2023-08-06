import { getAPIData, postFlightRequest } from '../apiCalls';
import { getAllAPIData } from '../model';
import { userStore } from '../scripts';
import './form';
import { packageFormDataForAPI } from './form';

// Query Selectors

const requestForm = document.querySelector('#request-form');

requestForm.onsubmit = e => {
  e.preventDefault();

  const requestData = packageFormDataForAPI(requestForm);
  console.log(requestData);
  getAllAPIData().then(apiData => {
    const [travelers, trips, destinations] = apiData;
    postFlightRequest(
      'http://localhost:3001/api/v1/trips',
      trips[trips.length - 1].destinationID,
      userStore.getKey('currentUser').id,
      requestData.destID,
      requestData.pax,
      requestData.startDate,
      requestData.duration,
    );
  });
};

// separate out logic that can just be in scripts for fetch get call,
// in own files, chain then on and do unique functionality
// this function above needs both trips and destionations api so might
// as well have the fetch call in scripts
