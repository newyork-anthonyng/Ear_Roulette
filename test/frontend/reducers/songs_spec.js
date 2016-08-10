import reducer from '../../../src/reducers/index';
import {
	LOAD_DATA,
	ADD_SONGS,
	NEXT_SONG
} from '../../../src/actions';
import { expect } from 'chai';

describe('songs', () => {
	describe('#LOAD_DATA', () => {
		it('handles LOAD_DATA', () => {
			const initialState = {
				isPlaying: false,
				songs: [],
				likedSongs: [],
				likedArtists: []
			};
			const action = {
				type: LOAD_DATA,
				data: {
					songs: [
						{ title: 'Baby', artist: 'Justin Bieber' },
						{ title: 'Love Yourself', artist: 'Justin Bieber' }
					],
					likedSongs: [
						{ title: 'St. Anger', artist: 'Metallica' }
					],
					likedArtists: [
						'Hamilton'
					]
				}
			};
			const nextState = reducer(initialState, action);

			expect(nextState).to.deep.equal({
				isPlaying: false,
				songs: [
					{ title: 'Baby', artist: 'Justin Bieber' },
					{ title: 'Love Yourself', artist: 'Justin Bieber' }
				],
				likedSongs: [
					{ title: 'St. Anger', artist: 'Metallica' }
				],
				likedArtists: [
					'Hamilton'
				]
			});
		});

		it('should override any existing liked songs and artists', () => {
			const initialState = {
				isPlaying: false,
				songs: [
					{ title: 'Baby', artist: 'Justin Bieber' }
				],
				likedSongs: [
					{ title: 'St. Anger', artist: 'Metallica' }
				],
				likedArtists: [
					'Hamilton'
				]
			};
			const action = {
				type: LOAD_DATA,
				data: {
					songs: [
						{ title: 'Call Me Maybe', artist: 'Carly Rae Jepsen' }
					],
					likedSongs: [
						{ title: 'Hello', artist: 'Adele' }
					],
					likedArtists: [
						'Adele'
					]
				}
			};
			const nextState = reducer(initialState, action);

			expect(nextState).to.deep.equal({
				isPlaying: false,
				songs: [
					{ title: 'Call Me Maybe', artist: 'Carly Rae Jepsen' }
				],
				likedSongs: [
					{ title: 'Hello', artist: 'Adele' }
				],
				likedArtists: [
					'Adele'
				]
			});
		});
	});

	describe('#ADD_SONGS', () => {
		it('handles ADD_SONGS', () => {
			const initialState = {
				isPlaying: false,
				songs: [],
				likedSongs: [],
				likedArtists: []
			};
			const action = {
				type: ADD_SONGS,
				songs: [
					{
						title: 'Baby',
						artist: 'Justin Bieber'
					},
					{
						title: 'Love Yourself',
						artist: 'Justin Bieber'
					}
				]
			};
			const nextState = reducer(initialState, action);

			expect(nextState).to.deep.equal({
				isPlaying: false,
				songs: [
					{ title: 'Baby', artist: 'Justin Bieber' },
					{ title: 'Love Yourself', artist: 'Justin Bieber' }
				],
				likedSongs: [],
				likedArtists: []
			});
		});

		it('handles ADD_SONGS with songs already in state', () => {
			const initialState = {
				isPlaying: false,
				songs: [
					{
						title: 'Baby',
						artist: 'Justin Bieber'
					}
				],
				likedSongs: [],
				likedArtists: []
			};
			const action = {
				type: ADD_SONGS,
				songs: [
					{
						title: 'Love Yourself',
						artist: 'Justin Bieber'
					},
					{
						title: 'Call Me Maybe',
						artist: 'Carly Rae Jepsen'
					}
				]
			};
			const nextState = reducer(initialState, action);

			expect(nextState).to.deep.equal({
				isPlaying: false,
				songs: [
					{
						title: 'Baby',
						artist: 'Justin Bieber'
					},
					{
						title: 'Love Yourself',
						artist: 'Justin Bieber'
					},
					{
						title: 'Call Me Maybe',
						artist: 'Carly Rae Jepsen'
					}
				],
				likedSongs: [],
				likedArtists: []
			});
		});
	});

	describe('#NEXT_SONG', () => {
		it('handles NEXT_SONG', () => {
			const initialState = {
				isPlaying: false,
				songs: [],
				likedSongs: [],
				likedArtists: []
			};
			const action = {
				type: NEXT_SONG
			};
			const nextState = reducer(initialState, action);

			expect(nextState).to.be.ok;
		});

		it('handles NEXT_SONG when no songs are available', () => {
			const initialState = {
				isPlaying: false,
				songs: [],
				likedSongs: [],
				likedArtists: []
			};
			const action = {
				type: NEXT_SONG
			};
			const nextState = reducer(initialState, action);

			expect(nextState).to.deep.equal({
				isPlaying: false,
				songs: [],
				likedSongs: [],
				likedArtists: []
			});
		});

		it('removes the first song', () => {
			const initialState = {
				isPlaying: false,
				songs: [
					{
						title: 'Baby',
						artist: 'Justin Bieber'
					},
					{
						title: 'Love Yourself',
						artist: 'Justin Bieber'
					},
					{
						title: 'Call Me Maybe',
						artist: 'Carly Rae Jepsen'
					}
				],
				likedSongs: [],
				likedArtists: []
			};
			const action = {
				type: NEXT_SONG
			};
			const nextState = reducer(initialState, action);

			expect(nextState).to.deep.equal({
				isPlaying: false,
				songs: [
					{
						title: 'Love Yourself',
						artist: 'Justin Bieber'
					},
					{
						title: 'Call Me Maybe',
						artist: 'Carly Rae Jepsen'
					}
				],
				likedSongs: [],
				likedArtists: []
			});
		});
	});
});
