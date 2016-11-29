import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

class Story extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Placeholder Story card component
        </Text>
        <Text>
          {this.props.text}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    marginTop: 30,
  },
});

export default Story;