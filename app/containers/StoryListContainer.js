import React, { Component } from 'react';
import { connect } from 'react-redux';

import StoryList from '../components/StoryList';

class StoryListContainer extends Component {
  render() {
    return (
      <StoryList handleNavigate={this.props.handleNavigate} language={this.props.data.language}/>
    );
  }
}

export default connect()(StoryListContainer);
