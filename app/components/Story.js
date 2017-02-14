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

    this.state = this._initializeDataSource();

    this.onClickBack = this.onClickBack.bind(this);
    this.onClickToggle = this.onClickToggle.bind(this);
    this._renderPage = this._renderPage.bind(this);
  }

  _initializeDataSource(chapterId) {
    let dataSource = new ViewPager.DataSource({ pageHasChanged: (r1, r2) => r1.text !== r2.text });

    return {
      data: dataSource.cloneWithPages(this._getChapterData(chapterId)),
      isSplit: this.props.viewMode === 'pair',
    };
  }

  _getChapterData(chapterId) {
    if (!chapterId) {
      chapterId = this.props.chapterId;
    }

    return English.chapters[chapterId - 1].sections.map((section, index) =>
      ({
        topText: Arabic.chapters[chapterId - 1].sections[index],
        bottomText: English.chapters[chapterId - 1].sections[index],
      })
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.chapterId !== nextProps.chapterId) {
      // The chapter has changed. Reinitialize the data source
      // and set its page back to zero after the data source has
      // been refreshed.
      this.setState(this._initializeDataSource(nextProps.chapterId), () => {
        this.viewpager.goToPage(0, false);
      });
    }
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
          ref={(viewpager) => {this.viewpager = viewpager}}
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
