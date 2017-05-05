import toggleResult from '../ToggleActions';
import { TOGGLE_WHICH } from '../../constants/ActionTypes';

describe('actions/LoadingActions', () => {
  describe('requestData', () => {
    it('creates action to request data', () => {
      expect(toggleResult(2)).toEqual(
        {
          type: TOGGLE_WHICH,
          key: 2
        }
      );
    });
  });
});
