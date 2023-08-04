export function TripCard(trip) {
  const card = document.createElement('article');
  card.classList.add('trip-card');
  card.innerText = `${trip.userID} is going to ${trip.destinationID}`;
  
  return card;
}