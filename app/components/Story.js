import React, { Component } from 'react';
import {View, Text} from 'react-native';

class Story extends Component {
  render() {
    return (
      <View>
        <Text>
          Placeholder Story component
        </Text>
        <Text>
          {`Nav Count: ${this.props.count}`}
        </Text>
      </View>
    );
  }
}

export default Story;