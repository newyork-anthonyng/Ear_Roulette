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
	return {
		artist: state.songs[0]['artist'],
		title: state.songs[0]['title'],
		src: state.songs[0]['src'],
		isPlaying: state.isPlaying,
		isLiked: state.likedSongs.filter(song => {
			return song.title === state.songs[0]['title'] && song.artist === state.songs[0]['artist'];
		}).length >= 1
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
		}
	};
};

export const NowPlayingContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(NowPlaying);
