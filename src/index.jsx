import React from 'react';
import ReactDOM from 'react-dom';
import { LikedSong } from './components/LikedSong';

const App = React.createClass({
	render: function() {
		const likedSongProps = {
			title: 'Call Me Maybe',
			artist: 'Carly Rae Jepsen',
			link: 'youtube.com/call_me_maybe',
			deleteSong: () => console.log('song deleted')
		};

		return (
			<div>
				Hello World
				<LikedSong {...likedSongProps} />
			</div>
		);
	}
});

ReactDOM.render(
	<App />,
	document.getElementById('app')
);
