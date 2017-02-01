import React, { Component } from 'react';
import {View, Text} from 'react-native';
import { connect } from 'react-redux';
import SideMenu from '../components/SideMenu';
import Stories from '../../stories';

function mapStateToProps(state) {
  return {
    languageCode: state.languageReducer.code,
  };
}

class SideMenuContainer extends Component {
  render() {
    let chapters = this._getChapters();

    return (
      <SideMenu chapters={chapters} {...this.props} />
    );
  }

  _getChapters() {
    return Stories[this.props.languageCode].chapters;
  }
}

SideMenuContainer.propTypes = {
  languageCode: React.PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(SideMenuContainer);
