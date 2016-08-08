import React from 'react';
import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithClass,
	Simulate
} from 'react-addons-test-utils';
import { LikedArtist } from '../../../src/components/LikedArtist';
import { expect } from 'chai';

describe('LikedArtist', () => {
	it('renders artist name and delete button', () => {
		const artist = 'Justin Bieber';
		const component = renderIntoDocument(
			<LikedArtist
				artist={artist}
			/>
		);
		const artistText = scryRenderedDOMComponentsWithClass(component, 'artist')[0].textContent;

		expect(artistText).to.equal('Justin Bieber');
	});

	it('invokes callback when delete button is clicked', () => {
		let deleteInvoked = false;
		const artist = 'Justin Bieber';
		const deleteArtist = (artist) => { deleteInvoked = artist };
		const component = renderIntoDocument(
			<LikedArtist
				artist={artist}
				deleteArtist={deleteArtist}
			/>
		);
		Simulate.click(component.refs.deleteArtist);

		expect(deleteInvoked).to.equal('Justin Bieber');
	});
});
