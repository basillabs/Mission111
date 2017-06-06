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
import theme from '../../utils/theme';

const BUTTON_PATH = 'M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z';

class AudioButton extends Component {
  getButtonColor() {
    if (this.props.disabled) {
      return theme.chrome;
    }

    if (this.props.highlighted) {
      return theme.highlightedButton;
    }

    return theme.lightText;
  }

  renderButtonIcon() {
    return (
      <View>
        <Svg
          width={20}
          height={20}
          viewBox="0 0 25 25"
        >
          <Path
            fill={this.getButtonColor()}
            d={BUTTON_PATH}
          />
        </Svg>
      </View>
    );
  }

  render() {
    if (!this.props.trackId) {
      return null;
    }

    if (this.props.disabled) {
      return (
        <View style={styles.player}>
          {this.renderButtonIcon()}
        </View>
      );
    }

    return (
      <TouchableOpacity
        style={styles.player}
        onPress={this.props.onToggle}
      >
        {this.renderButtonIcon()}
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
  disabled: React.PropTypes.bool,
  highlighted: React.PropTypes.bool,
}

export default AudioButton;
