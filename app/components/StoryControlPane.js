import React, { Component } from 'react';
import Icon from './Icon';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

export const TOOLBAR_HEIGHT = 40;

class StoryControlPane extends Component {
  render() {
    return (
      <View style={styles.pane}>
        <TouchableHighlight onPress={this.props.showMenu}>
          <View>
            <Icon name="hamburger" fill="#FFF8E2" />
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.props.onToggleTap}>
          <View>
            <Icon name="split-view" fill="#FFF8E2" />
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
  pane: {
    backgroundColor: '#181F42',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    height: TOOLBAR_HEIGHT,
  },
});

export default StoryControlPane;
