import React from 'react';
import { connect } from 'react-redux';
import {
	nextSong,
	likeSong,
	unlikeSong,
	togglePlaying
} from '../actions';
import { NowPlaying } from '../components/NowPlaying';

const mapStateToProps = (state) => {
	const currentSong = state.songs[0];

	return {
		artist: currentSong ? currentSong['artist'] : '',
		title: currentSong ? currentSong['title'] : '',
		image: currentSong ? currentSong['image'] : '',
		preview: currentSong ? currentSong['preview'] : '',
		isPlaying: state.isPlaying,
		isLiked: currentSong ? state.likedSongs.filter(song => {
			return (song.title === currentSong['title']) && (song.artist === currentSong['artist']);
		}).length >= 1 : false
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		playSong: () => {
			dispatch(togglePlaying());
		},
		pauseSong: () => {
			dispatch(togglePlaying());
		},
		likeSong: (song) => {
			dispatch(likeSong(song));
		},
		unlikeSong: (song) => {
			dispatch(unlikeSong(song));
		},
		nextSong: () => {
			dispatch(nextSong());
		}
	};
};

export const NowPlayingContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(NowPlaying);
