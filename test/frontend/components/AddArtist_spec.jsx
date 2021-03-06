import React from 'react';
import {
	renderIntoDocument,
	findRenderedComponentWithType,
	scryRenderedComponentsWithType,
	findRenderedDOMComponentWithTag,
	Simulate
} from 'react-addons-test-utils';
import { AddArtist } from '../../../src/components/AddArtist';
import { ArtistInput } from '../../../src/components/ArtistInput';
import { LikedArtistList } from '../../../src/components/LikedArtistList';
import { LikedArtist } from '../../../src/components/LikedArtist';
import { expect } from 'chai';

describe('AddArtist', () => {
	it('renders a button to show list of LikedArtist components and ArtistInput component', () => {
		const likedArtists = [
			'Justin Bieber',
			'Metallica'
		];
		const component = renderIntoDocument(
			<AddArtist likedArtists={likedArtists} />
		);
		const showArtistButton = findRenderedDOMComponentWithTag(component, 'button');
		const buttonText = showArtistButton.textContent;

		expect(buttonText).to.equal('Liked Artists');
	});

	it('renders an ArtistInput and LikedArtistList component', () => {
		const likedArtists = [
			'Justin Bieber',
			'Metallica'
		];
		const component = renderIntoDocument(
			<AddArtist likedArtists={likedArtists} />
		);
		let likedArtistListEle = scryRenderedComponentsWithType(component, LikedArtistList);
		let artistInputEle = scryRenderedComponentsWithType(component, ArtistInput);
		expect(likedArtistListEle.length).to.equal(0);
		expect(artistInputEle.length).to.equal(0);

		const showArtistButton = findRenderedDOMComponentWithTag(component, 'button');
		Simulate.click(showArtistButton);

		likedArtistListEle = findRenderedComponentWithType(component, LikedArtistList);
		artistInputEle = findRenderedComponentWithType(component, ArtistInput);

		expect(likedArtistListEle).to.be.ok;
		expect(artistInputEle).to.be.ok;
	});

	it('renders a LikedArtist component for each artist', () => {
		const likedArtists = [
			'Justin Bieber',
			'Metallica'
		];
		const component = renderIntoDocument(
			<AddArtist likedArtists={likedArtists} />
		);
		const showArtistButton = findRenderedDOMComponentWithTag(component, 'button');
		Simulate.click(showArtistButton);
		const likedArtistsEle = scryRenderedComponentsWithType(component, LikedArtist);

		expect(likedArtistsEle.length).to.equal(2);
	});

	it('passes deleteArtist callback that is called with artist prop', () => {
		let deleteArtistInvoked = false;
		const deleteArtist = (artist) => { deleteArtistInvoked = artist };
		const likedArtists = [
			'Justin Bieber',
			'Metallica'
		];
		const component = renderIntoDocument(
			<AddArtist
				deleteArtist={deleteArtist}
				likedArtists={likedArtists}
			/>
		);
		const showArtistButton = findRenderedDOMComponentWithTag(component, 'button');
		Simulate.click(showArtistButton);
		const likedArtistEle = scryRenderedComponentsWithType(component, LikedArtist)[0];
		const deleteButtonEle = findRenderedDOMComponentWithTag(likedArtistEle, 'button');
		Simulate.click(deleteButtonEle);

		expect(deleteArtistInvoked).to.equal('Justin Bieber');
	});

	it('passes addArtist callback that is called with artist prop', () => {
		let addArtistInvoked = false;
		const addArtist = (artist) => { addArtistInvoked = artist };
		const likedArtists = [];
		const component = renderIntoDocument(
			<AddArtist
				addArtist={addArtist}
				likedArtists={likedArtists}
			/>
		);
		const showArtistButton = findRenderedDOMComponentWithTag(component, 'button');
		Simulate.click(showArtistButton);
		const artistInputEle = findRenderedComponentWithType(component, ArtistInput);
		const inputEle = findRenderedDOMComponentWithTag(artistInputEle, 'input');
		const buttonEle = findRenderedDOMComponentWithTag(artistInputEle, 'button');

		inputEle.value = 'Jay-Z';
		Simulate.change(inputEle);
		Simulate.click(buttonEle);

		expect(addArtistInvoked).to.equal('Jay-Z');
	});
});
