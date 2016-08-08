import React from 'react';
import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils';
import { NextSong } from '../../../src/components/NextSong';
import { expect } from 'chai';

describe('NextSong', () => {
	it('renders title and artist name', () => {
		const title = 'Baby';
		const artist = 'Justin Bieber';
		const component = renderIntoDocument(
			<NextSong
				title={title}
				artist={artist}
			/>
		);

		const titleText = scryRenderedDOMComponentsWithClass(component, 'title')[0].textContent;
		const artistText = scryRenderedDOMComponentsWithClass(component, 'artist')[0].textContent;

		expect(titleText).to.equal('Baby');
		expect(artistText).to.equal('Justin Bieber');
	});
});
