import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
} from 'react-native';


class StoryControlPane extends Component {
  render() {
    return (
      <View style={styles.pane}>
        <TouchableHighlight onPress={this.props.showMenu}>
          <Text style={styles.icon}>🍔</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.props.onToggleTap}>
          <Text style={styles.icon}>⬜</Text>
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
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  icon: {
    color: 'white',
  }
});

export default StoryControlPane;
