import {
	LIKE_SONG,
	UNLIKE_SONG,
	ADD_ARTIST,
	REMOVE_ARTIST
} from '../actions';
import { Utility } from '../utility';

const updateStorage = store => next => action => {
	let result = next(action);

	const updateActions = [
		LIKE_SONG,
		UNLIKE_SONG,
		ADD_ARTIST,
		REMOVE_ARTIST
	];
	const shouldUpdate = updateActions.includes(action.type);

	if(shouldUpdate) {
		const { likedSongs, likedArtists } = store.getState();
		const updatedInfo = {
			likedSongs: likedSongs,
			likedArtists: likedArtists
		};

		Utility.saveToLocalStorage(updatedInfo);
	}
	return result;
};

export { updateStorage };
