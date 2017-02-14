import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  PanResponder,
  Text,
} from 'react-native';
import ChapterList from './ChapterList';

const ANIMATION_DURATION = 400;
const MENU_OFFSET = 80;
const DeviceScreen = Dimensions.get('window');

class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuLeft: new Animated.Value(-DeviceScreen.width),
      menuWidth: new Animated.Value(0),
    };

    this._onChapterSelection = this._onChapterSelection.bind(this);
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => false,
      onPanResponderTerminationRequest: () => true,
      onShouldBlockNativeResponder: () => false,
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.moveX === 0 && gestureState.moveY === 0
          && gestureState.x0 > DeviceScreen.width - MENU_OFFSET) {
          // When there's a tap outside the visible part of the side menu, close it.
          this.props.hideMenu();
        }
      },
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen) {
      this.state.menuWidth.setValue(DeviceScreen.width);
      Animated.timing(this.state.menuLeft, {
          toValue: 0,
          duration: ANIMATION_DURATION,
        }
      ).start();
    } else {
      Animated.timing(this.state.menuLeft, {
          toValue: -DeviceScreen.width,
          duration: ANIMATION_DURATION,
        }
      ).start(() => {
        this.state.menuWidth.setValue(0);
      });
    }
  }

  render() {
    return (
      <Animated.View scrollsToTop={false} style={[
        styles.container, {
          width: this.state.menuWidth,
          left: this.state.menuLeft,
        }
      ]} {...this._panResponder.panHandlers}>
        <ChapterList
          selectedChapterId={this.props.chapterId}
          onChapterTap={this._onChapterSelection}
          style={styles.menu}
          {...this.props}
        />
      </Animated.View>
    );
  }

  _onChapterSelection(chapterIndex) {
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
};
SideMenu.defaultProps = {
  chapters: [],
  isOpen: false,
};

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    zIndex: 1000000,
  },
  menu: {
    width: DeviceScreen.width - MENU_OFFSET,
  },
});

export default SideMenu;
