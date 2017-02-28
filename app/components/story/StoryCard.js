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
import StoryControlPaneContainer from '../../containers/StoryControlPaneContainer';
import { TOOLBAR_HEIGHT } from '../StoryControlPane';

const midHeight = Dimensions.get('window').height/2 - TOOLBAR_HEIGHT;
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
        <Animated.View style={this.getTopCardStyles()}>
          <Text style={styles.text}>
            {this.props.topText}
          </Text>
          <Picker 
            itemStyle={styles.pickerItem}
            selectedValue={this.props.topCode}
            onValueChange={(code) => this.props.setTopCode(code)}>
            {CODE_OPTIONS.map((option, i) => {
              return <Picker.Item
                       key={i}
                       label={option.label}
                       value={option.value} />
            })}
          </Picker>
        </Animated.View>
        <StoryControlPaneContainer {...this.props} />
        <View style={[ styles.card, styles.bottomCard]} >
          <Text style={styles.text}>
            {this.props.bottomText}
          </Text>
          <Picker
            itemStyle={styles.pickerItem}
            selectedValue={this.props.bottomCode}
            onValueChange={(code) => this.props.setBottomCode(code)}>
            {CODE_OPTIONS.map((option, i) => {
              return <Picker.Item
                       key={i}
                       label={option.label}
                       value={option.value} />
            })}
          </Picker>
        </View>
      </View>
    );
  }

  getTopCardStyles() {
    if (this.props.isSplit) {
      return [
        {height: this.state.height},
        styles.card,
        styles.topCard,
      ];
    } else {
      return [
        {height: this.state.height},
        styles.card,
        styles.topCard,
        styles.collapsedCard,
      ];
    }
  }
}

StoryCard.propTypes = {
  isSplit: React.PropTypes.bool.isRequired,
  topText: React.PropTypes.string.isRequired,
  bottomText: React.PropTypes.string.isRequired,
  onToggleTap: React.PropTypes.func.isRequired,
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
  collapsedCard: {
    padding: 0,
  },
  topCard: {
    transform: [{rotate: '180deg'}],
  },
  text: {
    fontSize: 17,
    lineHeight: 24,
  },
  pickerItem: {
    fontSize: 14,
    textAlign: 'left',
  }
});

export default StoryCard;
