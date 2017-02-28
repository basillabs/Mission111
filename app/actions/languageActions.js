export const SET_TOP_CODE = 'SET_TOP_CODE';
export const SET_BOTTOM_CODE = 'SET_BOTTOM_CODE';

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
