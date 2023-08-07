import { expect } from 'chai';
import { validateLoginCredentials } from '../src/model';

describe('Login Authentication', () => {
  let validLogin, invalidLogin;

  beforeEach('init login credentials', () => {
    validLogin = validateLoginCredentials('traveler50', 'travel');
    invalidLogin = validateLoginCredentials('seymour', 'butts');
  });

  it('Should return true if credentials are valid', () => {
    expect(validLogin).to.equal(true);
  });

  it.skip('Should return false if credentials are invalid', () => {
    expect(invalidLogin).to.equal(false);
  });
});
