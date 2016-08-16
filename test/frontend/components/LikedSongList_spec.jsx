import React from 'react';
import {
	renderIntoDocument,
	scryRenderedComponentsWithType,
	findRenderedDOMComponentWithTag,
	scryRenderedDOMComponentsWithTag,
	Simulate
} from 'react-addons-test-utils';
import { LikedSongList } from '../../../src/components/LikedSongList';
import { LikedSong } from '../../../src/components/LikedSong';
import { expect } from 'chai';

describe('LikedSongList', () => {
	it('renders a button to show list of LikedSong components', () => {
		const likedSongs = [
			{ title: 'Baby', artist: 'Justin Bieber' }
		];
		const component = renderIntoDocument(
			<LikedSongList
				likedSongs={likedSongs}
			/>
		);
		const showListButton = findRenderedDOMComponentWithTag(component, 'button');
		const buttonText = showListButton.textContent;

		expect(buttonText).to.equal('Liked Songs');
	});

	it('renders a LikedSong component for each song', () => {
		const likedSongs = [
			{ title: 'Baby', artist: 'Justin Bieber' },
			{ title: 'Love Yourself', artist: 'Justin Bieber' }
		];
		const component = renderIntoDocument(
			<LikedSongList
				likedSongs={likedSongs}
			/>
		);
		let likedSongsEle = scryRenderedComponentsWithType(component, LikedSong);
		expect(likedSongsEle.length).to.equal(0);

		const showListButton = findRenderedDOMComponentWithTag(component, 'button');
		Simulate.click(showListButton);
		likedSongsEle = scryRenderedComponentsWithType(component, LikedSong);
		expect(likedSongsEle.length).to.equal(2);
	});

	it('passes callback that is called with artist and title props', () => {
		let deleteInvoked = false;
		const deleteSong = ({ title, artist }) => (deleteInvoked = title + ' by ' + artist);
		const likedSongs = [
			{ title: 'Baby', artist: 'Justin Bieber' }
		];
		const component = renderIntoDocument(
			<LikedSongList
				likedSongs={likedSongs}
				deleteSong={deleteSong}
			/>
		);
		const showListButton = findRenderedDOMComponentWithTag(component, 'button');
		Simulate.click(showListButton);
		const deleteButton = scryRenderedDOMComponentsWithTag(component, 'button')[1];
		Simulate.click(deleteButton);

		expect(deleteInvoked).to.equal('Baby by Justin Bieber');
	});
});
