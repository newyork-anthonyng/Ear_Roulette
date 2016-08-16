import React from 'react';
import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithClass,
	scryRenderedDOMComponentsWithTag,
	Simulate
} from 'react-addons-test-utils';
import { LikedSong } from '../../../src/components/LikedSong';
import { expect } from 'chai';

describe('LikedSong', () => {
	it('renders title, artist name, Youtube link and delete button', () => {
		const title = 'Baby';
		const artist = 'Justin Bieber';
		const component = renderIntoDocument(
			<LikedSong
				title={title}
				artist={artist}
			/>
		);

		const artistText = scryRenderedDOMComponentsWithClass(component, 'artist')[0].textContent;
		const titleText = scryRenderedDOMComponentsWithClass(component, 'title')[0].textContent;
		const linkText = scryRenderedDOMComponentsWithClass(component, 'link')[0].textContent;
		const linkHref = scryRenderedDOMComponentsWithTag(component, 'a')[0].href;
		const deleteButton = scryRenderedDOMComponentsWithTag(component, 'button');

		expect(artistText).to.equal('Justin Bieber');
		expect(titleText).to.equal('Baby');
		expect(linkText).to.equal('Youtube');
		expect(linkHref).to.equal('youtube.com/Baby_Justin Bieber');
		expect(deleteButton.length).to.equal(1);
	});

	it('invokes callback when delete button is clicked', () => {
		let deleteInvoked = false;
		const title = 'Baby';
		const artist = 'Justin Bieber';
		const deleteSong = ({ title, artist }) => (deleteInvoked = title + ' by ' + artist);
		const component = renderIntoDocument(
			<LikedSong
				title={title}
				artist={artist}
				deleteSong={deleteSong}
			/>
		);
		Simulate.click(component.refs.deleteSong);

		expect(deleteInvoked).to.equal('Baby by Justin Bieber');
	});
});
