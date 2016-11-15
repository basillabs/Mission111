import React, { Component } from 'react';
import {View, Text} from 'react-native';

class Exercises extends Component {
  render() {
    return (
      <View>
        <Text>
          Placeholder Exercises component
        </Text>
        <Text>
          {`Nav Count: ${this.props.count}`}
        </Text>
      </View>
    );
  }
}

export default Exercises;