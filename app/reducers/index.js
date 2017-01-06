import navReducer from './navReducer';
import languageReducer from './languageReducer';
import { combineReducers } from 'redux';

import { INCREMENT_COUNT, SET_CHAPTER } from '../actions/welcome';

function welcome(state = {
  count: 0,
  chapterId: 1,
}, action) {
  switch (action.type) {
    case INCREMENT_COUNT:
      return Object.assign({}, state, {
        count: state.count + 1,
      });

    case SET_CHAPTER:
      return Object.assign({}, state, {
        chapterId: action.chapterId,
      });

    default:
      return state;
  }
}

const app = combineReducers({
  welcome,
  navReducer,
  languageReducer,
});

export default app;
