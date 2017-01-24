import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight,   Dimensions,
 } from 'react-native';
import StoryCard from './story/StoryCard';
import ViewPager from 'react-native-viewpager';
import Arabic from '../../stories/ar/chapters.js';
import English from '../../stories/en/chapters.js';
import Persian from '../../stories/fa/chapters.js';
import Swedish from '../../stories/sv/chapters.js';

class Story extends Component {
  constructor(props) {
    super(props);

    const tempData = English.chapters[this.props.chapterId - 1].sections.map((section, index) =>
      ({
        topText: Arabic.chapters[this.props.chapterId - 1].sections[index],
        bottomText: English.chapters[this.props.chapterId - 1].sections[index],
      })
    );

    const ds = new ViewPager.DataSource({pageHasChanged: (r1, r2) => r1.text !== r2.text});
    this.state = {
      data: ds.cloneWithPages(tempData),
    };

    this.onClick = this.onClick.bind(this);
    this._renderPage = this._renderPage.bind(this);
  }

  onClick() {
    this.props.handleNavigate({
      type: 'pop',
      route: {key: 'pop'},
    });
  }

  _renderPage(data) {
    if (this.props.viewMode === 'single') {
      return (
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.text}>
              {data.topText}
            </Text>
          </View>
        </View>
      );
    }

    return <StoryCard topText={data.topText} bottomText={data.bottomText} />;
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.button}
          onPress={this.onClick}
        >
          <Text>Back</Text>
        </TouchableHighlight>
        <ViewPager
          dataSource={this.state.data}
          renderPage={this._renderPage}
        />
      </View>
    );
  }
}

Story.propTypes = {
  handleNavigate: React.PropTypes.func.isRequired,
  viewMode: React.PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 15,
  },
  card: {
    flex: 1,
    padding: 30,
  },
  text: {
    fontSize: 17,
    lineHeight: 24,
  },
});

export default Story;
