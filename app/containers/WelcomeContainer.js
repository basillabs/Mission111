import React, { Component } from 'react';
import { connect } from 'react-redux';

import { incrementCount } from '../actions/welcome';

import Welcome from '../components/Welcome';

function mapStateToProps(state) {
  return {
    openChapters: state.welcome.count,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    incrementCount: () => dispatch(incrementCount()),
  };
}

class WelcomeContainer extends Component {
  render() {
    return (
      <Welcome
        incrementCount={this.props.incrementCount}
        handleNavigate={this.props.handleNavigate}
      />
    );
  }
}

WelcomeContainer.propTypes = {
  incrementCount: React.PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeContainer);
