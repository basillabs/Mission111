export const INCREMENT_COUNT = 'INCREMENT_COUNT';
export const incrementCount = () => ({
  type: INCREMENT_COUNT,
});

export const SET_CHAPTER = 'SET_CHAPTER';
export const setChapter = (chapterId) => ({
  type: SET_CHAPTER,
  chapterId,
});
