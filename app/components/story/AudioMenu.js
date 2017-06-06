import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
 } from 'react-native';

import Svg,{
  Path,
} from 'react-native-svg';

import {
  S3_URL,
} from '../../constants/audioConstants';

import AudioStreamer from 'react-native-audio-streamer';

import { GOLD } from '../../constants/colorConstants';

const HIDDEN_Y = -40;
const VISIBLE_Y = 10;

class AudioMenu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      y: new Animated.Value(HIDDEN_Y),
    };

    this.onTogglePlay = this.onTogglePlay.bind(this);
    this.renderPlayButton = this.renderPlayButton.bind(this);
  }

  componentWillReceiveProps(props) {
    if (this.props.isVisible !== props.isVisible) {
      Animated.timing(
        this.state.y,
        {
          toValue: props.isVisible ? VISIBLE_Y : HIDDEN_Y,
          duration: 230,
        }
      ).start();
    }
  }

  onTogglePlay() {
    if (this.props.isPlaying) {
      AudioStreamer.pause();
      this.props.pauseAudioTrack();
    } else {
      AudioStreamer.setUrl(`${S3_URL}${this.props.trackUrl}`);
      AudioStreamer.play();
      this.props.playAudioTrack(this.props.trackId);
    }
  }

  onRewind() {
    AudioStreamer.seekToTime(0);
  }

  renderPlayButton() {
    if (this.props.isPlaying) {
      return pauseIcon();
    }
    return playIcon();
  }

  render() {
    if (!this.props.trackId) {
      return null;
    }

    return (
      <Animated.View style={[styles.container, { bottom: this.state.y }]}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.firstButton, styles.button]}
            onPress={this.onRewind}
          >
            <Svg
              width={20}
              height={20}
              viewBox="0 0 25 25"
            >
              {rewindIcon()}
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button]}
            onPress={this.onTogglePlay}
          >
            <Svg
              width={20}
              height={20}
              viewBox="0 0 25 25"
            >
              {this.renderPlayButton()}
            </Svg>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: 'black',
    shadowRadius: 1,
    shadowOpacity: .05,
    shadowOffset: {height: 2},
    padding: 5,
    borderRadius: 25,
    flexDirection: 'row',
  },
  firstButton: {
    marginRight: 13,
  },
  button: {
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
});

function rewindIcon() {
  return (<Path fill={GOLD} d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>);
}

function playIcon() {
  return (<Path fill={GOLD} d="M8 5v14l11-7z"/>);
}

function pauseIcon() {
  return (<Path fill={GOLD} d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>);
}

export default AudioMenu;