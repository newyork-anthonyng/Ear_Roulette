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

export default function(state = initialState, action) {
	let newSongs, newLikedSongs, newLikedArtists;

	switch(action.type) {
		case ADD_SONGS:
			newSongs = [
				...state['songs'],
				...action.songs
			];

			return Object.assign({}, state, {
				songs: newSongs
			});
		case NEXT_SONG:
			newSongs = state['songs'].slice(1);
			return Object.assign({}, state, {
				songs: newSongs
			});
		case LIKE_SONG:
			newLikedSongs =  [
				...state['likedSongs'],
				action.song
			];
			return Object.assign({}, state, {
				likedSongs: newLikedSongs
			});
		case UNLIKE_SONG:
			newLikedSongs = state['likedSongs'].filter(song => {
				const sameSong = (song.title === action.song.title) && (song.artist === action.song.artist);
				return !sameSong;
			});
			return Object.assign({}, state, {
				likedSongs: newLikedSongs
			});
		case ADD_ARTIST:
			newLikedArtists = [
				...state['likedArtists'],
				action.artist
			];
			return Object.assign({}, state, {
				likedArtists: newLikedArtists
			});
		case REMOVE_ARTIST:
			newLikedArtists = state['likedArtists'].filter(artist => {
				return artist !== action.artist;
			});
			return Object.assign({}, state, {
				likedArtists: newLikedArtists
			});
		case TOGGLE_PLAYING:
			return Object.assign({}, state, {
				isPlaying: !state['isPlaying']
			});
		default:
			return state;
	};
};
