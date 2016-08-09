import React from 'react';
import {
	renderIntoDocument,
	scryRenderedComponentsWithType,
	scryRenderedDOMComponentsWithTag,
	Simulate
} from 'react-addons-test-utils';
import { LikedArtistList } from '../../../src/components/LikedArtistList';
import { LikedArtist } from '../../../src/components/LikedArtist';
import { expect } from 'chai';

describe('LikedArtistList', () => {
	it('renders a LikedArtist component for each artist', () => {
		const likedArtists = [
			'Justin Bieber',
			'Metallica'
		];
		const component = renderIntoDocument(
			<LikedArtistList
				likedArtists={likedArtists}
			/>
		);
		const likedArtistsEle = scryRenderedComponentsWithType(component, LikedArtist);
		expect(likedArtistsEle.length).to.equal(2);
	});

	it('passes callback that is called with artist name', () => {
		let deleteArtistInvoked = false;
		const deleteArtist = (artist) => { deleteArtistInvoked = artist };
		const likedArtists = [
			'Justin Bieber',
			'Metallica'
		];
		const component = renderIntoDocument(
			<LikedArtistList
				likedArtists={likedArtists}
				deleteArtist={deleteArtist}
			/>
		);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		Simulate.click(buttons[0]);
		expect(deleteArtistInvoked).to.equal('Justin Bieber');

		Simulate.click(buttons[1]);
		expect(deleteArtistInvoked).to.equal('Metallica');
	});
});
