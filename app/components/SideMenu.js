import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  item: {
    fontSize: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  selectedItem: {
    fontWeight: 'bold',
  }
});

class SideMenu extends Component {
	render() {
    return (
      <View scrollsToTop={false} style={styles.menu}>
        {this.props.chapters.map((chapter, i) => {
          const style = (i + 1 === this.props.chapterId)
            ? [styles.item, styles.selectedItem]
            : styles.item;

          return (
            <Text
              key={`chapter-${i}`}
              onPress={this._onChapterSelection.bind(this, i + 1)}
              style={style}>
            {chapter.title}
            </Text>
          );
        })}
      </View>
    );
	}

  _onChapterSelection(chapterIndex) {
    this.props.setChapter(chapterIndex);
  }
}
SideMenu.propTypes = {
  chapters: React.PropTypes.array,
};
SideMenu.defaultProps = {
  chapters: [],
};

export default SideMenu;
