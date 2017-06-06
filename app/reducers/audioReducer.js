import {
  PLAY_AUDIO_TRACK,
  PAUSE_AUDIO_TRACK,
} from '../constants/audioConstants';

const defaultState = {
  currentAudioTrack: null,
};

export default function(state = defaultState, action = {}) {
  switch (action.type) {
    case PLAY_AUDIO_TRACK:
      return Object.assign({}, state, {
        currentAudioTrack: action.trackId,
      });
    case PAUSE_AUDIO_TRACK:
      return Object.assign({}, state, {
        currentAudioTrack: null,
      });
    default:
      return state;
  }
}
