import { expect } from 'chai';
import { filterTrips } from '../src/model';
import { sampleTrips } from '../src/data/sampleData';

describe('Should filter the data', () => {
  let tripsByYear, pastTrips, upcomingTrips, pendingTrips;

  beforeEach('init data', () => {
    tripsByYear = filterTrips(sampleTrips, 'byYear', 1, '2023');
    pastTrips = filterTrips(sampleTrips, 'past', 1);
    upcomingTrips = filterTrips(sampleTrips, 'upcoming', 1);
    pendingTrips = filterTrips(sampleTrips, 'pending', 1);
  });

  it('Should return all trips by user id and year', () => {
    expect(tripsByYear).to.deep.equal([
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
    ]);
  });

  it('Should return all past trips', () => {
    expect(pastTrips).to.deep.equal([
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
    ]);
  });

  it('Should return all approved, upcoming trips', () => {
    expect(upcomingTrips).to.deep.equal([
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
    ]);
  });

  it('Should not return upcoming trip if it is pending', () => {
    expect(upcomingTrips).to.not.deep.include({
      id: 4,
      userID: 1,
      destinationID: 2,
      travelers: 6,
      date: '2023/11/11',
      duration: 10,
      status: 'pending',
      suggestedActivities: [],
    });
  });

  it('Should return all pending trips', () => {
    expect(pendingTrips).to.deep.equal([
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
    ]);
  });
});
