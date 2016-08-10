import React from 'react';
import {
	renderIntoDocument,
	findRenderedComponentWithType,
	findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';
import { createStore } from 'redux';
import reducer from '../../../src/reducers/index';
import { NextSongContainer } from '../../../src/containers/NextSongContainer';
import { NextSong } from '../../../src/components/NextSong';
import { expect } from 'chai';

describe('NextSongContainer', () => {
	it('should render a NextSong component', () => {
		const store = createStore(reducer);
		const component = renderIntoDocument(
			<NextSongContainer store={store} />
		);
		const nextSongEle = findRenderedComponentWithType(component, NextSong);

		expect(nextSongEle).to.be.ok;
	});

	it('should pass an empty string to NextSong component if there is no next song', () => {
		const store = createStore(reducer);
		const component = renderIntoDocument(
			<NextSongContainer store={store} />
		);
		const nextSongEle = findRenderedComponentWithType(component, NextSong);
		const title = findRenderedDOMComponentWithClass(nextSongEle, 'title').textContent;
		const artist = findRenderedDOMComponentWithClass(nextSongEle, 'artist').textContent;

		expect(title).to.equal('');
		expect(artist).to.equal('');
	});
});
