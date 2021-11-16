import { React } from 'react';
import DashboardExpenses from '../components/Layout/Dashboard/DashboardExpenses';
import DashboardMenu from '../components/Layout/Dashboard/DashboardMenu';

const Dashboard = () => {
	return (
		<>
			<div className="p-grid">
				<div className="p-col-12 p-md-2">
					<DashboardMenu />
				</div>
				<div className="p-col-12 p-md-10">
					<DashboardExpenses />
				</div>
			</div>
		</>
	);
};

export default Dashboard;
