import { PUSH_ROUTE, POP_ROUTE } from '../actions/navActions';
import { NavigationExperimental } from 'react-native';
const {
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

function navigationState(state = {
  index: 0,
  key: 'root',
  routes: [{
    key: 'welcome',
    title: 'Welcome',
  }],
}, action) {
  switch (action.type) {
    case PUSH_ROUTE:
      if (state.routes[state.index].key === (action.route && action.route.key)) {
        return state;
      }
      return NavigationStateUtils.push(state, action.route);

    case POP_ROUTE:
      if (state.index === 0 || state.routes.length === 1) {
        return state;
      }
      return NavigationStateUtils.pop(state);

    default:
      return state;
  }
}

export default navigationState;

