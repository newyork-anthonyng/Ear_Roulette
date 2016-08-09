import {
	TOGGLE_PLAYING
} from '../actions';

export default function(state = false, action) {
	switch(action.type) {
		case TOGGLE_PLAYING:
			return !state;
		default:
			return state;
	};
}
