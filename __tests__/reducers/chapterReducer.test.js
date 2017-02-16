import chapterReducer from '../../app/reducers/chapterReducer';
import {
  setChapter,
} from '../../app/actions/chapterActions';
import {
  SET_CHAPTER,
} from '../../app/constants/chapterConstants';

describe('chapter reducer', () => {
  describe('default state', () => {
    it('defaults to 1', () => {
      const state = chapterReducer();
      expect(state.chapterId).toBe(1);
    });
  });

  describe('set chapter', () => {
    it('sets chapter', () => {
      const state = chapterReducer({},
        setChapter(11));
      expect(state.chapterId).toBe(11);
    });
  });
});
