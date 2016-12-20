import navReducer from './navReducer';
import languageReducer from './languageReducer';
import { combineReducers } from 'redux';

import { INCREMENT_COUNT } from '../actions/welcome';

function welcome(state = {
  count: 0,
}, action) {
  switch (action.type) {
    case INCREMENT_COUNT:
      return Object.assign({}, state, {
        count: state.count + 1,
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
