import { expect } from 'chai';
import { getPastTrips } from '../src/model';
import { sampleTrips } from '../src/data/sampleData';

describe('Should filter the data', () => {
  let pastTrips;

  beforeEach('init data', () => {
    pastTrips = getPastTrips(sampleTrips);
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
});
