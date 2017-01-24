import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setChapter } from '../actions/welcome';
import StoryList from '../components/StoryList';

function mapDispatchToProps(dispatch) {
  return {
    setChapter: (chapterId) => dispatch(setChapter(chapterId)),
  };
}

class StoryListContainer extends Component {
  render() {
    return (
      <StoryList
        setChapter={this.props.setChapter}
        handleNavigate={this.props.handleNavigate}
        language={this.props.data.language}
      />
    );
  }
}

StoryListContainer.propTypes = {
  setChapter: React.PropTypes.func,
};

export default connect(null, mapDispatchToProps)(StoryListContainer);
