import { combineReducers } from 'redux';
import {
ADD_SONGS,
NEXT_SONG,
LIKE_SONG,
UNLIKE_SONG,
ADD_ARTIST,
REMOVE_ARTIST,
TOGGLE_PLAYING
} from './actions';

const initialState = {
	isPlaying: false,
	songs: [],
	likedSongs: [],
	likedArtists: []
};

function isPlaying(state = false, action) {
	switch(action.type) {
		case TOGGLE_PLAYING:
			return !state;
		default:
			return state;
	};
}

function songs(state = [], action) {
	switch(action.type) {
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

function likedSongs(state = [], action) {
	switch(action.type) {
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

function likedArtists(state = [], action) {
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

export default combineReducers({
	isPlaying,
	songs,
	likedSongs,
	likedArtists
});
