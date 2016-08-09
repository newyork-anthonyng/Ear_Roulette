import {
	ADD_ARTIST,
	REMOVE_ARTIST
} from '../actions';

export default function(state = [], action) {
	switch(action.type) {
		case ADD_ARTIST:
			return [
				...state,
				action.artist
			];
		case REMOVE_ARTIST:
			return state.filter(artist => {
				return artist !== action.artist;
			});
		default:
			return state;
	}
}
