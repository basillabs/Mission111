import {
  SET_CHAPTER,
} from '../constants/chapterConstants';

const defaultState = {
  chapterId: 1,
};

export default function(state = defaultState, action = {}) {
  switch (action.type) {
    case SET_CHAPTER:
      return Object.assign({}, state, {
        chapterId: action.chapterId,
      });
    default:
      return state;
  }
}
