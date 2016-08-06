import React from 'react';
import ReactDOM from 'react-dom';
import { LikedSong } from './components/LikedSong';
import { LikedSongList } from './components/LikedSongList';

const App = React.createClass({
	render: function() {
		const likedSongListProps = {
			deleteSong: () => console.log('delete song clicked'),
			likedSongs: [
				{
					title: 'Call Me Maybe',
					artist: 'Carly Rae Jepsen'
				},
				{
					title: 'Baby',
					artist: 'Justin Bieber'
				}
			]
		};

		return (
			<div>
				Hello World
				<LikedSongList {...likedSongListProps} />
			</div>
		);
	}
});

ReactDOM.render(
	<App />,
	document.getElementById('app')
);
