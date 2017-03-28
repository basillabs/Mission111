import React, { Component } from 'react';

import Svg,{
  Path,
} from 'react-native-svg';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

const PLAYING = 'PLAYING';
const PAUSED = 'PAUSED';

class AudioButton extends Component {
  render() {
    if (!this.props.trackId) {
      return null;
    }
    
    return (
      <TouchableOpacity
        style={styles.player}
        onPress={this.props.onToggle}
      >
        <View>
          <Svg
            width={20}
            height={20}
            viewBox="0 0 25 25"
          >
            <Path
              fill={this.props.isMenuVisible ? '#C35138' : '#93732E'}
              d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
            />
          </Svg>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  player: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    zIndex: 10,
  },
});

AudioButton.propTypes = {
  currentAudioTrack: React.PropTypes.string,
  playAudioTrack: React.PropTypes.func,
  playing: React.PropTypes.bool,
}

export default AudioButton;
