import languageReducer from '../../app/reducers/languageReducer';
import {
  setLanguage
} from '../../app/actions/languageActions';
import {
  EN_LANG,
  SV_LANG,
} from '../../app/constants/languageConstants';

describe('language reducer', () => {
  describe('default state', () => {
    it('defaults to EN', () => {
      const state = languageReducer();
      expect(state.code).toBe(EN_LANG);
    });
  });

  describe('set language', () => {
    it('sets the language code', () => {
      const state = languageReducer({},
        setLanguage(SV_LANG));
      expect(state.code).toBe(SV_LANG);
    });
  });
});
