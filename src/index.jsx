import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './reducers/index';
import { NowPlayingContainer } from './containers/NowPlayingContainer';
import { NextSongContainer } from './containers/NextSongContainer';
import { LikedSongListContainer } from './containers/LikedSongListContainer';
import { AddArtistContainer } from './containers/AddArtistContainer';

const store = createStore(reducer);
store.dispatch({
	type: 'ADD_SONGS',
	songs: [
		{
			title: 'Baby',
			artist: 'Justin Bieber',
			src: 'abc'
		},
		{
			title: 'St. Anger',
			artist: 'Metallica',
			src: 'def'
		}
	]
});

const App = React.createClass({
	render: function() {
		return (
			<div>
				<NowPlayingContainer />
				<br />
				<NextSongContainer />
				<LikedSongListContainer />
				<br />
				<AddArtistContainer />
			</div>
		);
	}
});

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
);
