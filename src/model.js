export function getPastTrips(tripData) {
  const date = new Date();
  const year = date.toLocaleString('default', { year: 'numeric' });
  const month = date.toLocaleString('default', { month: '2-digit' });
  const day = date.toLocaleString('default', { day: '2-digit' });
  const currentDate = `${year}/${month}/${day}`;

  return tripData.filter(trip => trip.date < currentDate)
}
