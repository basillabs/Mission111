import React, { Component } from 'react';
import StoryCard from './story/StoryCard';
import ViewPager from 'react-native-viewpager';

const tempData = [
  {
    text: 'card 1',
  },
  {
    text: 'card 2',
  },
  {
    text: 'card 3',
  },
  {
    text: 'card 4',
  },
  {
    text: 'card 5',
  },
];

class Story extends Component {
  constructor(props) {
    super(props);

    const ds = new ViewPager.DataSource({pageHasChanged: (r1, r2) => r1.text !== r2.text});
    this.state = {
      data: ds.cloneWithPages(tempData),
    };
  }

  render() {
    return (
      <ViewPager
        dataSource={this.state.data}
        renderPage={(data) => <StoryCard text={data.text} />}
      />
    );
  }
}

export default Story;