import React from 'react';

const ResponsiveCard = (props) => {
	return (
		<>
			<div className="responsiveCard">
				<h1>{props.title}</h1>
				{props.children}
			</div>
		</>
	);
};

export default ResponsiveCard;
