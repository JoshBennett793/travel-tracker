export const sampleTrips = [
  {
    id: 1,
    userID: 1,
    destinationID: 3,
    travelers: 1,
    date: '2022/09/16',
    duration: 8,
    status: 'approved',
    suggestedActivities: [],
  },
  {
    id: 2,
    userID: 1,
    destinationID: 2,
    travelers: 4,
    date: '2023/08/30',
    duration: 3,
    status: 'approved',
    suggestedActivities: [],
  },
  {
    id: 3,
    userID: 37,
    destinationID: 1,
    travelers: 2,
    date: '2023/03/01',
    duration: 7,
    status: 'approved',
    suggestedActivities: [],
  },
  {
    id: 4,
    userID: 1,
    destinationID: 2,
    travelers: 6,
    date: '2023/11/11',
    duration: 10,
    status: 'pending',
    suggestedActivities: [],
  },
];

export const sampleTravelers = [
  {
    id: 1,
    name: 'Ham Leadbeater',
    travelerType: 'relaxer',
  },
  {
    id: 2,
    name: 'Rachael Vaughten',
    travelerType: 'thrill-seeker',
  },
  {
    id: 3,
    name: 'Sibby Dawidowitsch',
    travelerType: 'shopper',
  },
  {
    id: 4,
    name: 'Leila Thebeaud',
    travelerType: 'photographer',
  },
  {
    id: 5,
    name: 'Tiffy Grout',
    travelerType: 'thrill-seeker',
  },
  {
    id: 6,
    name: 'Laverna Flawith',
    travelerType: 'shopper',
  },
  {
    id: 7,
    name: 'Emmet Sandham',
    travelerType: 'relaxer',
  },
];

export const sampleDestinations = [
  {
    id: 1,
    destination: 'Lima, Peru',
    estimatedLodgingCostPerDay: 70,
    estimatedFlightCostPerPerson: 400,
    image:
      'https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80',
    alt: 'overview of city buildings with a clear sky',
  },
  {
    id: 2,
    destination: 'Stockholm, Sweden',
    estimatedLodgingCostPerDay: 100,
    estimatedFlightCostPerPerson: 780,
    image:
      'https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    alt: 'city with boats on the water during the day time',
  },
  {
    id: 3,
    destination: 'Sydney, Australia',
    estimatedLodgingCostPerDay: 130,
    estimatedFlightCostPerPerson: 950,
    image:
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    alt: 'opera house and city buildings on the water with boats',
  },
];
