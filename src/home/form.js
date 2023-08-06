import { renderAllDestinationOptions } from '../domManipulation';

window.onload = () => {
  fetch('http://localhost:3001/api/v1/destinations')
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      }
    })
    .then(data => {
      renderAllDestinationOptions(data.destinations);
    });
};