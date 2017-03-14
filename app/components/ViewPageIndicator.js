'use strict';
// Copied from node_modules/react-native-viewpager/DefaultViewPageIndicator.js
var React = require('react');
var ReactNative = require('react-native');
var {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} = ReactNative;

import { BEIGE } from '../constants/colorConstants';

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

var DOT_SIZE = 6;
var DOT_SAPCE = 4;

var styles = StyleSheet.create({
  //New styles for positioning
  tabContainer: {
    position: 'absolute',
    left: 50,
    right: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tab: {
    alignItems: 'center',
  },

  tabs: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: BEIGE,
    marginLeft: DOT_SAPCE,
    marginRight: DOT_SAPCE,
    opacity: 0.3,
  },

  curDot: {
    position: 'absolute',
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: BEIGE,
    margin: DOT_SAPCE,
    bottom: 0,
  },
});

var ViewPageIndicator = React.createClass({
  propTypes: {
    goToPage: React.PropTypes.func,
    activePage: React.PropTypes.number,
    pageCount: React.PropTypes.number
  },

  getInitialState() {
    return {
      viewWidth: 0,
    };
  },

  renderIndicator(page) {
    //var isTabActive = this.props.activePage === page;
    return (
      <TouchableOpacity style={styles.tab} key={'idc_' + page} onPress={() => this.props.goToPage(page)}>
        <View style={styles.dot} />
      </TouchableOpacity>
    );
  },

  render() {
    // Modified for the split
    var split = this.props.isSplit ? { top: deviceHeight / 2 - 3} : { top: 18 };

    var pageCount = this.props.pageCount;
    var itemWidth = DOT_SIZE + (DOT_SAPCE * 2);
    var offset = (this.state.viewWidth - itemWidth * pageCount) / 2 + itemWidth * this.props.activePage;

    //var left = offset;
    var offsetX = itemWidth * (this.props.activePage - this.props.scrollOffset);
    var left = this.props.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [offsetX, offsetX + itemWidth]
    })

    var indicators = [];
    for (var i = 0; i < pageCount; i++) {
      indicators.push(this.renderIndicator(i))
    }

    return (
      // Modified for the split
      <Animated.View style={[styles.tabContainer, split]}>
        <View style={styles.tabs}
          onLayout={(event) => {
              var viewWidth = event.nativeEvent.layout.width;
              if (!viewWidth || this.state.viewWidth === viewWidth) {
                return;
              }
              this.setState({
                viewWidth: viewWidth,
              });
            }}>
          {indicators}
          <Animated.View style={[styles.curDot, {left}]} />
        </View>
      </Animated.View>
    );
  },
});

module.exports = ViewPageIndicator;
