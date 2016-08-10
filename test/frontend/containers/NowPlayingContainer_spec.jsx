import React from 'react';
import {
	renderIntoDocument,
	findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';
import { createStore } from 'redux';
import reducer from '../../../src/reducers/index';
import { NowPlayingContainer } from '../../../src/containers/NowPlayingContainer';
import { expect } from 'chai';

describe('NowPlayingContainer', () => {
	it('should pass an empty string to NowPlaying component if there is no current song', () => {
		const store = createStore(reducer);
		const component = renderIntoDocument(
			<NowPlayingContainer store={store} />
		);
		const title = findRenderedDOMComponentWithClass(component, 'title').textContent;
		const artist = findRenderedDOMComponentWithClass(component, 'artist').textContent;

		expect(title).to.equal('');
		expect(artist).to.equal('');
	});
});
