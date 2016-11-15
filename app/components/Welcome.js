import React, { Component } from 'react';
import {TouchableHighlight, View, Text } from 'react-native';

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.handleNavigate({
      type: 'push',
      route: {
        key: 'placeHolder',
      },
    });
  }

  render() {
    return (
      <View>
        <Text>
          Welcome!
        </Text>
        <TouchableHighlight onPress={this.onClick}>
          <Text>Click here for next page</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Welcome;