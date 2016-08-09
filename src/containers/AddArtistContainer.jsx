import React from 'react';
import { connect } from 'react-redux';
import { AddArtist } from '../components/AddArtist';
import {
	addArtist,
	removeArtist
} from '../actions';

const mapStateToProps = (state) => {
	return {
		likedArtists: state.likedArtists
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		deleteArtist: (artist) => {
			dispatch(removeArtist(artist));
		},
		addArtist: (artist) => {
			dispatch(addArtist(artist));
		}
	};
};

export const AddArtistContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(AddArtist);
