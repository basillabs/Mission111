import React, { Component } from 'react';
import {
  StyleSheet,
  Picker,
} from 'react-native';
import {
  EN_LABEL, SV_LABEL, AR_LABEL,
  EN_CODE, SV_CODE, AR_CODE,
} from '../constants/languageConstants';
import {
  BROWN
} from '../constants/colorConstants';

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

class LanguagePicker extends Component {
  render() {
    return (
      <Picker
        itemStyle={styles.pickerItem}
        {...this.props}>
        {CODE_OPTIONS.map((option, i) => {
          return <Picker.Item
                   key={i}
                   label={option.label}
                   value={option.value} />;
        })}
      </Picker>
    );
  }
}

LanguagePicker.propTypes = {
  selectedValue: React.PropTypes.string.isRequired,
  onValueChange: React.PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  pickerItem: {
    fontSize: 14,
    textAlign: 'left',
    color: BROWN,
  },
});

export default LanguagePicker;
