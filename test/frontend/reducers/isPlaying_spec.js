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

		it('should handle boolean values if passed in', () => {
			const initialState = {
				isPlaying: false,
				songs: [],
				likedSongs: [],
				likedArtists: []
			};
			let action = {
				type: TOGGLE_PLAYING,
				isPlaying: false
			};
			let nextState = reducer(initialState, action);
			expect(nextState).to.deep.equal({
				isPlaying: false,
				songs: [],
				likedSongs: [],
				likedArtists: []
			});

			action = {
				type: TOGGLE_PLAYING,
				isPlaying: true
			};
			nextState = reducer(initialState, action);
			expect(nextState).to.deep.equal({
				isPlaying: true,
				songs: [],
				likedSongs: [],
				likedArtists: []
			});
		});
	});
});
