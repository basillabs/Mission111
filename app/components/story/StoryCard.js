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
  EN_LABEL, SV_LABEL, AR_LABEL,
  EN_CODE, SV_CODE, AR_CODE,
} from '../../constants/languageConstants';
import {
  BEIGE, DARK_BEIGE, BROWN, RED
} from '../../constants/colorConstants';
import LanguagePicker from '../LanguagePicker';
import tracker from '../../tracker';

export const TOOLBAR_HEIGHT = 40;
const WINDOW_HEIGHT = Dimensions.get('window').height;

export const MID_HEIGHT = WINDOW_HEIGHT/2 - (TOOLBAR_HEIGHT/2) - 8;
const FULL_HEIGHT = (MID_HEIGHT * 2) + 8;

const CODE_OPTIONS = [
  {
    label: EN_LABEL,
    value: EN_CODE,
  },
  {
    label: AR_LABEL,
    value: AR_CODE,
  },
  {
    label: SV_LABEL,
    value: SV_CODE,
  },
];

class StoryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topHeight: new Animated.Value(),
      bottomHeight: new Animated.Value(),
    };

    this.setTopCode = this.setTopCode.bind(this);
    this.setBottomCode = this.setBottomCode.bind(this);
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

  setTopCode(code) {
    tracker.trackEvent('Tap', 'Top Language', {
      label: code,
      value: 1,
    });

    this.props.setTopCode(code);
  }

  setBottomCode(code) {
    tracker.trackEvent('Tap', 'Bottom Language', {
      label: code,
      value: 1,
    });

    this.props.setBottomCode(code);
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={this.getTopCardStyles()}>
          <Text style={[styles.text, this.props.isTitleCard ? styles.titleCard : null]}>
            {this.props.topText}
          </Text>

          {this.props.allowLanguageSelection ?
            <LanguagePicker selectedValue={this.props.topCode}
              onValueChange={this.setTopCode} />
            : null}

        </Animated.View>
        <Animated.View style={this.getBottomCardStyles()}>
          <Text style={[styles.text, this.props.isTitleCard ? styles.titleCard : null]}>
            {this.props.bottomText}
          </Text>

          {this.props.allowLanguageSelection ?
            <LanguagePicker selectedValue={this.props.bottomCode}
              onValueChange={this.setBottomCode} />
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
}

StoryCard.propTypes = {
  isTitleCard: React.PropTypes.bool,
  isSplit: React.PropTypes.bool.isRequired,
  topText: React.PropTypes.string.isRequired,
  bottomText: React.PropTypes.string.isRequired,
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
});

export default StoryCard;
