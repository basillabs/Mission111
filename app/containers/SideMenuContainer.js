import React, { Component } from 'react';
import {View, Text} from 'react-native';
import { connect } from 'react-redux';
import SideMenu from '../components/SideMenu';
import Stories from '../../stories';
import { setChapter } from '../actions/chapterActions';
import { hideMenu, showMenu } from '../actions/menuActions';

function mapStateToProps(state) {
  return {
    languageCode: state.languageReducer.code,
    chapterId: state.chapterReducer.chapterId,
    isOpen: state.menuReducer.open,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    hideMenu: () => dispatch(hideMenu()),
    showMenu: () => dispatch(showMenu()),
    setChapter: (chapterId) => dispatch(setChapter(chapterId)),
  };
}


class SideMenuContainer extends Component {
  render() {
    let chapters = this.getChapters();

    return (
      <SideMenu chapters={chapters} {...this.props} />
    );
  }

  getChapters() {
    return Stories[this.props.languageCode].chapters;
  }
}

SideMenuContainer.propTypes = {
  chapterId: React.PropTypes.number.isRequired,
  languageCode: React.PropTypes.string.isRequired,
  setChapter: React.PropTypes.func.isRequired,
  isOpen: React.PropTypes.bool.isRequired,
  hideMenu: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuContainer);
