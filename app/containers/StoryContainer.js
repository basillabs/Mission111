import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTopCode, setBottomCode } from '../actions/languageActions';
import { showMenu } from '../actions/menuActions';
import Story from '../components/Story';

function mapStateToProps(state) {
  return {
    chapterId: state.chapterReducer.chapterId,
    topCode: state.languageReducer.topCode,
    bottomCode: state.languageReducer.bottomCode,
    isOpen: state.menuReducer.open,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTopCode: (code) => dispatch(setTopCode(code)),
    setBottomCode: (code) => dispatch(setBottomCode(code)),
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
