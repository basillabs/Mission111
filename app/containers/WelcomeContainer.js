import React, { Component } from 'react';
import { connect } from 'react-redux';

import Welcome from '../components/Welcome';

class WelcomeContainer extends Component {
  render() {
    return (
      <Welcome handleNavigate={this.props.handleNavigate} />
    );
  }
}

export default connect()(WelcomeContainer);
