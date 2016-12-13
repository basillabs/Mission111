export const SET_LANGUAGE = 'SET_LANGUAGE';

export function setLanguage(languageCode) {
  return {
    type: SET_LANGUAGE,
    code: languageCode,
  };
}
