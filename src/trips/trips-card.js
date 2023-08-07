export function TripCard(trip, destination) {
  const card = document.createElement('article');
  card.id = trip.id;
  card.classList.add('trip-card');
  card.setAttribute('tabindex', 0);

  const imgContainer = document.createElement('div');
  imgContainer.classList.add('img-container');
  card.appendChild(imgContainer);

  const destinationImg = document.createElement('img');
  destinationImg.src = destination.image;
  destinationImg.alt = destination.alt;
  imgContainer.appendChild(destinationImg);
  destinationImg.setAttribute('tabindex', 0);

  const dataContainer = document.createElement('div');
  dataContainer.classList.add('card-data-container');
  card.appendChild(dataContainer);
  
  const destinationTitle = document.createElement('h2');
  destinationTitle.innerText = destination.destination;
  dataContainer.appendChild(destinationTitle);
  destinationTitle.setAttribute('tabindex', 0);

  const lastVisitDate = document.createElement('p');
  lastVisitDate.innerText = `Last visited: ${trip.date}`;
  dataContainer.append(lastVisitDate);
  lastVisitDate.setAttribute('tabindex', 0);
  
  return card;
}

