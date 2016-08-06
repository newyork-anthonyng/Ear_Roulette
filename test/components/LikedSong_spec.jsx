import React from 'react';
import ReactDOM from 'react-dom';
import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithClass,
	Simulate
} from 'react-addons-test-utils';
import { LikedSong } from '../../src/components/LikedSong';
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

		expect(artistText).to.contain('Justin Bieber');
		expect(titleText).to.contain('Baby');
		expect(linkText).to.contain('youtube.com/Baby_Justin Bieber');
	});

	it('invokes callback when delete button is clicked', () => {
		let nextInvoked = false;
		const deleteSong = () => nextInvoked = true;
		const component = renderIntoDocument(
			<LikedSong
				deleteSong={deleteSong}
			/>
		);
		Simulate.click(ReactDOM.findDOMNode(component.refs.deleteSong));

		expect(nextInvoked).to.equal(true);
	});
});
