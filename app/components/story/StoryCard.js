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
  DARK_BLUE, BEIGE, DARK_BEIGE, BROWN, RED
} from '../../constants/colorConstants';
import StoryControlPaneContainer from '../../containers/StoryControlPaneContainer';
import { TOOLBAR_HEIGHT } from '../StoryControlPane';
import LanguagePicker from '../LanguagePicker';

const midHeight = Dimensions.get('window').height/2 - (TOOLBAR_HEIGHT/2) - 8;
const fullHeight = (midHeight * 2) + 8;
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

  }

  componentWillMount() {
    if (this.props.isSplit) {
      this.state.topHeight.setValue(midHeight);
      this.state.bottomHeight.setValue(midHeight);
    } else {
      this.state.topHeight.setValue(0);
      this.state.bottomHeight.setValue(fullHeight);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSplit != this.props.isSplit) {
      Animated.timing(
        this.state.topHeight,
        {
          toValue: this.props.isSplit ? 0 : midHeight,
          duration: 100
        }
      ).start();

      Animated.timing(
        this.state.bottomHeight,
        {
          toValue: this.props.isSplit ? fullHeight : midHeight,
          duration: 100
        }
      ).start();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={this.getTopCardStyles()}>
          <Text style={[styles.text, this.props.isTitleCard ? styles.titleCard : null]}>
            {this.props.topText}
          </Text>

          {this.props.allowLanguageSelection ?
            <LanguagePicker selectedValue={this.props.topCode}
              onValueChange={(code) => this.props.setTopCode(code)} />
            : null}

        </Animated.View>
        <StoryControlPaneContainer {...this.props} />
        <Animated.View style={this.getBottomCardStyles()}>
          <View>
            <Text style={[styles.text, this.props.isTitleCard ? styles.titleCard : null]}>
              {this.props.bottomText}
            </Text>
            {this.props.allowLanguageSelection ?
              <LanguagePicker selectedValue={this.props.bottomCode}
                onValueChange={(code) => this.props.setBottomCode(code)} />
              : null}
          </View>
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
    backgroundColor: DARK_BLUE,
  },
  card: {
    borderRadius: 5,
    padding: 15,
    backgroundColor: BEIGE,
    borderColor: DARK_BEIGE,
    borderWidth: 5,
    margin: 4,
    overflow: "hidden",
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
