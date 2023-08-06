import { expect } from 'chai';
import { calcTimeDifference } from '../src/model';

describe('Format form data for API', () => {
  let diff;

  beforeEach('init data', () => {
    diff = calcTimeDifference('2023-01-01', '2023-01-03')
  })

  it('Should calculate the difference between two dates', () => {
    expect(diff).to.equal(2);
  })
})