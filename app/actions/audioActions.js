export const PLAY_AUDIO_TRACK = 'PLAY_AUDIO_TRACK';

export function playAudioTrack(trackId) {
  return {
    type: PLAY_AUDIO_TRACK,
    trackId,
  };
}

export const PAUSE_AUDIO_TRACK = 'PAUSE_AUDIO_TRACK';

export function pauseAudioTrack() {
  return {
    type: PAUSE_AUDIO_TRACK,
  };
}

export const SHOW_AUDIO_MENU = 'SHOW_AUDIO_MENU';

export function showAudioMenu() {
  return {
    type: SHOW_AUDIO_MENU,
  };
}
export const HIDE_AUDIO_MENU = 'HIDE_AUDIO_MENU';

export function hideAudioMenu() {
  return {
    type: HIDE_AUDIO_MENU,
  };
}
