import React, { Component } from 'react';
import StoryCard from './story/StoryCard';
import ViewPager from 'react-native-viewpager';
import Arabic from '../../stories/arabic/chapters.js';
import English from '../../stories/english/chapters.js';
import Persian from '../../stories/persian/chapters.js';
import Swedish from '../../stories/swedish/chapters.js';

class Story extends Component {
  constructor(props) {
    super(props);

    const tempData = [];

    English.chapters[this.props.chapterId].sections.forEach((section, index) => {
      tempData.push({
        topText: Arabic.chapters[this.props.chapterId].sections[index],
        bottomText: English.chapters[this.props.chapterId].sections[index],
      });
    });

    const ds = new ViewPager.DataSource({pageHasChanged: (r1, r2) => r1.text !== r2.text});
    this.state = {
      data: ds.cloneWithPages(tempData),
    };
  }

  render() {
    return (
      <ViewPager
        dataSource={this.state.data}
        renderPage={(data) => <StoryCard topText={data.topText} bottomText={data.bottomText} />}
      />
    );
  }
}

export default Story;
