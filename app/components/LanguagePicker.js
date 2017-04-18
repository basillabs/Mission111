import React, { Component } from 'react';
import {
  StyleSheet,
  Picker,
} from 'react-native';
import theme from '../utils/theme';
import languageData from '../../data/languages';

const supportedLanguages = languageData.supported_languages.map((langCode) => {
  return languageData.languages[langCode];
});

class LanguagePicker extends Component {
  constructor(props) {
    super(props);

    this.onValueChange = this.onValueChange.bind(this);
  }

  onValueChange(code) {
    this.props.onValueChange(languageData.languages[code]);
  }

  render() {
    const selectedValue = this.props.selectedValue.code;

    return (
      <Picker
        itemStyle={styles.pickerItem}
        {...this.props}
        selectedValue={selectedValue}
        onValueChange={this.onValueChange}
      >
        {supportedLanguages.map((option, i) => {
          return <Picker.Item
                   key={i}
                   label={option.display_names[option.code]}
                   value={option.code} />;
        })}
      </Picker>
    );
  }
}

LanguagePicker.propTypes = {
  selectedValue: React.PropTypes.object.isRequired,
  onValueChange: React.PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  pickerItem: {
    fontSize: 14,
    textAlign: 'left',
    color: theme.lightText,
  },
});

export default LanguagePicker;
