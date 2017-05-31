import validate from '../validate';

describe('action/validate', () => {
  describe('validate', () => {
    it('returns empty obj if does not have filters', () => {
      expect(validate({ filterRequired: false })).toEqual({});
    });

    it('returns empty obj if filterRequired is false', () => {
      expect(validate({})).toEqual({});
    });

    it('returns empty obj if filter has type and value', () => {
      expect(validate({
        filters: [
          { type: 'Occupation', value: 'student' },
          { type: 'Task', value: 'draw' }
        ]
      })).toEqual({});
    });

    it('returns errors if filter does not have value', () => {
      const values = {
        filters: [{
          type: 'Occupation', value: ''
        }],
        filterRequired: true
      };

      expect(validate(values)).toEqual(
        { filters: [{ value: 'Required' }] }
      );
    });

    it('returns errors if filter does not have type', () => {
      const values = {
        filters: [{
          type: '', value: 'student'
        }],
        filterRequired: true
      };

      expect(validate(values)).toEqual(
        { filters: [{ value: 'Required' }] }
      );
    });
  });
});
