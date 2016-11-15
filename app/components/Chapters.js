import React, { Component } from 'react';
import {View, Text} from 'react-native';

class Chapters extends Component {
  render() {
    return (
      <View>
        <Text>
          Placeholder Chapters component
        </Text>
        <Text>
          {`Nav Count: ${this.props.count}`}
        </Text>
      </View>
    );
  }
}

export default Chapters;