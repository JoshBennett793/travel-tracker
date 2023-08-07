import {
  InputValidator,
  handleFormKeyboardInput,
  renderAllDestinationOptions,
  setMinDateOption,
  validateDestinationInput,
} from '../domManipulation';
import { calcTimeDifference, findIDByDestination } from '../model';

// Query Selectors

const destinationInput = document.querySelector('#destination');

// Event Listeners

let inputValidator;

window.onload = () => {
  fetch('http://localhost:3001/api/v1/destinations')
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      }
    })
    .then(data => {
      inputValidator = new InputValidator(data.destinations);
      renderAllDestinationOptions(data.destinations);
      handleFormKeyboardInput();
      setMinDateOption();
      return data;
    })
    .then(data => {
      initDestinationInput(data.destinations);
    });
};

// Functions

function initDestinationInput(destinations) {
  destinationInput.onkeyup = e => {
    const inputValue = e.target.value;
    renderAllDestinationOptions(destinations);
    inputValidator.validateDestinationInput(inputValue);
  };
}

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
