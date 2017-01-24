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
    title: 'Story One',
    id: 1,
    type: 'single',
  },
  {
    title: 'Story Two',
    id: 2,
    type: 'single',
  },
  {
    title: 'Story Three',
    id: 3,
    type: 'single',
  },
  {
    title: 'Story Four',
    id: 4,
    type: 'single',
  },
];

const SWEDISH_LIST = [
  {
    title: 'Story En',
    id: 1,
    type: 'pair',
  },
  {
    title: 'Story Två',
    id: 2,
    type: 'pair',
  },
  {
    title: 'Story Tre',
    id: 3,
    type: 'pair',
  },
  {
    title: 'Story Fyra',
    id: 4,
    type: 'pair',
  },
];

class StoryList extends Component {
  constructor(props) {
    super(props);

    this.renderRows = this.renderRows.bind(this);
  }

  onClick(chapterId, type) {
    this.props.setChapter(chapterId);
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
  handleNavigate: React.PropTypes.func,
  language: React.PropTypes.string,
};

export default StoryList;