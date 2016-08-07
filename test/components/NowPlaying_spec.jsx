import React from 'react';
import ReactDOM from 'react-dom';
import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithClass,
	findRenderedDOMComponentWithClass,
	scryRenderedDOMComponentsWithTag,
	Simulate
} from 'react-addons-test-utils';
import { NowPlaying } from '../../src/components/NowPlaying';
import { expect } from 'chai';

describe('NowPlaying', () => {
	it('renders title, artist, background image, play button and like button', () => {
		const title = 'Baby';
		const artist = 'Justin Bieber';
		const component = renderIntoDocument(
			<NowPlaying
				title={title}
				artist={artist}
			/>
		);

		const titleText = scryRenderedDOMComponentsWithClass(component, 'title')[0].textContent;
		const artistText = scryRenderedDOMComponentsWithClass(component, 'artist')[0].textContent;
		const buttonEle = scryRenderedDOMComponentsWithTag(component, 'button');

		expect(titleText).to.equal('Baby');
		expect(artistText).to.equal('Justin Bieber');
		expect(buttonEle.length).to.equal(2);
	});

	it('renders play button when paused, and pause button when playing', () => {
		let isPlaying = true;
		const playingComponent = renderIntoDocument(
			<NowPlaying
				isPlaying={isPlaying}
			/>
		);
		const pauseButtonEle = scryRenderedDOMComponentsWithTag(playingComponent, 'button');
		expect(pauseButtonEle).to.be.ok;
		expect(pauseButtonEle[0].textContent).to.equal('Pause');

		isPlaying = false;
		const pausedComponent = renderIntoDocument(
			<NowPlaying
				isPlaying={isPlaying}
			/>
		);
		const playButtonEle = scryRenderedDOMComponentsWithTag(pausedComponent, 'button');
		expect(playButtonEle).to.be.ok;
		expect(playButtonEle[0].textContent).to.equal('Play');
	});

	it('invokes callback when play button is clicked', () => {
		let playInvoked = false;
		const playSong = () => { playInvoked = true };
		const isPlaying = false;
		const component = renderIntoDocument(
			<NowPlaying
				playSong={playSong}
				isPlaying={isPlaying}
			/>
		);
		Simulate.click(component.refs.playSong);

		expect(playInvoked).to.equal(true);
	});

	it('invokes callback when pause button is clicked', () => {
		let pauseInvoked = false;
		const pauseSong = () => { pauseInvoked = true };
		const isPlaying = true;
		const component = renderIntoDocument(
			<NowPlaying
				pauseSong={pauseSong}
				isPlaying={isPlaying}
			/>
		);
		Simulate.click(component.refs.pauseSong);

		expect(pauseInvoked).to.equal(true);
	});

	it('invokes callback when like button is clicked', () => {
		let likeInvoked = false;
		const likeSong = () => { likeInvoked = true };
		const component = renderIntoDocument(
			<NowPlaying
				likeSong={likeSong}
			/>
		);
		Simulate.click(component.refs.likeSong);

		expect(likeInvoked).to.equal(true);
	});
});
