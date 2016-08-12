import {
	TOGGLE_PLAYING
} from '../actions';

export default function(state = false, action) {
	switch(action.type) {
		case TOGGLE_PLAYING:
			if(action.isPlaying !== undefined) {
				return action.isPlaying;
			} else {
				return !state;
			}
		default:
			return state;
	};
}
