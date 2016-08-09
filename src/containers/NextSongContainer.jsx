import React from 'react';
import { connect } from 'react-redux';
import { NextSong } from '../components/NextSong';

const mapStateToProps = (state) => {
	return {
		title: state.songs[1]['title'],
		artist: state.songs[1]['artist']
	};
};

export const NextSongContainer = connect(
	mapStateToProps
)(NextSong);
