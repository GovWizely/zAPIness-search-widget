import { required } from '../validate';

describe('validate/required', () => {
  it('returns errors if value is invalid', () => {
    expect(required(undefined)).toBe('Required');
    expect(required('')).toBe('Required');
  });

  it('returns errors if value is invalid', () => {
    expect(required('123')).toBe(undefined);
  });
});
