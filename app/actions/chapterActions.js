import {
  SET_CHAPTER,
} from '../constants/chapterConstants';

export const setChapter = (chapterId) => ({
  type: SET_CHAPTER,
  chapterId,
});
