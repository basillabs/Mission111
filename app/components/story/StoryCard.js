import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

class StoryCard extends Component {
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
    width: Dimensions.get('window').width,
  },
  card: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: 'black',
    padding: 30,
  },
  topCard: {
    transform: [{rotate: '180deg'}],
  },
  text: {
    fontSize: 17,
    lineHeight: 24,
  },
});

export default StoryCard;