import React from 'react';
import Categories from './Categories';
import DashboardExpenses from './DashboardExpenses';
import Places from './Places';
import Reports from './Reports';

const DashboardContainer = (props) => {
	return (
		<>
			{props.content === 'DashboardExpenses' && <DashboardExpenses showGlobalToast={props.showGlobalToast} />}
			{props.content === 'Categories' && <Categories showGlobalToast={props.showGlobalToast} />}
			{props.content === 'Places' && <Places showGlobalToast={props.showGlobalToast} />}
			{props.content === 'Reports' && <Reports showGlobalToast={props.showGlobalToast} />}
		</>
	);
};

export default DashboardContainer;
