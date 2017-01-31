import navReducer from './navReducer';
import languageReducer from './languageReducer';
import menu from './menu';
import { combineReducers } from 'redux';

import { SET_CHAPTER } from '../actions/welcome';

function welcome(state = {
  chapterId: 1,
}, action) {
  switch (action.type) {
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
  menu,
});

export default app;
