export const SET_TOP_LANGUAGE = 'SET_TOP_LANGUAGE';
export const SET_BOTTOM_LANGUAGE = 'SET_BOTTOM_LANGUAGE';

export function setTopLanguage(language) {
  return {
    type: SET_TOP_LANGUAGE,
    language,
  };
}

export function setBottomLanguage(language) {
  return {
    type: SET_BOTTOM_LANGUAGE,
    language,
  };
}
