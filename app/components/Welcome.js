import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(chapterId) {
    this.props.setChapter(chapterId);
    this.props.handleNavigate({
      type: 'push',
      route: { key: 'story', },
    });
  }

  render() {
    return (
      <View style={styles.wrapper} >
        <TouchableHighlight style={styles.button} onPress={this.onClick.bind(this, 0)} >
          <Text style={styles.text}>Click here for Story 1</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this.onClick.bind(this, 1)} >
          <Text style={styles.text}>Click here for Story 2</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this.onClick.bind(this, 2)} >
          <Text style={styles.text}>Click here for Story 3</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this.onClick.bind(this, 3)} >
          <Text style={styles.text}>Click here for Story 4</Text>
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