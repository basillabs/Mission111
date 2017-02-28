/**
 * Provider wrapper for redux container.
 */
import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import { Provider } from 'react-redux';
import 'react-native-browser-polyfill';

import NavRootContainer from './containers/NavRootContainer';

import createStore from './createStore';
const store = createStore();

class Setup extends Component {
  componentWillMount() {
    StatusBar.setHidden(true);
  }

  render() {
    return (
      <Provider store={store}>
        <NavRootContainer />
      </Provider>
    );
  }
}

export default Setup;
