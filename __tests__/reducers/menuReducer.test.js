import menuReducer from '../../app/reducers/menuReducer';
import {
  showMenu,
  hideMenu,
} from '../../app/actions/menuActions';
import {
  MENU_OPEN,
  MENU_CLOSE,
} from '../../app/constants/languageConstants';

describe('menu reducer', () => {
  describe('default state', () => {
    it('defaults to not open', () => {
      const state = menuReducer();
      expect(state.open).toBe(false);
    });
  });

  describe('open', () => {
    it('sets to open', () => {
      const state = menuReducer({},
        showMenu());
      expect(state.open).toBe(true);
    });
  });

  describe('close', () => {
    it('sets to close', () => {
      const state = menuReducer({},
        hideMenu());
      expect(state.open).toBe(false);
    });
  });
});
