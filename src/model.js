/* -------------- Util -------------- */

export function filterTrips(tripData, criteria, travelerID, year = '2023') {
  const date = new Date();
  const yyyy = date.toLocaleString('default', { year: 'numeric' });
  const mm = date.toLocaleString('default', { month: '2-digit' });
  const dd = date.toLocaleString('default', { day: '2-digit' });
  const currentDate = `${yyyy}/${mm}/${dd}`;

  tripData = tripData.filter(trip => trip.userID === travelerID);

  switch (criteria) {
    case 'all':
      return tripData.filter(trip => trip.userID === travelerID);
    case 'byYear':
      return tripData.filter(
        trip => trip.userID === travelerID && trip.date.slice(0, 4) === year,
      );
    case 'past':
      return tripData.filter(trip => trip.date < currentDate);
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

/* -------------- Travelers -------------- */

export function getRandomTraveler(travelers) {
  return travelers[Math.floor(Math.random() * travelers.length)];
}

/* -------------- Calculation -------------- */

export function calcTotalSpentByYear(userID, trips, destinations, year) {
  return filterTrips(trips, 'byYear', userID, year).reduce((acc, trip) => {
    const destination = destinations.filter(
      dest => dest.id === trip.destinationID,
    )[0];
    const flightCost =
      trip.travelers * (destination.estimatedFlightCostPerPerson * 2);

    const lodgingCost =
      trip.duration * destination.estimatedLodgingCostPerDay * trip.travelers;
    const subTotal = flightCost + lodgingCost;
    const agentFee = subTotal * 0.1;

    acc += subTotal + agentFee;

    return acc;
  }, 0);
}
