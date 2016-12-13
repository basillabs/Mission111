import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(type) {
    this.props.handleNavigate({
      type: 'push',
      route: {
        key: 'storyList',
      },
      data: {
        language: type,
      }
    });
  }

  render() {
    return (
      <View style={styles.wrapper} >
        <TouchableHighlight
          style={styles.button}
          onPress={this.onClick.bind(this, 'English')}
        >
          <Text style={styles.text}>Click here for One Language</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={this.onClick.bind(this, 'Swedish')}
        >
          <Text style={styles.text}>Click here for Two Languages</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 30,
  },
  button: {
    padding: 10,
    borderColor: 'black',
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 20,
  },
});

Welcome.propTypes = {
  incrementCount: React.PropTypes.func,
  handleNavigate: React.PropTypes.func,
};

export default Welcome;