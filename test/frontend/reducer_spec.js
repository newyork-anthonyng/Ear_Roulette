import reducer from '../../src/reducer';
import {
	ADD_SONGS,
	NEXT_SONG,
	LIKE_SONG,
	UNLIKE_SONG,
	ADD_ARTIST,
	REMOVE_ARTIST,
	TOGGLE_PLAYING
} from '../../src/actions';
import { expect } from 'chai';

describe('reducer', () => {

	describe('ADD_SONGS', () => {
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

	describe('NEXT_SONG', () => {
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

	describe('LIKE_SONG', () => {
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

	describe('UNLIKE_SONG', () => {
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

	describe('ADD_ARTIST', () => {
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

	describe('REMOVE_ARTIST', () => {
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

	describe('TOGGLE_PLAYING', () => {
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
