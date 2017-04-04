import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Picker,
} from 'react-native';
import {
  BEIGE, DARK_BEIGE, BROWN, RED
} from '../../constants/colorConstants';
import LanguagePicker from '../LanguagePicker';
import tracker from '../../tracker';

export const TOOLBAR_HEIGHT = 40;
const WINDOW_HEIGHT = Dimensions.get('window').height;

export const MID_HEIGHT = WINDOW_HEIGHT/2 - (TOOLBAR_HEIGHT/2) - 8;
const FULL_HEIGHT = (MID_HEIGHT * 2) + 8;

class StoryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topHeight: new Animated.Value(),
      bottomHeight: new Animated.Value(),
    };

    this.setTopLanguage = this.setTopLanguage.bind(this);
    this.setBottomLanguage = this.setBottomLanguage.bind(this);
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
          <Text style={this.getTextStyles(topContent)}>
            {topContent.text}
          </Text>

          {allowLanguageSelection ?
            <LanguagePicker selectedValue={topLanguage}
              onValueChange={this.setTopLanguage} />
            : null}

        </Animated.View>
        <Animated.View style={this.getBottomCardStyles()}>
          <Text style={this.getTextStyles(bottomContent)}>
            {bottomContent.text}
          </Text>

          {allowLanguageSelection ?
            <LanguagePicker selectedValue={bottomLanguage}
              onValueChange={this.setBottomLanguage} />
            : null}

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
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: WINDOW_HEIGHT,
    justifyContent: 'space-between',
  },
  card: {
    borderRadius: 5,
    padding: 15,
    backgroundColor: BEIGE,
    borderColor: DARK_BEIGE,
    borderWidth: 5,
    margin: 4,
    overflow: "hidden",
    justifyContent: 'space-between',
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
    color: BROWN,
  },
  titleCard: {
    fontSize: 30,
    lineHeight: 50,
    textAlign: 'center',
    color: RED,
    fontWeight: "500",
    paddingTop: 35,
  },
  rtl: {
    textAlign: 'right',
  },
  ltr: {
    textAlign: 'left',
  },
});

export default StoryCard;
