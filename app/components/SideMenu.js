import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import ChapterList from './ChapterList';
import {
  FRICTION, TENSION
} from '../constants/animationConstants';

const ANIMATION_DURATION = 300;
const MENU_OFFSET = 150;
const DeviceScreen = Dimensions.get('window');

class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuLeft: new Animated.Value(-DeviceScreen.width),
    };

    this.onChapterSelection = this.onChapterSelection.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen) {
      Animated.spring(this.state.menuLeft, {
          toValue: 0,
          friction: FRICTION,
          tension: TENSION,
        }
      ).start();
    } else {
      Animated.spring(this.state.menuLeft, {
          toValue: -DeviceScreen.width,
          friction: FRICTION,
          tension: TENSION,
        }
      ).start();
    }
  }

  render() {
    return (
      <Animated.View scrollsToTop={false} style={[
        styles.container, {
          width: DeviceScreen.width,
          left: this.state.menuLeft,
        }
      ]} >
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
    width: DeviceScreen.width - MENU_OFFSET,
  },
  // The 'clear' area that shows the UI underneath the
  // side menu. This is implemented as a sibling of the
  // menu in order to implement the "tap the area outside
  // the menu to close it" behavior.
  clear: {
    flex: 1,
    height: DeviceScreen.height,
  }
});

export default SideMenu;
