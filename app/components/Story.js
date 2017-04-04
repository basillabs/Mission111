import React, { Component } from 'react';
import Icon from './Icon';
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Animated,
} from 'react-native';
import theme from '../utils/theme';
import ViewPager from 'react-native-viewpager';
import ViewPageIndicator from './ViewPageIndicator';
import Stories from '../../stories';
import StoryCard from './story/StoryCard';
import SideMenuContainer from '../containers/SideMenuContainer';
import { TOOLBAR_HEIGHT, MID_HEIGHT } from './story/StoryCard';
import {
  FRICTION, TENSION
} from '../constants/animationConstants';
import tracker from '../tracker';

const MID_ICON_HEIGHT = MID_HEIGHT + 4;

class Story extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.initializeDataSource(),
      isSplit: this.props.viewMode === 'pair',
      fadeAnim: new Animated.Value(),
    };

    this.onClickBack = this.onClickBack.bind(this);
    this.onClickToggle = this.onClickToggle.bind(this);
    this.renderPage = this.renderPage.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
  }

  initializeDataSource(chapterId, topLanguage, bottomLanguage) {
    const dataSource = new ViewPager.DataSource({
      pageHasChanged: (r1, r2) => r1.text !== r2.text,
    });

    return dataSource.cloneWithPages(this.getChapterData(chapterId, topLanguage, bottomLanguage));
  }

  getChapterData(chapterId = this.props.chapterId,
                 topLanguage = this.props.topLanguage,
                 bottomLanguage = this.props.bottomLanguage) {
    const topChapter = Stories[topLanguage.code].chapters[chapterId - 1];
    const bottomChapter = Stories[bottomLanguage.code].chapters[chapterId - 1];

    const titleData = [{
      topContent: {
        text: topChapter.title,
        align: topLanguage.align,
      },
      bottomContent: {
        text: bottomChapter.title,
        align: bottomLanguage.align,
      },
      isTitleCard: true,
      allowLanguageSelection: true,
      index: -1,
    }];

    const chapterData = bottomChapter.sections.map((section, index) =>
      ({
        topContent: {
          text: topChapter.sections[index],
          align: topLanguage.align,
        },
        bottomContent: {
          text: bottomChapter.sections[index],
          align: bottomLanguage.align,
        },
        index,
      }),
    );

    return titleData.concat(chapterData);
  }

  trackChapterChange(chapterNumber) {
    tracker.trackScreenView('Chapter ' + chapterNumber);
  }

  componentDidMount() {
    this.trackChapterChange(this.props.chapterId);
    this.onChangePage(0);
  }

  componentWillReceiveProps(nextProps) {
    Animated.spring(
      this.state.fadeAnim,
      {
        toValue: nextProps.isOpen ? 0.2 : 1,
        friction: FRICTION,
        tension: TENSION,
      }
    ).start();

    if (this.props.chapterId !== nextProps.chapterId) {
      this.trackChapterChange(nextProps.chapterId);

      // The chapter has changed. Reinitialize the data source
      // and set its page back to zero after the data source has
      // been refreshed.
      this.setState({
        data: this.initializeDataSource(nextProps.chapterId),
      }, () => {
        this.viewpager.goToPage(0, false);
      });
    }

    if (this.props.topLanguage.code !== nextProps.topLanguage.code ||
      this.props.bottomLanguage.code != nextProps.bottomLanguage.code) {
      this.setState({
        data: this.initializeDataSource(this.props.chapterId,
                                        nextProps.topLanguage,
                                        nextProps.bottomLanguage),
      });
    }
  }

  componentWillMount() {
    if (this.props.isOpen) {
      this.state.fadeAnim.setValue(0.15);
    } else {
      this.state.fadeAnim.setValue(1);
    }
  }

  onClickBack() {
    this.props.handleNavigate({
      type: 'pop',
      route: { key: 'pop' },
    });
  }

  onClickToggle() {
    tracker.trackEvent('Tap', 'ViewPane', {
      label: 'expanded',
      value: this.state.isSplit ? 1 : 0,
    });

    this.setState({
      isSplit: !this.state.isSplit,
    });
  }

  renderPage(data) {
    return <StoryCard
              topContent={data.topContent}
              bottomContent={data.bottomContent}
              isSplit={this.state.isSplit}
              onToggleTap={this.onClickToggle}
              isTitleCard={data.isTitleCard}
              allowLanguageSelection={data.allowLanguageSelection}
              {...this.props}
            />;
  }

  onChangePage(pageNumber) {
    tracker.trackEvent('View', 'Page', {
      label: this.props.chapterId.toString(),
      value: pageNumber + 1,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <SideMenuContainer />
        <Animated.View style={{opacity: this.state.fadeAnim}}>
          <ViewPager
            renderPageIndicator={() => <ViewPageIndicator isSplit={this.state.isSplit} /> }
            ref={(viewpager) => { this.viewpager = viewpager; }}
            dataSource={this.state.data}
            onChangePage={this.onChangePage}
            renderPage={this.renderPage}
          />
          <TouchableHighlight onPress={this.props.showMenu}>
            <View style={[styles.hamburger, this.getIconStyles()]}>
              <Icon name="hamburger" fill={theme.cardBackground} />
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.onClickToggle}>
            <View style={[styles.toggle, this.getIconStyles()]}>
              <Icon name="split-view" fill={theme.cardBackground} />
            </View>
          </TouchableHighlight>
        </Animated.View>
      </View>
    );
  }

  getIconStyles() {
    if (this.state.isSplit) {
      return [
        {top: MID_ICON_HEIGHT},
        styles.icon,
      ];
    } else {
      return [
        {top: 0},
        styles.icon,
      ];
    }
  }
}

Story.propTypes = {
  handleNavigate: React.PropTypes.func.isRequired,
  viewMode: React.PropTypes.string.isRequired,
  showMenu: React.PropTypes.func.isRequired,
  topLanguage: React.PropTypes.object.isRequired,
  bottomLanguage: React.PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.chrome,
  },
  icon: {
    position: 'absolute',
    padding: 16,
  },
  hamburger: {
    left: 4,
  },
  toggle: {
    right: 4,
  },
});

export default Story;
