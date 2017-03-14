import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import {
  BEIGE, BROWN, RED
} from '../constants/colorConstants.js'

class ChapterList extends Component {
  render() {
    return (
      <ScrollView
        style={styles.menu}
        automaticallyAdjustContentInsets={false}>
        {this.props.chapters.map((chapter, i) => {
          const style = (i + 1 === this.props.selectedChapterId)
            ? [styles.item, styles.selectedItem]
            : styles.item;

          return (
            <Text
              key={`chapter-${i}`}
              onPress={this.props.onChapterTap.bind(null, i + 1)}
              style={style}>
            {chapter.title}
            </Text>
          );
        })}
      </ScrollView>
    );
  }
}

ChapterList.propTypes = {
  chapters: React.PropTypes.array.isRequired,
  onChapterTap: React.PropTypes.func.isRequired,
  selectedChapterId: React.PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  menu: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 12,
    paddingBottom: 20,
    backgroundColor: BEIGE,
  },
  item: {
    color: BROWN,
    fontSize: 18,
    paddingTop: 8,
    paddingBottom: 8,
    fontWeight: "500",
  },
  selectedItem: {
    color: RED,
  },
});

export default ChapterList;
