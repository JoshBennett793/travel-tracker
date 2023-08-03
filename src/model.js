/* -------------- Util -------------- */

export function filterTrips(tripData, criteria) {
  const date = new Date();
  const year = date.toLocaleString('default', { year: 'numeric' });
  const month = date.toLocaleString('default', { month: '2-digit' });
  const day = date.toLocaleString('default', { day: '2-digit' });
  const currentDate = `${year}/${month}/${day}`;

  switch (criteria) {
    case 'past':
      return tripData.filter(trip => trip.date < currentDate);
    case 'upcoming':
      return tripData.filter(
        trip => trip.date > currentDate && trip.status === 'approved',
      );
    case 'pending':
      return tripData.filter(trip => trip.status === 'pending');
  }
}

/* -------------- Travelers -------------- */

export function getRandomTraveler(travelers) {
  return travelers[Math.floor(Math.random() * travelers.length) + 1];
}
