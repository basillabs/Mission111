import languageReducer from '../../app/reducers/languageReducer';
import {
  setLanguage
} from '../../app/actions/languageActions';

describe('language reducer', () => {
  describe('default state', () => {
    it('defaults to EN', () => {
      const state = languageReducer();
      expect(state.code).toBe('EN');
    });
  });

  describe('set language', () => {
    it('sets the language code', () => {
      const state = languageReducer({},
        setLanguage('GB'));
      expect(state.code).toBe('GB');
    });
  });
});
