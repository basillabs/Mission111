import {
  SET_TOP_CODE,
  SET_BOTTOM_CODE,
} from '../constants/languageConstants';

export function setTopCode(code) {
  return {
    type: SET_TOP_CODE,
    code: code,
  };
}

export function setBottomCode(code) {
  return {
    type: SET_BOTTOM_CODE,
    code: code,
  };
}
