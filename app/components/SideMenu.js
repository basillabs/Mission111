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

const ANIMATION_DURATION = 400;
const MENU_OFFSET = 80;
const DeviceScreen = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    flex: 1,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    zIndex: 1000000,
  },
  menu: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    width: DeviceScreen.width - MENU_OFFSET,
  },
  item: {
    fontSize: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  selectedItem: {
    fontWeight: 'bold',
  },
});


class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuLeft: new Animated.Value(-DeviceScreen.width),
      menuWidth: new Animated.Value(0),
    };
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
        <View style={styles.menu}>
          {this.props.chapters.map((chapter, i) => {
            const style = (i + 1 === this.props.chapterId)
              ? [styles.item, styles.selectedItem]
              : styles.item;

            return (
              <Text
                key={`chapter-${i}`}
                onPress={this._onChapterSelection.bind(this, i + 1)}
                style={style}>
              {chapter.title}
              </Text>
            );
          })}
        </View>
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

export default SideMenu;
