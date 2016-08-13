import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import reducer from './reducers/index';
import { updateStorage } from './reducers/updateStorageMiddleware';
import { NowPlayingContainer } from './containers/NowPlayingContainer';
import { NextSongContainer } from './containers/NextSongContainer';
import { LikedSongListContainer } from './containers/LikedSongListContainer';
import { AddArtistContainer } from './containers/AddArtistContainer';
import { Utility } from './utility';
import {
	LOAD_DATA,
	ADD_SONGS
} from './actions'

const store = createStore(
	reducer,
	applyMiddleware(updateStorage)
);

const App = React.createClass({
	componentDidMount: function() {
		const data = Utility.loadFromLocalStorage();
		store.dispatch({
			type: LOAD_DATA,
			data: data
		});

		Utility.loadSongs((songs) => {
			store.dispatch({
				type: ADD_SONGS,
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
