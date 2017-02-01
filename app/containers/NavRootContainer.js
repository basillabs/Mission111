import React, { Component } from 'react';
import { BackAndroid, NavigationExperimental } from 'react-native';

import { connect } from 'react-redux';
import { push, pop } from '../actions/navActions';
import { hideMenu } from '../actions/menuActions';
import moment from 'moment';
import Drawer from 'react-native-drawer';
import SideMenuContainer from '../containers/SideMenuContainer';
import WelcomeContainer from '../containers/WelcomeContainer';
import StoryContainer from '../containers/StoryContainer';
import StoryListContainer from '../containers/StoryListContainer';

const { CardStack: NavigationCardStack } = NavigationExperimental;

const KEY_DELIMITER = '/';
const SCENE_PREFIX = 'scene_';

function mapStateToProps(state) {
  return {
    navigation: state.navReducer,
    drawerOpen: state.menuReducer.open,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pushRoute: (route) => dispatch(push(route)),
    popRoute: () => dispatch(pop()),
    hideMenu: () => dispatch(hideMenu()),
  };
}

class NavRoot extends Component {
  constructor(props) {
    super(props);
    this.renderScene = this.renderScene.bind(this);
    this.handleBackAction = this.handleBackAction.bind(this);
    this.handleNavigate = this.handleNavigate.bind(this);
    this.onDrawerClose = this.onDrawerClose.bind(this);
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackAction);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackAction);
  }

  onDrawerClose() {
    this.props.hideMenu();
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
    const key = scene.key.split(KEY_DELIMITER)[0];

    /*
     * Add possibe scenes here:
     * example:
     *   case `${SCENE_PREFIX}chapterList`:
     *     return <ChapterListContainer handleNavigate={this.handleNavigate} />;
     */
    switch (key) {
      case `${SCENE_PREFIX}storyList`:
         return <StoryListContainer handleNavigate={this.handleNavigate} data={scene.route.data} />;
      case `${SCENE_PREFIX}story`:
         return <StoryContainer handleNavigate={this.handleNavigate} data={scene.route.data} />;
      default:
        return <WelcomeContainer handleNavigate={this.handleNavigate} />;
    }
  }

  render() {
    return (
      <Drawer
        content={<SideMenuContainer />}
        tapToClose={true}
        type="overlay"
        openDrawerOffset={100}
        closedDrawerOffset={0}
        tweenHandler={Drawer.tweenPresets.parallax}
        open={this.props.drawerOpen}
        captureGestures={false}
        onClose={this.onDrawerClose}
      >
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
      </Drawer>
    );
  }
}

        // styles={drawerStyles}
// const drawerStyles = {
  // drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  // main: {paddingLeft: 3},
// }

NavRoot.propTypes = {
  navigation: React.PropTypes.object.isRequired,
  popRoute: React.PropTypes.func.isRequired,
  pushRoute: React.PropTypes.func.isRequired,
  drawerOpen: React.PropTypes.bool.isRequired,
  hideMenu: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavRoot);
