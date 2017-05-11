import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  FlatList,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';

import theme from '../../utils/theme';

const dim = Dimensions.get('window');
const data = [{key: 'a'}, {key: 'b'}, {key: 'c'}];

export const TOOLBAR_HEIGHT = 40;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;
const TITLE_WIDTH = WINDOW_WIDTH - 115;

export default class Slider extends Component {
  constructor(props) {
    super(props);

    this.topScroll = new Animated.Value(0);
    this.bottomScroll = new Animated.Value(0);

    this._scrollTop = Animated.event(
      [{nativeEvent: { contentOffset: { x: this.topScroll } }}],
    );


    this.onScrollTop = this.onScrollTop.bind(this);
    this.onScrollBottom = this.onScrollBottom.bind(this);
    this.onTopIn = this.onTopIn.bind(this);
    this.onTopOut = this.onTopOut.bind(this);
    this.onBotIn = this.onBotIn.bind(this);
    this.onBotOut = this.onBotOut.bind(this);
  }

  onTopIn() {
    this.scrollingTop = true;
  }

  onTopOut() {
    this.scrollingTop = false;
  }

  onBotIn() {
    this.scrollingBottom = true;
  }

  onBotOut() {
    this.scrollingBottom = false;
  }

  onScrollTop(e) {
    if (this.scrollingTop) {
      this.bottomList.scrollTo({x: e.nativeEvent.contentOffset.x, y: 0, animated: false});
    }
  }

  onScrollBottom(e) {
    if (this.scrollingBottom) {
      this.topList.scrollTo({x: e.nativeEvent.contentOffset.x, y: 0, animated: false});
    }
  }

  renderSlides(data, prefix) {
    const slides = [];

    data.forEach((slide, i) => {
      slides.push(
        <View
          key={`${prefix}-${i}`}
          style={styles.card}
        >
          <Text style={styles.text, slide.isTitleCard && styles.titleCard}>
            {slide.text}
          </Text>
        </View>
      );
    });

    return slides;
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPressIn={this.onTopIn}
        >
          <ScrollView
            ref={(list) => {this.topList = list;}}
            style={[styles.scroll, styles.top]}
            horizontal={true}
            onScroll={this.onScrollTop}
            scrollEventThrottle={33}
            pagingEnabled={true}
            onMomentumScrollEnd={this.onTopOut}
          >
            {this.renderSlides(this.props.topData, 'top')}
          </ScrollView>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPressIn={this.onBotIn}
        >
          <ScrollView
            ref={(list) => {this.bottomList = list;}}
            style={[styles.scroll]}
            horizontal={true}
            pagingEnabled={true}
            onScroll={this.onScrollBottom}
            scrollEventThrottle={33}
            onMomentumScrollEnd={this.onBotOut}
          >
            {this.renderSlides(this.props.bottomData, 'bottom')}
          </ScrollView>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.cardBackground,
    flexDirection: 'column',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  scroll: {
    width: dim.width,
    height: dim.height / 2,
    borderWidth: 5,
    borderColor: theme.accent,
  },
  top: {
    transform: [{rotate: '180deg'}], 
  },
  card: {
    width: dim.width,
    height: dim.height / 2,
    flexGrow: 1,
    borderWidth: 5,
    borderColor: theme.accent,
    backgroundColor: theme.cardBackground,
  },
  text: {
    fontSize: 17,
    lineHeight: 24,
    color: theme.text,
  },
  titleCard: {
    fontSize: 24,
    lineHeight: 30,
    color: theme.accent,
    fontWeight: "500",
    paddingTop: 35,
    width: TITLE_WIDTH,
  },
});
