import {
	LOAD_DATA,
	ADD_SONGS,
	NEXT_SONG
} from '../actions';

export default function(state = [], action) {
	switch(action.type) {
		case LOAD_DATA:
			return action.data.songs || state;
		case ADD_SONGS:
			return [
				...state,
				...action.songs
			];
		case NEXT_SONG:
			return state.slice(1);
		default:
			return state;
	}
}
