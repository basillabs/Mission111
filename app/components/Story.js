import React, { Component } from 'react';
import StoryCard from './story/StoryCard';
import ViewPager from 'react-native-viewpager';
import Arabic from '../../stories/ar/chapters.js';
import English from '../../stories/en/chapters.js';

class Story extends Component {
  constructor(props) {
    super(props);

    const tempData = [];

    English.chapters[0].sections.forEach((section, index) => {
      tempData.push({
        topText: Arabic.chapters[0].sections[index],
        bottomText: English.chapters[0].sections[index],
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