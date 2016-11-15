import navReducer from './navReducer';
import { combineReducers } from 'redux';

const app = combineReducers({
  navReducer,
});

export default app;
