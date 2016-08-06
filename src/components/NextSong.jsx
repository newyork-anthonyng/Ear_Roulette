import React from 'react';

const NextSong = React.createClass({
	render: function() {
		const { title, artist } = this.props;

		return (
			<div className='next-song'>
				<span className='title'>
					{title}
				</span>
				<span className='artist'>
					{artist}
				</span>
			</div>
		);
	}
});

export { NextSong };
