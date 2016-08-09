import reducer from '../../../src/reducers/index';
import {
	LIKE_SONG,
	UNLIKE_SONG
} from '../../../src/actions';
import { expect } from 'chai';

describe('likedSongs', () => {
	describe('#LIKE_SONG', () => {
		it('handles LIKE_SONG', () => {
			const initialState = {
				isPlaying: false,
				songs: [],
				likedSongs: [],
				likedArtists: []
			};
			const action = {
				type: LIKE_SONG,
				song: {
					title: 'Baby',
					artist: 'Justin Bieber'
				}
			};
			const nextState = reducer(initialState, action);

			expect(nextState).to.deep.equal({
				isPlaying: false,
				songs: [],
				likedSongs: [
					{
						title: 'Baby',
						artist: 'Justin Bieber'
					}
				],
				likedArtists: []
			});

			it('handles LIKE_SONG with liked songs already in state', () => {
				const initialState = {
					isPlaying: false,
					songs: [],
					likedSongs: [
						{
							title: 'Baby',
							artist: 'Justin Bieber'
						}
					],
					likedArtists: []
				};
				const action = {
					type: LIKE_SONG,
					song: {
						title: 'Love Yourself',
						artist: 'Justin Bieber'
					}
				};
				const nextState = reducer(initialState, action);

				expect(nextState).to.deep.equal({
					isPlaying: false,
					songs: [],
					likedSongs: [
						{ title: 'Baby', artist: 'Justin Bieber' },
						{ title: 'Love Yourself', artist: 'Justin Bieber' }
					],
					likedArtists: []
				});
			});

			it('should not have duplicate Liked Songs', () => {
				const initialState = {
					isPlaying: false,
					songs: [],
					likedSongs: [
						{
							title: 'Baby',
							artist: 'Justin Bieber'
						}
					],
					likedArtists: []
				};
				const action = {
					type: 'LIKE_SONG',
					song: {
						title: 'Baby',
						artist: 'Justin Bieber'
					}
				};
				const nextState = reducer(initialState, action);

				expect(nextState).to.deep.equal({
					isPlaying: false,
					songs: [],
					likedSongs: [{ title: 'Baby', artist: 'Justin Bieber' }],
					likedArtists: []
				});
			});
		});
	});

	describe('#UNLIKE_SONG', () => {
		it('handles UNLIKE_SONG', () => {
			const initialState = {
				isPlaying: false,
				songs: [],
				likedSongs: [
					{
						title: 'Love Yourself',
						artist: 'Justin Bieber'
					},
					{
						title: 'Baby',
						artist: 'Justin Bieber'
					}
				],
				likedArtists: []
			};
			const action = {
				type: UNLIKE_SONG,
				song: {
					title: 'Baby',
					artist: 'Justin Bieber'
				}
			};
			const nextState = reducer(initialState, action);

			expect(nextState).to.deep.equal({
				isPlaying: false,
				songs: [],
				likedSongs: [
					{ title: 'Love Yourself', artist: 'Justin Bieber' }
				],
				likedArtists: []
			});
		});

		it('should do nothing if liked song isn\'t found', () => {
			const initialState = {
				isPlaying: false,
				songs: [],
				likedSongs: [
					{
						title: 'Baby',
						artist: 'Justin Bieber'
					}
				],
				likedArtists: []
			};
			const action = {
				type: UNLIKE_SONG,
				song: {
					title: 'Love Yourself',
					artist: 'Justin Bieber'
				}
			};
			const nextState = reducer(initialState, action);

			expect(nextState).to.deep.equal({
				isPlaying: false,
				songs: [],
				likedSongs: [
					{
						title: 'Baby',
						artist: 'Justin Bieber'
					}
				],
				likedArtists: []
			});
		});
	});
});
