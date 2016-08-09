import React from 'react';
import { connect } from 'react-redux';
import {
	unlikeSong
} from '../actions';
import { LikedSongList } from '../components/LikedSongList';

const mapStateToProps = (state) => {
	return {
		likedSongs: state.likedSongs
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		deleteSong: (song) => {
			dispatch(unlikeSong(song));
		}
	};
};

export const LikedSongListContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(LikedSongList);
