import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';

const midHeight = Dimensions.get('window').height/2;

class StoryCard extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      height: new Animated.Value() 
    };
  }

  componentWillMount() {
    if (this.props.isSplit) {
      this.state.height.setValue(midHeight);
    } else {
      this.state.height.setValue(0);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSplit != this.props.isSplit) {
      Animated.timing(
        this.state.height,
        { 
          toValue: this.props.isSplit ? 0 : midHeight,
          duration: 100
        }
      ).start();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={[{height: this.state.height}, 
                                styles.card, 
                                styles.topCard]} >
          <Text style={styles.text}>
            {this.props.topText}
          </Text>
        </Animated.View>
        <View style={[ styles.card, styles.bottomCard]} >
          <Text style={styles.text}>
            {this.props.bottomText}
          </Text>
        </View>
      </View>
    );
  }
}

StoryCard.propTypes = {
  isSplit: React.PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
  },
  card: {
    borderTopWidth: 1,
    borderColor: 'black',
    padding: 20,
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
