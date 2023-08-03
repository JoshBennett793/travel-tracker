import { expect } from 'chai';
import { filterTrips } from '../src/model';
import { sampleTrips } from '../src/data/sampleData';

describe('Should filter the data', () => {
  let pastTrips, upcomingTrips;

  beforeEach('init data', () => {
    pastTrips = filterTrips(sampleTrips, 'past');
    upcomingTrips = filterTrips(sampleTrips, 'upcoming');
  });

  it('Should return all past trips', () => {
    expect(pastTrips).to.deep.equal([
      {
        id: 1,
        userID: 44,
        destinationID: 49,
        travelers: 1,
        date: '2022/09/16',
        duration: 8,
        status: 'approved',
        suggestedActivities: [],
      },
      {
        id: 3,
        userID: 37,
        destinationID: 15,
        travelers: 2,
        date: '2023/03/01',
        duration: 7,
        status: 'approved',
        suggestedActivities: [],
      },
    ]);
  });

  it('Should return all approved, upcoming trips', () => {
    expect(upcomingTrips).to.deep.equal([
      {
        id: 2,
        userID: 23,
        destinationID: 12,
        travelers: 4,
        date: '2023/08/30',
        duration: 3,
        status: 'approved',
        suggestedActivities: [],
      },
    ]);
  });
});
