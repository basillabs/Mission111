import React, { Component } from 'react';
import {View, Text} from 'react-native';
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
      <Story viewMode={this.props.data.type}
             handleNavigate={this.props.handleNavigate}
             count={this.props.count} />
    );
  }
}

StoryContainer.propTypes = {
  count: React.PropTypes.number,
};

export default connect(mapStateToProps)(StoryContainer);
