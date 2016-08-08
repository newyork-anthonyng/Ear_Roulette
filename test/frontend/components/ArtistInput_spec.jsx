import React from 'react';
import {
	renderIntoDocument,
	findRenderedDOMComponentWithTag,
	Simulate
} from 'react-addons-test-utils';
import { ArtistInput } from '../../../src/components/ArtistInput';
import { expect } from 'chai';

describe('ArtistInput', () => {
	it('renders input field "add artist" button', () => {
		const component = renderIntoDocument(
			<ArtistInput />
		);
		const inputEle = findRenderedDOMComponentWithTag(component, 'input');
		const buttonEle = findRenderedDOMComponentWithTag(component, 'button');

		expect(inputEle).to.be.okay;
		expect(buttonEle).to.be.okay;
		expect(buttonEle.textContent).to.equal('Add Artist');
	});

	it('calls addArtist callback with artist name', () => {
		let addArtistInvoked = false;
		const addArtist = (artist) => { addArtistInvoked = artist };
		const component = renderIntoDocument(
			<ArtistInput
				addArtist={addArtist}
			/>
		);
		const inputEle = findRenderedDOMComponentWithTag(component, 'input');
		const buttonEle = findRenderedDOMComponentWithTag(component, 'button');

		inputEle.value = 'Justin Bieber';
		Simulate.change(inputEle);
		Simulate.click(buttonEle);

		expect(addArtistInvoked).to.equal('Justin Bieber');
	});
});
