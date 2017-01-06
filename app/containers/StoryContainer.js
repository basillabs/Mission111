import React, { Component } from 'react';
import { connect } from 'react-redux';

import Story from '../components/Story';

function mapStateToProps(state) {
  return {
    chapterId: state.welcome.chapterId,
  };
}

class StoryContainer extends Component {
  render() {
    return (
      <Story chapterId={this.props.chapterId} />
    );
  }
}

StoryContainer.propTypes = {
  chapterId: React.PropTypes.number,
};

export default connect(mapStateToProps)(StoryContainer);
