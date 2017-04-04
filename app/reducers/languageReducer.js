import languageData from '../../data/languages';
import {
  SET_TOP_LANGUAGE,
  SET_BOTTOM_LANGUAGE,
} from '../actions/languageActions';

const defaultState = {
  topLanguage: languageData.languages.AR,
  bottomLanguage: languageData.languages.EN,
};

function languageState(state = defaultState, action = {}) {
  switch (action.type) {
    case SET_TOP_LANGUAGE:
      return Object.assign({}, state, {
        topLanguage: action.language,
      });
    case SET_BOTTOM_LANGUAGE:
      return Object.assign({}, state, {
        bottomLanguage: action.language,
      });
    default:
      return state;
  }
}

export default languageState;
