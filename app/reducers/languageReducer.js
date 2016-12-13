import {
  SET_LANGUAGE,
} from '../actions/languageActions';

const defaultState = {
  code: 'EN',
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
