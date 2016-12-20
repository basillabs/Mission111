import {
  SET_LANGUAGE,
} from '../actions/languageActions';
import {
  EN_LANG,
} from '../constants/languageConstants';

const defaultState = {
  code: EN_LANG,
};

export default function(state = defaultState, action = {}) {
  switch (action.type) {
    case SET_LANGUAGE:
      return Object.assign({}, state, {
        code: action.code,
      });
    default:
      return state;
  }
}
