import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import ViewPager from 'react-native-viewpager';
import Stories from '../../stories';
import StoryCard from './story/StoryCard';
import StoryControlPaneContainer from '../containers/StoryControlPaneContainer';
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
    const dataSource = new ViewPager.DataSource({
      pageHasChanged: (r1, r2) => r1.text !== r2.text,
    });

    return dataSource.cloneWithPages(this.getChapterData(chapterId, topCode, bottomCode));
  }

  getChapterData(chapterId = this.props.chapterId,
                 topCode = this.props.topCode,
                 bottomCode = this.props.bottomCode) {
    const topChapter = Stories[topCode].chapters[chapterId - 1];
    const bottomChapter = Stories[bottomCode].chapters[chapterId - 1];

    const titleData = [{
      topText: topChapter.title,
      bottomText: bottomChapter.title,
      isTitleCard: true,
      allowLanguageSelection: true,
    }];

    const chapterData = bottomChapter.sections.map((section, index) =>
      ({
        topText: topChapter.sections[index],
        bottomText: bottomChapter.sections[index],
      }),
    );

    return titleData.concat(chapterData);
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
      route: { key: 'pop' },
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
              isTitleCard={data.isTitleCard}
              allowLanguageSelection={data.allowLanguageSelection}
              {...this.props}
            />;
  }

  render() {
    return (
      <View style={styles.container}>
        <SideMenuContainer />
        <ViewPager
          ref={(viewpager) => { this.viewpager = viewpager; }}
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
});

export default Story;
