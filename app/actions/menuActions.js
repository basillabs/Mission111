export const MENU_OPEN = 'MENU_OPEN';
export const MENU_CLOSE = 'MENU_CLOSE';

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
