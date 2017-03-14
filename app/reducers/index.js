import navReducer from './navReducer';
import languageReducer from './languageReducer';
import menuReducer from './menuReducer';
import chapterReducer from './chapterReducer';
import { combineReducers } from 'redux';

const app = combineReducers({
  navReducer,
  languageReducer,
  menuReducer,
  chapterReducer,
});

export default app;
