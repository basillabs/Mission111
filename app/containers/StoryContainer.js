import React, { Component } from 'react';
import { connect } from 'react-redux';
import Story from '../components/Story';

function mapStateToProps(state) {
  return {
    chapterId: state.chapterReducer.chapterId,
  };
}

class StoryContainer extends Component {
  render() {
    return (
      <Story viewMode={this.props.data.type}
             handleNavigate={this.props.handleNavigate}
             chapterId={this.props.chapterId} />
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

export default connect(mapStateToProps)(StoryContainer);
