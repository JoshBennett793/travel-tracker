import { expect } from 'chai';

import { sampleDestinations, sampleTrips } from '../src/data/sampleData';
import { calcTotalCostOfTrip, calcTotalSpentByYear } from '../src/model';

describe('Calculation', () => {
  let total, figures;

  beforeEach('init data', () => {
    total = calcTotalSpentByYear(1, sampleTrips, sampleDestinations, '2023');
    figures = calcTotalCostOfTrip(
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
        id: 2,
        destination: 'Stockholm, Sweden',
        estimatedLodgingCostPerDay: 100,
        estimatedFlightCostPerPerson: 780,
        image:
          'https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
        alt: 'city with boats on the water during the day time',
      },
    );
  });

  it('Should calculate total spent for past year (2023)', () => {
    expect(total).to.equal(25080);
  });

  it('Should calculate the breakdown of figures for the trip', () => {
    expect(figures).to.deep.equal({
      flightCost: 6240,
      lodgingCost: 1200,
      subTotal: 7440,
      agentFee: 744,
      total: 8184,
    });
  });
});
