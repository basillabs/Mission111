import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(key) {
    this.props.handleNavigate({
      type: 'push',
      route: {
        key,
      },
    });
  }

  render() {
    return (
      <View style={styles.wrapper} >
        <TouchableHighlight style={styles.button} onPress={this.onClick.bind(this, 'chapters')} >
          <Text style={styles.text}>Click here for Chapters</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this.onClick.bind(this, 'vocab')} >
          <Text style={styles.text}>Click here for Vocab</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this.onClick.bind(this, 'story')} >
          <Text style={styles.text}>Click here for Story</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this.onClick.bind(this, 'exercises')} >
          <Text style={styles.text}>Click here for Exercises</Text>
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

export default Welcome;