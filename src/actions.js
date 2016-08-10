export const LOAD_DATA = 'LOAD_DATA';
export const ADD_SONGS = 'ADD_SONGS';
export const NEXT_SONG = 'NEXT_SONG';
export const LIKE_SONG = 'LIKE_SONG';
export const UNLIKE_SONG = 'UNLIKE_SONG';
export const ADD_ARTIST = 'ADD_ARTIST';
export const REMOVE_ARTIST = 'REMOVE_ARTIST';
export const TOGGLE_PLAYING = 'TOGGLE_PLAYING';

export function loadData(data) {
	return {
		type: LOAD_DATA,
		data: data
	};
};

export function addSongs(songs) {
	return {
		type: ADD_SONGS,
		songs: songs
	};
};

export function nextSong() {
	return {
		type: NEXT_SONG
	};
};

export function likeSong(song) {
	return {
		type: LIKE_SONG,
		song: song
	};
};

export function unlikeSong(song) {
	return {
		type: UNLIKE_SONG,
		song: song
	};
};

export function addArtist(artist) {
	return {
		type: ADD_ARTIST,
		artist: artist
	};
};

export function removeArtist(artist) {
	return {
		type: REMOVE_ARTIST,
		artist: artist
	};
};

export function togglePlaying() {
	return {
		type: TOGGLE_PLAYING
	};
};
