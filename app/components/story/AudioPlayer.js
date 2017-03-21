import React, { Component } from 'react';

import { StyleSheet, View, Text, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import AudioStreamer from 'react-native-audio-streamer';

const PLAYING = 'PLAYING';
const PAUSED = 'PAUSED';

class AudioPlayer extends Component {
  constructor(props) {
    super(props);

    // TODO: use real music url,
    this.state = {
      playing: false,
    };

    this.onClick = this.onClick.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  onClick() {
    if (this.props.playing) {
      AudioStreamer.pause();
      this.props.pauseAudioTrack();
    } else {
      AudioStreamer.setUrl(this.props.trackUrl);
      AudioStreamer.play();
      this.props.playAudioTrack(this.props.trackId);
    }
  }

  renderButton() {
    if (this.props.playing) {
      return <Text>Stop</Text>;
    }

    return <Text>Play</Text>;
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.player}
        onPress={this.onClick.bind(this)}
      >
        <View>
          {this.renderButton()}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  player: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

AudioPlayer.propTypes = {
  currentAudioTrack: React.PropTypes.string,
  playAudioTrack: React.PropTypes.func.isRequired,
  playing: React.PropTypes.bool.isRequired,
}

export default AudioPlayer;
