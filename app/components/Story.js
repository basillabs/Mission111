import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, StatusBar, Dimensions,
 } from 'react-native';
import StoryCard from './story/StoryCard';
<<<<<<< HEAD
import StoryControlPaneContainer from '../containers/StoryControlPaneContainer';
=======
import Icon from './Icon';
>>>>>>> Icons are working
import ViewPager from 'react-native-viewpager';
import Stories from '../../stories';
import SideMenuContainer from '../containers/SideMenuContainer';

class Story extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.initializeDataSource(),
      isSplit: this.props.viewMode === 'pair',
    };

    this.onClickBack = this.onClickBack.bind(this);
    this.onClickToggle = this.onClickToggle.bind(this);
    this.renderPage = this.renderPage.bind(this);
  }

  initializeDataSource(chapterId, topCode, bottomCode) {
    const dataSource = new ViewPager.DataSource({ pageHasChanged: (r1, r2) => r1.text !== r2.text });

    return dataSource.cloneWithPages(this.getChapterData(chapterId, topCode, bottomCode));
  }

  getChapterData(chapterId = this.props.chapterId, 
                 topCode = this.props.topCode,
                 bottomCode = this.props.bottomCode) {
    const topChapters = Stories[topCode].chapters;
    const bottomChapters = Stories[bottomCode].chapters;
    
    return bottomChapters[chapterId - 1].sections.map((section, index) =>
      ({
        topText: topChapters[chapterId - 1].sections[index],
        bottomText: bottomChapters[chapterId - 1].sections[index],
      })
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.chapterId !== nextProps.chapterId) {
      // The chapter has changed. Reinitialize the data source
      // and set its page back to zero after the data source has
      // been refreshed.
      this.setState({
        data: this.initializeDataSource(nextProps.chapterId),
      }, () => {
        this.viewpager.goToPage(0, false);
      });
    }
    
    if (this.props.topCode !== nextProps.topCode || this.props.bottomCode != nextProps.bottomCode) {
      this.setState({
        data: this.initializeDataSource(this.props.chapterId,
                                        nextProps.topCode, 
                                        nextProps.bottomCode),
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
      isSplit: !this.state.isSplit,
    });
  }

  renderPage(data) {
    return <StoryCard
              topText={data.topText}
              bottomText={data.bottomText}
              isSplit={this.state.isSplit}
              onToggleTap={this.onClickToggle}
              {...this.props}
            />;
  }

  render() {
    return (
      <View style={styles.container}>
        <SideMenuContainer />
        <ViewPager
          ref={(viewpager) => {this.viewpager = viewpager}}
          dataSource={this.state.data}
          renderPage={this.renderPage}
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

  },
  toggle: {

  },
  bar: {
    position: "absolute",
    top: (Dimensions.get('window').height / 2) - 7,
    flexDirection: "row"
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
