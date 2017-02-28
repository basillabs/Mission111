import React, { Component } from 'react';

import { StyleSheet, View, Text, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import AudioStreamer from 'react-native-audio-streamer';

class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    AudioStreamer.setUrl('https://ia600706.us.archive.org/4/items/Sample_Audio_Clips_mp3/KuumbaPodcast1.mp3');

    this.state = {
      playing: false,
    };

    this.onClick = this.onClick.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  statusChanged(status) {
    console.log(status);
  }

  componentDidMount() {
    this.subscription = DeviceEventEmitter.addListener('RNAudioStreamerStatusChanged',this.statusChanged.bind(this))
  }

  onClick() {
    if (this.state.playing) {
      AudioStreamer.pause();
      this.setState({playing: false});
    } else {
      AudioStreamer.play();
      this.setState({playing: true});
    }
  }

  renderButton() {
    if (this.state.playing) {
      return <Text>Stop</Text>;
    }

    return <Text>Play</Text>;
  }

  render() {
    return (
      <TouchableOpacity onPress={this.onClick.bind(this)}>
        <View>
          {this.renderButton()}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  player: {
  },
});

export default AudioPlayer;
