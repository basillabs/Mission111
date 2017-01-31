export const PUSH_ROUTE = 'PUSH_ROUTE';
export const POP_ROUTE = 'POP_ROUTE';

const MENU = 'MENU';
const MENU_CLOSE = 'MENU_CLOSE';
const MENU_OPEN = 'MENU_OPEN';

export function push(route) {
  return {
    type: PUSH_ROUTE,
    route,
  };
}

export function pop() {
  return {
    type: POP_ROUTE,
  };
}

export function navTo(keyName) {
  return {
    type: 'push',
    route: {
      key: keyName,
    },
  };
}

export function showMenu() {
  return {
    type: MENU,
    action: MENU_CLOSE,
  };
}

export function hideMenu() {
  return {
    type: MENU,
    action: MENU_OPEN,
  };
}
