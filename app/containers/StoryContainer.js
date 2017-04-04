import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTopLanguage, setBottomLanguage } from '../actions/languageActions';
import { showMenu } from '../actions/menuActions';
import Story from '../components/Story';

function mapStateToProps(state) {
  return {
    chapterId: state.chapterReducer.chapterId,
    topLanguage: state.languageReducer.topLanguage,
    bottomLanguage: state.languageReducer.bottomLanguage,
    isOpen: state.menuReducer.open,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTopLanguage: (language) => dispatch(setTopLanguage(language)),
    setBottomLanguage: (language) => dispatch(setBottomLanguage(language)),
    showMenu: () => dispatch(showMenu()),
  };
}

class StoryContainer extends Component {
  render() {
    return (
      <Story viewMode={this.props.data.type}
             handleNavigate={this.props.handleNavigate}
             {...this.props}
      />
    );
  }
}

StoryContainer.propTypes = {
  data: React.PropTypes.object.isRequired,
  handleNavigate: React.PropTypes.func.isRequired,
  chapterId: React.PropTypes.number.isRequired,
};

StoryContainer.defaultProps = {
  data: {
    type: 'pair',
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(StoryContainer);
