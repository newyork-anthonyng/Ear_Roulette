import reducer from '../../../src/reducers/index';
import {
	ADD_ARTIST,
	REMOVE_ARTIST
} from '../../../src/actions';
import { expect } from 'chai';

describe('likedArtists', () => {
	describe('#ADD_ARTIST', () => {
		it('handles ADD_ARTIST', () => {
			const initialState = {
				isPlaying: false,
				songs: [],
				likedSongs: [],
				likedArtists: []
			};
			const action = {
				type: ADD_ARTIST,
				artist: 'Justin Bieber'
			};
			const nextState = reducer(initialState, action);

			expect(nextState).to.deep.equal({
				isPlaying: false,
				songs: [],
				likedSongs: [],
				likedArtists: ['Justin Bieber']
			});
		});

		it('handles ADD_ARTIST when liked artist already exists in state', () => {
			const initialState = {
				isPlaying: false,
				songs: [],
				likedSongs: [],
				likedArtists: ['Justin Bieber']
			};
			const action = {
				type: ADD_ARTIST,
				artist: 'Metallica'
			};
			const nextState = reducer(initialState, action);

			expect(nextState).to.deep.equal({
				isPlaying: false,
				songs: [],
				likedSongs: [],
				likedArtists: ['Justin Bieber', 'Metallica']
			});
		});
	});

	describe('#REMOVE_ARTIST', () => {
		it('handles REMOVE_ARTIST', () => {
			const initialState = {
				isPlaying: false,
				songs: [],
				likedSongs: [],
				likedArtists: ['Justin Bieber']
			};
			const action = {
				type: REMOVE_ARTIST,
				artist: 'Justin Bieber'
			};
			const nextState = reducer(initialState, action);

			expect(nextState).to.deep.equal({
				isPlaying: false,
				songs: [],
				likedSongs: [],
				likedArtists: []
			});
		});

		it('should do nothing if liked artist isn\'t found', () => {
			const initialState = {
				isPlaying: false,
				songs: [],
				likedSongs: [],
				likedArtists: ['Justin Bieber']
			};
			const action = {
				type: REMOVE_ARTIST,
				artist: 'Metallica'
			};
			const nextState = reducer(initialState, action);

			expect(nextState).to.deep.equal({
				isPlaying: false,
				songs: [],
				likedSongs: [],
				likedArtists: ['Justin Bieber']
			});
		});
	});
});
