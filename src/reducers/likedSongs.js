import {
	LOAD_DATA,
	LIKE_SONG,
	UNLIKE_SONG
} from '../actions';

export default function(state = [], action) {
	switch(action.type) {
		case LOAD_DATA:
			return action.data.likedSongs || state;
		case LIKE_SONG:
			return [
				...state,
				action.song
			];
		case UNLIKE_SONG:
			return state.filter(song => {
				const sameSong = (song.title === action.song.title) && (song.artist === action.song.artist);
				return !sameSong;
			});
		default:
			return state;
	}
}
