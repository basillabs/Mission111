import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions,
 } from 'react-native';
import StoryCard from './story/StoryCard';
import StoryControlPaneContainer from '../containers/StoryControlPaneContainer';
import ViewPager from 'react-native-viewpager';
import Arabic from '../../stories/ar/chapters.js';
import English from '../../stories/en/chapters.js';
import Persian from '../../stories/fa/chapters.js';
import Swedish from '../../stories/sv/chapters.js';
import SideMenuContainer from '../containers/SideMenuContainer';

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
      isSplit: this.props.viewMode === 'pair'
    };

    this.onClickBack = this.onClickBack.bind(this);
    this.onClickToggle = this.onClickToggle.bind(this);
    this._renderPage = this._renderPage.bind(this);
  }

  onClickBack() {
    this.props.handleNavigate({
      type: 'pop',
      route: {key: 'pop'},
    });
  }

  onClickToggle() {
    this.setState({
      isSplit: !this.state.isSplit
    });
  }

  _renderPage(data) {
    return <StoryCard
              topText={data.topText} 
              bottomText={data.bottomText} 
              isSplit={this.state.isSplit} 
            />;
  }

  render() {
    return (
      <View style={styles.container}>
        <SideMenuContainer />
        <TouchableHighlight
          style={styles.button}
          onPress={this.onClickBack}
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
    paddingTop: 10,
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
