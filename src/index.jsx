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

const App = React.createClass({
	componentDidMount: function() {
		const data = Utility.loadFromLocalStorage();
		store.dispatch({
			type: 'LOAD_DATA',
			data: data
		});

		Utility.loadSongs((songs) => {
			store.dispatch({
				type: 'ADD_SONGS',
				songs: songs
			});
		});
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
