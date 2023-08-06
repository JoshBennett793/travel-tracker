import {
  openDropdownOnEnterKeyPress,
  renderAllDestinationOptions,
  setMinDateOption,
} from '../domManipulation';
import { calcTimeDifference, findIDByDestination } from '../model';

// Query Selectors

window.onload = () => {
  fetch('http://localhost:3001/api/v1/destinations')
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      }
    })
    .then(data => {
      renderAllDestinationOptions(data.destinations);
      openDropdownOnEnterKeyPress();
      setMinDateOption();
    });
};

export function packageFormDataForAPI(form) {
  const formData = new FormData(form);
  const formattedFormData = [...formData.entries()].reduce((acc, input) => {
    input[0] === 'end-date'
      ? (acc.duration = calcTimeDifference(input[1], acc['start-date']))
      : (acc[input[0]] = input[1]);

    return acc;
  }, {});
  console.log(formattedFormData);
  return formattedFormData;
}

// destID, pax, startdate, duration
