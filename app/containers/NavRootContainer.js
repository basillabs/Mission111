import React, { Component } from 'react';
import { BackAndroid, NavigationExperimental, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import moment from 'moment';
import { push, pop } from '../actions/navActions';
import StoryContainer from '../containers/StoryContainer';

const { CardStack: NavigationCardStack } = NavigationExperimental;

const KEY_DELIMITER = '/';

function mapStateToProps(state) {
  return {
    navigation: state.navReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pushRoute: route => dispatch(push(route)),
    popRoute: () => dispatch(pop()),
  };
}

class NavRoot extends Component {
  constructor(props) {
    super(props);
    this.renderScene = this.renderScene.bind(this);
    this.handleBackAction = this.handleBackAction.bind(this);
    this.handleNavigate = this.handleNavigate.bind(this);
    this.onDrawerChange = this.onDrawerChange.bind(this);
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackAction);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackAction);
  }

  onDrawerChange(isOpen) {
    if (isOpen) {
      this.props.showMenu();
    } else {
      this.props.hideMenu();
    }
  }

  handleBackAction() {
    if (this.props.navigation.index === 0) {
      return false;
    }
    this.props.popRoute();
    return true;
  }

  handleNavigate(action) {
    if (action && action.type && action.route.key) {
      const newAction = {
        type: action.type,
        route: {
          key: `${action.route.key}${KEY_DELIMITER}${moment().unix()}`,
          title: action.route.title,
          data: action.data,
        },
      };

      switch (action.type) {
        case 'push':
          this.props.pushRoute(newAction.route);
          return true;
        case 'back':
        case 'pop':
          return this.handleBackAction();

        default:
          return false;
      }
    }
    return false;
  }

  renderScene(props) {
    const { scene } = props;
    return <StoryContainer handleNavigate={this.handleNavigate} data={scene.route.data} />;
  }

  render() {
    return (
      <NavigationCardStack
        direction="horizontal"
        navigationState={this.props.navigation}
        onNavigate={this.handleNavigate}
        renderScene={this.renderScene}
        onNavigateBack={this.handleBackAction}
        gestureResponseDistance={100}
        style={{ backgroundColor: 'black' }}
        cardStyle={{ opacity: 1 }}
      />
    );
  }
}

NavRoot.propTypes = {
  navigation: React.PropTypes.object.isRequired,
  popRoute: React.PropTypes.func.isRequired,
  pushRoute: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavRoot);
