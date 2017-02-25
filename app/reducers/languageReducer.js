import {
  AR_CODE,
  EN_CODE,
  SET_TOP_CODE,
  SET_BOTTOM_CODE,
} from '../constants/languageConstants';

const defaultState = {
  topCode: AR_CODE,
  bottomCode: EN_CODE,
};

function languageState(state = defaultState, action = {}) {
  switch (action.type) {
    case SET_TOP_CODE:
      return Object.assign({}, state, { 
        topCode: action.code, 
      });
    case SET_BOTTOM_CODE:
      return Object.assign({}, state, {
        bottomCode: action.code,
      });
    default:
      return state;
  }
}

export default languageState;
