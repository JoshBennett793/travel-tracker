export function TripCard(trip, destination) {
  const card = document.createElement('article');
  card.id = trip.id;
  card.classList.add('trip-card');

  const imgContainer = document.createElement('div');
  imgContainer.classList.add('img-container');
  card.appendChild(imgContainer);

  const destinationImg = document.createElement('img');
  destinationImg.src = destination.image;
  destinationImg.alt = destination.alt;
  imgContainer.appendChild(destinationImg);
  
  return card;
}

