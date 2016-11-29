import React, { Component } from 'react';
import { connect } from 'react-redux';

import Story from '../components/Story';

function mapStateToProps(state) {
  return {
    count: state.welcome.count,
  };
}

class StoryContainer extends Component {
  render() {
    return (
      <Story count={this.props.count}/>
    );
  }
}

StoryContainer.propTypes = {
  count: React.PropTypes.number,
};

export default connect(mapStateToProps)(StoryContainer);
