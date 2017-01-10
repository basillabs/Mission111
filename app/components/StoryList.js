import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
} from 'react-native';
import {
  EN_LANG,
  SV_LANG,
} from '../constants/languageConstants';

const ENGLISH_LIST = [
  {
    title: 'Click here for story 1',
    id: 1,
    type: 'single',
  },
  {
    title: 'Click here for story 2',
    id: 2,
    type: 'single',
  },
  {
    title: 'Click here for story 3',
    id: 3,
    type: 'single',
  },
  {
    title: 'Click here for story 4',
    id: 4,
    type: 'single',
  },
];

const SWEDISH_LIST = [
  {
    title: 'Klicka här för Story 1',
    id: 1,
    type: 'pair',
  },
  {
    title: 'Klicka här för Story 2',
    id: 2,
    type: 'pair',
  },
  {
    title: 'Klicka här för Story 3',
    id: 3,
    type: 'pair',
  },
  {
    title: 'Klicka här för Story 4',
    id: 4,
    type: 'pair',
  },
];

class StoryList extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.renderRows = this.renderRows.bind(this);
  }

  onClick(chapterId, type) {
    this.props.handleNavigate({
      type: 'push',
      route: { key: 'story', },
      data: { type },
    });
  }

  renderRows(data, i) {
    return (
      <TouchableHighlight
        style={styles.button}
        onPress={this.onClick.bind(this, data.id, data.type)}
        key={`story-${i}`}
      >
        <Text style={styles.text}>{data.title}</Text>
      </TouchableHighlight>
    );
  }

  render() {
    let list;
    if (this.props.language === EN_LANG) {
      list = ENGLISH_LIST;
    } else {
      list = SWEDISH_LIST;
    }

    return (
      <View style={styles.wrapper} >
        {list.map(this.renderRows)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 30,
  },
  button: {
    padding: 10,
    borderColor: 'black',
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 20,
  },
});

StoryList.propTypes = {
  incrementCount: React.PropTypes.func,
  handleNavigate: React.PropTypes.func,
  language: React.PropTypes.string,
};

export default StoryList;