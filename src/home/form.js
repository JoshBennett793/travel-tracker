import {
  openDropdownOnEnterKeyPress,
  renderAllDestinationOptions,
  setMinDateOption,
} from '../domManipulation';
import { calcTimeDifference, findIDByDestination } from '../model';

// Event Listeners

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

// Functions

export function packageFormDataForAPI(form, destinations) {
  const formData = new FormData(form);

  return [...formData.entries()].reduce((acc, input) => {
    switch (input[0]) {
      case 'destination':
        acc.destID = findIDByDestination(destinations, input[1]);
        break;
      case 'start-date':
        acc.startDate = input[1].replaceAll('-', '/');
        break;
      case 'end-date':
        acc.duration = calcTimeDifference(acc.startDate, input[1]);
        break;
      default:
        acc[input[0]] = input[1];
        break;
    }
    return acc;
  }, {});
}
