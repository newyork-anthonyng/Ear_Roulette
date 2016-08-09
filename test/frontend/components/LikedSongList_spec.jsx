import React from 'react';
import {
	renderIntoDocument,
	scryRenderedComponentsWithType,
	findRenderedDOMComponentWithTag,
	Simulate
} from 'react-addons-test-utils';
import { LikedSongList } from '../../../src/components/LikedSongList';
import { LikedSong } from '../../../src/components/LikedSong';
import { expect } from 'chai';

describe('LikedSongList', () => {
	it('renders a LikedSong component for each song', () => {
		const likedSongs = [
			{
				title: 'Baby',
				artist: 'Justin Bieber'
			},
			{
				title: 'Love Yourself',
				artist: 'Justin Bieber'
			}
		];
		const component = renderIntoDocument(
			<LikedSongList
				likedSongs={likedSongs}
			/>
		);
		const likedSongsEle = scryRenderedComponentsWithType(component, LikedSong);
		expect(likedSongsEle.length).to.equal(2);
	});

	it('passes callback that is called with artist and title props', () => {
		let deleteInvoked = false;
		const deleteSong = ({ title, artist }) => (deleteInvoked = title + ' by ' + artist);
		const likedSongs = [
			{
				title: 'Baby',
				artist: 'Justin Bieber'
			}
		];
		const component = renderIntoDocument(
			<LikedSongList
				likedSongs={likedSongs}
				deleteSong={deleteSong}
			/>
		);
		const deleteButton = findRenderedDOMComponentWithTag(component, 'button');
		Simulate.click(deleteButton);

		expect(deleteInvoked).to.equal('Baby by Justin Bieber');
	});
});
