import React from 'react';
import { connect } from 'react-redux';
import { NextSong } from '../components/NextSong';

const mapStateToProps = (state) => {
	const nextSong = state.songs[1];

	return {
		title: nextSong ? nextSong['title'] : '',
		artist: nextSong ? nextSong['artist']: ''
	};
};

export const NextSongContainer = connect(
	mapStateToProps
)(NextSong);
