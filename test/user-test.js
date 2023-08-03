import { expect } from 'chai';
import { getRandomTraveler } from '../src/model';
import { sampleTravelers } from '../src/data/sampleData';

describe('Should get a random user', () => {
  let user;

  beforeEach('init user', () => {
    user = getRandomTraveler(sampleTravelers);
  });

  it('Should get a random user', () => {
    expect(sampleTravelers).to.deep.include(user);
  });
});
