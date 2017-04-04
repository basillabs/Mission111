import languageReducer from '../../app/reducers/languageReducer';
import {
  setTopLanguage,
  setBottomLanguage,
} from '../../app/actions/languageActions';
import languageData from '../../data/languages';

describe('language reducer', () => {
  describe('default state', () => {
    it('defaults to AR + EN', () => {
      const state = languageReducer();
      expect(state.bottomLanguage.code).toBe(languageData.languages.EN.code);
      expect(state.topLanguage.code).toBe(languageData.languages.AR.code);
    });
  });

  describe('set top language', () => {
    it('sets the language code', () => {
      const state = languageReducer({},
        setTopLanguage(languageData.languages.SV));
      expect(state.topLanguage.code).toBe(languageData.languages.SV.code);
    });
  });

  describe('set bottom language', () => {
    it('sets the language code', () => {
      const state = languageReducer({},
        setBottomLanguage(languageData.languages.SV));
      expect(state.bottomLanguage.code).toBe(languageData.languages.SV.code);
    });
  });
});
