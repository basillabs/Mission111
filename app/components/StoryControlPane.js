import React, { Component } from 'react';
import Icon from './Icon';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import {
  BEIGE, DARK_BLUE
} from '../constants/colorConstants.js'

export const TOOLBAR_HEIGHT = 40;

class StoryControlPane extends Component {
  render() {
    return (
      <View style={styles.pane}>
        <TouchableHighlight onPress={this.props.showMenu}>
          <View style={styles.icon}>
            <Icon name="hamburger" fill={BEIGE} />
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.props.onToggleTap}>
          <View style={styles.icon}>
            <Icon name="split-view" fill={BEIGE} />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

StoryControlPane.propTypes = {
  showMenu: React.PropTypes.func.isRequired,
  onToggleTap: React.PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  icon: {
    position: 'relative',
    top: 2,
  },
  pane: {
    backgroundColor: DARK_BLUE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    height: TOOLBAR_HEIGHT,
  },
});

export default StoryControlPane;
