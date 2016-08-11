import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './reducers/index';
import { NowPlayingContainer } from './containers/NowPlayingContainer';
import { NextSongContainer } from './containers/NextSongContainer';
import { LikedSongListContainer } from './containers/LikedSongListContainer';
import { AddArtistContainer } from './containers/AddArtistContainer';
import { Utility } from './utility';

const store = createStore(reducer);
store.dispatch({
	type: 'ADD_SONGS',
	songs: [
		{
			title: 'Suspicious Minds',
			artist: 'Elvis Presley',
			image: 'https://i.scdn.co/image/d2e2148023e8a87b7a2f8d2abdfa936154e470b8',
			preview: 'https://p.scdn.co/mp3-preview/3742af306537513a4f446d7c8f9cdb1cea6e36d1'
		},
		{
			title: 'St. Anger',
			artist: 'Metallica',
			image: 'https://i.scdn.co/image/502bc1e1726e2594cd0045473e10d9166fa79dd8',
			preview: 'https://p.scdn.co/mp3-preview/6d00206e32194d15df329d4770e4fa1f2ced3f57'
		}
	]
});

const App = React.createClass({
	componentDidMount: function() {
		console.log('App.jsx did mount');
		Utility.loadSongs(console.log);
	},

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
