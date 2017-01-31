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
});

class SideMenu extends Component {
	render() {
    return (
      <View scrollsToTop={false} style={styles.menu}>
        {this.props.chapters.map((chapter, i) => {
          return (
            <Text
              key={`chapter-${i}`}
              onPress={() => false}
              style={styles.item}>
            {chapter.title}
            </Text>
          );
        })}
      </View>
    );
	}
}
SideMenu.propTypes = {
  chapters: React.PropTypes.array,
};
SideMenu.defaultProps = {
  chapters: [],
};

export default SideMenu;
