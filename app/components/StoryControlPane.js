import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
} from 'react-native';


class StoryControlPane extends Component {
  constructor(props) {
    super(props);

    this._onMenuTap = this._onMenuTap.bind(this);
  }

  render() {
    return (
      <View style={styles.pane}>
        <View onTouch={this._onMenuTap}>
          <Text style={styles.icon}>hamburger</Text>
        </View>
      </View>
    );
  }

  _onMenuTap() {
    debugger;
    this.props.showMenu();
  }
}

StoryControlPane.propTypes = {
  showMenu: React.PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  pane: {
    backgroundColor: 'black',
  },
  icon: {
    color: 'white',
  }
});

export default StoryControlPane;
