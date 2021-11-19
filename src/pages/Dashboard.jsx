import { React, useState } from 'react';
import DashboardContainer from '../components/Layout/Dashboard/DashboardContainer';
import DashboardMenu from '../components/Layout/Dashboard/DashboardMenu';

const Dashboard = (props) => {
	const [dashboardContent, setDashboardContent] = useState('DashboardExpenses');

	return (
		<>
			<div className="p-grid">
				<div className="p-col-12 p-md-2">
					<DashboardMenu setDashboardContent={setDashboardContent} />
				</div>
				<div className="p-col-12 p-md-10">
					<DashboardContainer content={dashboardContent} showGlobalToast={props.showGlobalToast} />
				</div>
			</div>
		</>
	);
};

export default Dashboard;
