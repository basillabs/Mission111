import React, { Component } from 'react';
import {View, Text} from 'react-native';

class Vocab extends Component {
  render() {
    return (
      <View>
        <Text>
          Placeholder Vocab component
        </Text>
        <Text>
          {`Nav Count: ${this.props.count}`}
        </Text>
      </View>
    );
  }
}

export default Vocab;