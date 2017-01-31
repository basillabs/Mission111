import {
  MENU_OPEN,
  MENU_CLOSE,
} from '../constants/menuConstants';

export function showMenu() {
  return {
    type: MENU_OPEN,
  };
}

export function hideMenu() {
  return {
    type: MENU_CLOSE,
  };
}
