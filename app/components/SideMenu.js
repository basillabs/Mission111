import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  PanResponder,
} from 'react-native';
import ChapterList from './ChapterList';
import {
  FRICTION, TENSION,
} from '../constants/animationConstants';
import tracker from '../tracker';

const MENU_OFFSET = 130;
const DeviceScreen = Dimensions.get('window');
const MENU_WIDTH = DeviceScreen.width - MENU_OFFSET;

class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuLeft: new Animated.Value(-DeviceScreen.width),
    };

    this._menuStyles = {
      left: -DeviceScreen.width,
    };
    this._previousLeft = -10;
    // this._dragInterval = 0;

    this.onChapterSelection = this.onChapterSelection.bind(this);
  }

  componentWillMount() {
    let self = this;

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      // onPanResponderGrant: (evt, gestureState) => {
      //   // The guesture has started. Show visual feedback so the user knows
      //   // what is happening!

      //   // gestureState.d{x,y} will be set to zero now
      // },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}

        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        // self._dragInterval += gestureState.dx;

        self._menuStyles.left = self._previousLeft + gestureState.dx;
        this.updateNativeStyles();
      },
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        // console.log(self._dragInterval);
        // debugger;

        if (Math.abs(gestureState.dx) < MENU_WIDTH / 2) {
          self._menuStyles.left = -10;
          self._previousLeft = -10;
          this.updateNativeStyles();
        } else {
          self._menuStyles.left = -DeviceScreen.width;
          self._previousLeft = -DeviceScreen.width;
          this.updateNativeStyles();
          self._draggingClosed = true;
          self.props.hideMenu();
        }

      },
      // onPanResponderTerminate: (evt, gestureState) => {
      //   // Another component has become the responder, so this gesture
      //   // should be cancelled
      // },
      // onShouldBlockNativeResponder: (evt, gestureState) => {
      //   // Returns whether this component should block native components from becoming the JS
      //   // responder. Returns true by default. Is currently only supported on android.
      //   return true;
      // },
    });
  }

  componentDidMount() {
    this.updateNativeStyles();
  }

  updateNativeStyles() {
    if (this._menu) {
      this._menu.setNativeProps({
        style: this._menuStyles,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen) {
      Animated.spring(this.state.menuLeft, {
        toValue: -10,
        friction: FRICTION,
        tension: TENSION,
      }).start();
    } else if (!this._draggingClosed) {
      Animated.spring(this.state.menuLeft, {
        toValue: -DeviceScreen.width,
        friction: FRICTION,
        tension: TENSION,
      }).start();
    }
  }

  render() {
    return (
      <Animated.View scrollsToTop={false} style={[
        styles.container, {
          width: DeviceScreen.width,
          left: this.state.menuLeft,
        },
      ]}
        ref={(c) => { this._menu = c; }}
        {...this._panResponder.panHandlers}
      >
        <View style={styles.menu}>
          <ChapterList
            selectedChapterId={this.props.chapterId}
            onChapterTap={this.onChapterSelection}
            {...this.props}
          />
        </View>
        <TouchableWithoutFeedback
          onPress={this.props.hideMenu}
        >
          <View style={styles.clear} />
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }

  onChapterSelection(chapterIndex) {
    tracker.trackEvent('Tap', 'Chapter', {
      label: 'chapter',
      value: chapterIndex,
    });
    this.props.hideMenu();
    this.props.setChapter(chapterIndex);
  }
}
SideMenu.propTypes = {
  chapters: React.PropTypes.array.isRequired,
  chapterId: React.PropTypes.number.isRequired,
  setChapter: React.PropTypes.func.isRequired,
  isOpen: React.PropTypes.bool.isRequired,
  hideMenu: React.PropTypes.func.isRequired,
  language: React.PropTypes.object.isRequired,
};
SideMenu.defaultProps = {
  chapters: [],
  isOpen: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    bottom: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    zIndex: 1000000,
  },
  menu: {
    flex: 1,
    width: MENU_WIDTH,
  },
  // The 'clear' area that shows the UI underneath the
  // side menu. This is implemented as a sibling of the
  // menu in order to implement the "tap the area outside
  // the menu to close it" behavior.
  clear: {
    flex: 1,
    height: DeviceScreen.height,
  },
});

export default SideMenu;
