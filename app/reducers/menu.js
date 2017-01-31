import {
  MENU_OPEN,
  MENU_CLOSE,
} from '../actions/menuActions';

function menuState(state = {
  open: false,
}, action = {}) {
  switch (action.type) {
    case MENU_OPEN:
      return { open: true };
    case MENU_CLOSE:
      return { open: false };
    default:
      return state;
  }
}

export default menuState;

