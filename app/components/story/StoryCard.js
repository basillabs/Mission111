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
        <View style={[styles.card, styles.topCard]} >
          <Text style={styles.text}>
            {this.props.topText}
          </Text>
        </View>
        <View style={[styles.card, styles.bottomCard]} >
          <Text style={styles.text}>
            {this.props.bottomText}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width
  },
  card: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderTopWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    margin: 8,
    padding: 16,
    paddingTop: 24
  },
  topCard: {
    transform: [{rotate: '180deg'}],
  },
  text: {
    color: '#1f1f1f',
    fontSize: 16,
    lineHeight: 20,
  },
});

export default Story;