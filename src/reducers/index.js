import { combineReducers } from 'redux';
import isPlaying from './isPlaying';
import songs from './songs';
import likedSongs from './likedSongs';
import likedArtists from './likedArtists';

export default combineReducers({
	isPlaying,
	songs,
	likedSongs,
	likedArtists
});
