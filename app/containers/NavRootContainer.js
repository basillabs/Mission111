import React, { Component } from 'react';
import { BackAndroid, NavigationExperimental } from 'react-native';

import { connect } from 'react-redux';
import { push, pop } from '../actions/navActions';
import moment from 'moment';

import Welcome from '../components/Welcome';
import Chapters from '../components/Chapters';
import Exercises from '../components/Exercises';
import Story from '../components/Story';
import Vocab from '../components/Vocab';

const { CardStack: NavigationCardStack } = NavigationExperimental;

const KEY_DELIMITER = '/';
const SCENE_PREFIX = 'scene_';

function mapStateToProps(state) {
  return {
    navigation: state.navReducer,
    days: state.days,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pushRoute: (route) => dispatch(push(route)),
    popRoute: () => dispatch(pop()),
  };
}

class NavRoot extends Component {
  constructor(props) {
    super(props);
    this.renderScene = this.renderScene.bind(this);
    this.handleBackAction = this.handleBackAction.bind(this);
    this.handleNavigate = this.handleNavigate.bind(this);
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackAction);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackAction);
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
    const key = scene.key.split(KEY_DELIMITER)[0];

    /*
     * Add possibe scenes here:
     * example: 
     *   case `${SCENE_PREFIX}chapterList`:
     *     return <ChapterListContainer handleNavigate={this.handleNavigate} />;
     */
    switch (key) {
      case `${SCENE_PREFIX}chapters`:
         return <Chapters handleNavigate={this.handleNavigate} />;
      case `${SCENE_PREFIX}exercises`:
         return <Exercises handleNavigate={this.handleNavigate} />;
      case `${SCENE_PREFIX}story`:
         return <Story handleNavigate={this.handleNavigate} />;
      case `${SCENE_PREFIX}vocab`:
         return <Vocab handleNavigate={this.handleNavigate} />;
      default:
        return <Welcome handleNavigate={this.handleNavigate} />;
    }
  }

  render() {
    return (
      <NavigationCardStack
        direction="horizontal"
        navigationState={this.props.navigation}
        onNavigate={this.handleNavigate}
        renderScene={this.renderScene}
        gestureResponseDistance={200}
        onNavigateBack={this.handleBackAction}
        style={{ backgroundColor: 'black' }}
        cardStyle={{ opacity: 1 }}
      />
    );
  }
}

NavRoot.propTypes = {
  navigation: React.PropTypes.object,
  days: React.PropTypes.object,
  popRoute: React.PropTypes.func,
  pushRoute: React.PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavRoot);
