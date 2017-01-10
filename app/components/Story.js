import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import StoryCard from './story/StoryCard';
import ViewPager from 'react-native-viewpager';
import Arabic from '../../stories/ar/chapters.js';
import English from '../../stories/en/chapters.js';
import Persian from '../../stories/fa/chapters.js';
import Swedish from '../../stories/sv/chapters.js';

class Story extends Component {
  constructor(props) {
    super(props);

    const tempData = English.chapters[0].sections.map((section, index) => {
      return {
        topText: Arabic.chapters[0].sections[index],
        bottomText: section,
      };
    });

    const ds = new ViewPager.DataSource({pageHasChanged: (r1, r2) => r1.text !== r2.text});
    this.state = {
      data: ds.cloneWithPages(tempData),
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.handleNavigate({
      type: 'pop',
      route: {key: 'pop'},
    });
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
          renderPage={(data) => <StoryCard topText={data.topText} bottomText={data.bottomText} />}
        />
      </View>
    );
  }
}

Story.propTypes = {
  handleNavigate: React.PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
  },
  button: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingVertical: 10,
  }
});

export default Story;
