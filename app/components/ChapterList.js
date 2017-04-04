import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import theme from '../utils/theme';

class ChapterList extends Component {
  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        automaticallyAdjustContentInsets={false}>
        {this.props.chapters.map((chapter, i) => {
          return (
            <Text
              key={`chapter-${i}`}
              onPress={this.props.onChapterTap.bind(null, i + 1)}
              style={styles.item}>
              {chapter.title}
            </Text>
          );
        })}
      </ScrollView>
    );
  }

  getItemStyle(index) {
    const {
      selectedChapterId,
      language,
    } = this.props;

    return [
      styles.item,
      index + 1 === selectedChapterId ? styles.selectedItem : null,
      language.align === 'left' ? styles.ltr : styles.rtl,
    ];
  }
}

ChapterList.propTypes = {
  language: React.PropTypes.object.isRequired,
  chapters: React.PropTypes.array.isRequired,
  onChapterTap: React.PropTypes.func.isRequired,
  selectedChapterId: React.PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: theme.menuBackground,
  },
  item: {
    color: theme.text,
    fontSize: 18,
    paddingTop: 8,
    paddingBottom: 8,
    fontWeight: "500",
  },
  rtl: {
    textAlign: 'right',
  },
  ltr: {
    textAlign: 'left',
  },
});

export default ChapterList;
