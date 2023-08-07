import { displayError } from './domManipulation';

export function getAPIData(url) {
  return fetch(url)
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      if (res.status >= 500) {
        throw new Error("There's been a network error: ");
      }
    })
    .then(data => data)
    .catch(err => console.log(err));
}

export function postFlightRequest(
  url,
  previousTripID,
  userID,
  destinationID,
  travelers,
  date,
  duration,
) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      id: previousTripID + 1,
      userID,
      destinationID,
      travelers,
      date,
      duration,
      status: 'pending',
      suggestedActivities: [],
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      }

      if (resp.status === 400) {
        throw new Error('There has been a user error');
      } else if (resp.status === 422 || resp.status === 404) {
        throw new Error(
          'The destination you wish to travel to is not within our travel network. Please select from our dropdown list of destinations.',
        );
      } else if (resp.status >= 500) {
        throw new Error(
          `There has been a network error: ${resp.status} ${resp.statusText}. Please refresh the page or try again later.`,
        );
      } else {
        throw new Error(
          `There has been an error: ${resp.status} ${resp.statusText}.`,
        );
      }
    })
    .then(data => data)
    .catch(err => {
      console.error(err);
      displayError(err);
    });
}
