import { expect } from 'chai';

import { sampleDestinations, sampleTrips } from '../src/data/sampleData';
import { calcTotalSpentByYear } from '../src/model';

describe('Calculation', () => {
  let total;

  beforeEach('init data', () => {
    total = calcTotalSpentByYear(1, sampleTrips, sampleDestinations, '2023');
  });

  it('Should calculate total spent for past year (2023)', () => {
    expect(total).to.equal(8184);
  });
});
