import reducer from '../../../src/reducers/index';
import {
	TOGGLE_PLAYING
} from '../../../src/actions';
import { expect } from 'chai';

describe('isPlaying', () => {
	describe('#TOGGLE_PLAYING', () => {
		it('handles TOGGLE_PLAYING', () => {
			const initialState = {
				isPlaying: false,
				songs: [],
				likedSongs: [],
				likedArtists: []
			};
			const action = {
				type: TOGGLE_PLAYING
			};

			let nextState = reducer(initialState, action);
			expect(nextState).to.deep.equal({
				isPlaying: true,
				songs: [],
				likedSongs: [],
				likedArtists: []
			});

			nextState = reducer(nextState, action);
			expect(nextState).to.deep.equal({
				isPlaying: false,
				songs: [],
				likedSongs: [],
				likedArtists: []
			});
		});
	});
});
