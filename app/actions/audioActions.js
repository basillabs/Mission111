import {
  PLAY_AUDIO_TRACK,
  PAUSE_AUDIO_TRACK,
  SHOW_AUDIO_MENU,
  HIDE_AUDIO_MENU,
} from '../constants/audioConstants';

export function playAudioTrack(trackId) {
  return {
    type: PLAY_AUDIO_TRACK,
    trackId,
  };
}

export function pauseAudioTrack() {
  return {
    type: PAUSE_AUDIO_TRACK,
  };
}

export function showAudioMenu() {
  return {
    type: SHOW_AUDIO_MENU,
  };
}

export function hideAudioMenu() {
  return {
    type: HIDE_AUDIO_MENU,
  };
}
