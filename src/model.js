import { getAPIData } from './apiCalls';

/* -------------- Util -------------- */

export function filterTrips(tripData, criteria, travelerID, year = '2023') {
  const date = new Date();
  const yyyy = date.toLocaleString('default', { year: 'numeric' });
  const mm = date.toLocaleString('default', { month: '2-digit' });
  const dd = date.toLocaleString('default', { day: '2-digit' });
  const currentDate = `${yyyy}/${mm}/${dd}`;

  tripData = tripData.filter(trip => trip.userID === travelerID);

  switch (criteria) {
    case 'byYear':
      return tripData.filter(
        trip => trip.date.slice(0, 4) === year && trip.status !== 'pending',
      );
    case 'past':
      return tripData.filter(
        trip => trip.date < currentDate && trip.status !== 'pending',
      );
    case 'upcoming':
      return tripData.filter(
        trip => trip.date > currentDate && trip.status === 'approved',
      );
    case 'pending':
      return tripData.filter(trip => trip.status === 'pending');
    default:
      return tripData;
  }
}

/* -------------- Generic Fetch Call -------------- */
export function getAllAPIData() {
  return Promise.all([
    getAPIData('http://localhost:3001/api/v1/travelers'),
    getAPIData('http://localhost:3001/api/v1/trips'),
    getAPIData('http://localhost:3001/api/v1/destinations'),
  ]).then(values => values);
}

/* -------------- Travelers -------------- */

export function getRandomTraveler(travelers) {
  return travelers[Math.floor(Math.random() * travelers.length)];
}

/* -------------- Calculation -------------- */

export function calcTotalSpentByYear(userID, trips, destinations, year) {
  return filterTrips(trips, 'byYear', userID, year).reduce((acc, trip) => {
    const destination = findDestinationByID(destinations, trip.destinationID);
    const total = calcTotalCostOfTrip(trip, destination);

    acc += total;

    return acc;
  }, 0);
}

export function calcTotalCostOfTrip(trip, destination) {
  const flightCost =
    trip.travelers * (destination.estimatedFlightCostPerPerson * 2);

  const lodgingCost =
    trip.duration * destination.estimatedLodgingCostPerDay * trip.travelers;
  const subTotal = flightCost + lodgingCost;
  const agentFee = subTotal * 0.1;

  return subTotal + agentFee;
}

export function calcTimeDifference(date1, date2) {
  const splitDate1 = date1.split('-');
  const splitDate2 = date2.split('-');
  date1 = new Date(`${splitDate1[1]}/${splitDate1[2]}/${splitDate1[0]}`);
  date2 = new Date(`${splitDate2[1]}/${splitDate2[2]}/${splitDate2[0]}`);

  const diffInMs = Math.abs(date1 - date2);

  return diffInMs / (1000 * 60 * 60 * 24);
}

/* -------------- Trips -------------- */

export function findDestinationByID(destinations, destID) {
  return destinations.find(dest => dest.id === destID);
}

export function findIDByDestination(destinations, destName) {
  const destinationNames = getDestinationNames(destinations);
  if (!destinationNames.includes(destName)) {
    return false;
  }
  
  return destinations.find(dest => dest.destination === destName).id;
}

export function getDestinationNames(destinations) {
  return destinations.map(({ destination }) => destination);
}
