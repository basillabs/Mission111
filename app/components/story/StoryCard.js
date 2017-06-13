import React, { Component } from 'react';
import Icon from '.././Icon';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Picker,
} from 'react-native';
import theme from '../../utils/theme';
import LanguagePicker from '../LanguagePicker';
import tracker from '../../tracker';
import AudioButton from './AudioButton';
import AudioMenu from './AudioMenu';

export const TOOLBAR_HEIGHT = 40;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;
const TITLE_WIDTH = WINDOW_WIDTH - 115;

export const MID_HEIGHT = WINDOW_HEIGHT/2 - (TOOLBAR_HEIGHT/2) - 8;
const FULL_HEIGHT = (MID_HEIGHT * 2) + 8;

class StoryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topHeight: new Animated.Value(),
      bottomHeight: new Animated.Value(),
      isTopAudioVisible: false,
      isBottomAudioVisible: false,
    };

    this.setTopLanguage = this.setTopLanguage.bind(this);
    this.setBottomLanguage = this.setBottomLanguage.bind(this);
    this.onToggleTopAudio = this.onToggleTopAudio.bind(this);
    this.onToggleBottomAudio = this.onToggleBottomAudio.bind(this);
  }

  componentWillMount() {
    if (this.props.isSplit) {
      this.state.topHeight.setValue(MID_HEIGHT);
      this.state.bottomHeight.setValue(MID_HEIGHT);
    } else {
      this.state.topHeight.setValue(0);
      this.state.bottomHeight.setValue(FULL_HEIGHT);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSplit != this.props.isSplit) {
      Animated.timing(
        this.state.topHeight,
        {
          toValue: this.props.isSplit ? 0 : MID_HEIGHT,
          duration: 100
        }
      ).start();

      Animated.timing(
        this.state.bottomHeight,
        {
          toValue: this.props.isSplit ? FULL_HEIGHT : MID_HEIGHT,
          duration: 100
        }
      ).start();
    }
  };

  onToggleTopAudio() {
    this.setState({isTopAudioVisible: !this.state.isTopAudioVisible});
  }

  onToggleBottomAudio() {
    this.setState({isBottomAudioVisible: !this.state.isBottomAudioVisible});
  }

  setTopLanguage(language) {
    tracker.trackEvent('Tap', 'Top Language', {
      label: language.code,
      value: 1,
    });

    this.props.setTopLanguage(language);
  }

  setBottomLanguage(language) {
    tracker.trackEvent('Tap', 'Bottom Language', {
      label: language.code,
      value: 1,
    });

    this.props.setBottomLanguage(language);
  }

  isPlayingTrack(track) {
    return this.props.currentAudioTrack === track.trackId;
  }

  renderTextContent(content) {
    return (
      <Text style={this.getTextStyles(content)}>
        {content.text}
      </Text>
    );
  }

  renderTitleIcon() {
    return this.props.isTitleCard && (
      <View style={styles.chevron}>
        <Icon name="chevron-right" size={30} fill={theme.accent} />
      </View>
    );
  }

  renderLanguageSelector(language, onValueChange) {
    return (
      <LanguagePicker
        selectedValue={language}
        onValueChange={onValueChange}
      />
    );
  }

  renderAudioButton(content, highlighted, onToggle) {
    return content.trackId && (
      <AudioButton
        highlighted={highlighted}
        onToggle={onToggle}
        disabled={!content.trackUrl}
      />
    );
  }

  renderAudioMenu(content, isVisible) {
    return (
      <AudioMenu
        autoPlay
        isVisible={isVisible}
        playAudioTrack={this.props.playAudioTrack}
        pauseAudioTrack={this.props.pauseAudioTrack}
        isPlaying={this.isPlayingTrack(content)}
        currentAudioTrack={this.props.currentTrack}
        trackId={content.trackId}
        trackUrl={content.trackUrl}
      />
    );
  }

  render() {
    const {
      topContent,
      bottomContent,
      topLanguage,
      bottomLanguage,
      allowLanguageSelection,
    } = this.props;

    return (
      <View style={styles.container}>
        <Animated.View style={this.getTopCardStyles()}>
          {this.renderTextContent(topContent)}
          {this.renderTitleIcon()}
          {allowLanguageSelection this.renderLanguageSelector(topLanguage, this.setTopLanguage)}
          {this.renderAudioButton(topContent, this.state.isTopAudioVisible, this.onToggleTopAudio)}
          {this.renderAudioMenu(topContent, this.state.isTopAudioVisible)}
        </Animated.View>
        <Animated.View style={this.getBottomCardStyles()}>
          {this.renderTextContent(bottomContent)}
          {this.renderTitleIcon()}
          {allowLanguageSelection this.renderLanguageSelector(bottomLanguage, this.setBottomLanguage)}
          {this.renderAudioButton(bottomContent, this.state.isBottomAudioVisible, this.onToggleBottomAudio)}
          {this.renderAudioMenu(bottomContent, this.state.isBottomAudioVisible)}
        </Animated.View>
      </View>
    );
  }

  getTopCardStyles() {
    if (this.props.isSplit) {
      return [
        {height: this.state.topHeight},
        styles.card,
        styles.topCard,
      ];
    } else {
      return [
        {height: this.state.topHeight},
        styles.collapsedCard,
      ];
    }
  }

  getBottomCardStyles() {
    if (this.props.isSplit) {
      return [
        {height: this.state.bottomHeight},
        styles.card,
      ];
    } else {
      return [
        {height: this.state.bottomHeight},
        styles.card,
      ];
    }
  }

  getTextStyles(content) {
    const { align } = content;

    return [
      styles.text,
      this.props.isTitleCard ? styles.titleCard : null,
      align === 'left' ? styles.ltr : styles.rtl,
    ];
  }
}

StoryCard.propTypes = {
  isTitleCard: React.PropTypes.bool,
  isSplit: React.PropTypes.bool.isRequired,
  topContent: React.PropTypes.object.isRequired,
  bottomContent: React.PropTypes.object.isRequired,
  onToggleTap: React.PropTypes.func.isRequired,
  allowLanguageSelection: React.PropTypes.bool,
  currentAudioTrack: React.PropTypes.string,
  topTrackId: React.PropTypes.string,
  topTrackUrl: React.PropTypes.string,
  bottomTrackId: React.PropTypes.string,
  bottomTrackUrl: React.PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    justifyContent: 'space-between',
  },
  card: {
    borderRadius: 5,
    padding: 15,
    backgroundColor: theme.cardBackground,
    margin: 9,
    overflow: "hidden",
    justifyContent: 'space-between',
    position: 'relative',
  },
  collapsedCard: {
    padding: 0,
    opacity: 0,
  },
  topCard: {
    transform: [{rotate: '180deg'}],
  },
  text: {
    fontSize: 17,
    lineHeight: 24,
    color: theme.text,
  },
  titleCard: {
    fontSize: 24,
    lineHeight: 30,
    color: theme.accent,
    fontWeight: "500",
    paddingTop: 35,
    width: TITLE_WIDTH,
  },
  chevron: {
    position: 'absolute',
    top: 54,
    right: 35,
  },
  rtl: {
    textAlign: 'right',
  },
  ltr: {
    textAlign: 'left',
  },
});

export default StoryCard;
