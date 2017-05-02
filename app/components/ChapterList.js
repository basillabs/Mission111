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
              <View style={this.getRowStyle()}>
                <Text style={[styles.index, this.getItemStyle()]}>
                  {chapter.story}
                </Text>
                <Text style={[styles.title, this.getItemStyle()]}>
                  {chapter.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    );
  }

  getRowStyle() {
    return this.props.language.align === 'left' ? styles.ltrRow : styles.rtlRow; 
  }

  getItemStyle() {
    return [
      styles.item,
      this.props.language.align === 'left' ? styles.ltr : styles.rtl,
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
  ltrRow: {
    flexDirection: 'row',
  },
  rtlRow: {
    flexDirection: 'row-reverse',
  },
  index: {
    width: 35,
  },
  item: {
    color: theme.menuText,
    fontSize: 18,
    paddingTop: 8,
    paddingBottom: 8,
    fontWeight: "500",
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
