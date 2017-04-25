import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import theme from '../utils/theme';

class ChapterList extends Component {
  render() {
    return (
      <ScrollView
        style={styles.container}
        automaticallyAdjustContentInsets={false}>
        {this.props.chapters.map((chapter, i) => {
          return (
            <TouchableWithoutFeedback
              key={`chapter-${i}`}
              onPress={this.props.onChapterTap.bind(null, i + 1)}>
              <View style={styles.row}>
                <Text style={[styles.item, styles.index]}>
                  {`${chapter.story}. `}
                </Text>
                <Text style={[styles.item, styles.title]}>
                  {chapter.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
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
    paddingLeft: 30,
    paddingRight: 20,
    backgroundColor: theme.menuBackground,
  },
  row: {
    flexDirection: 'row',
  },
  item: {
    color: theme.menuText,
    fontSize: 18,
    paddingTop: 8,
    paddingBottom: 8,
    fontWeight: "500",
  },
  index: {
    textAlign: 'left',
    width: 35,
  },
  title: {
    flex: 1,
  },
  rtl: {
    textAlign: 'right',
  },
  ltr: {
    textAlign: 'left',
  },
});

export default ChapterList;
