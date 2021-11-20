import React from 'react';
import { Button } from 'primereact/button';

const DashboardMenu = (props) => {
	return (
		<>
			<div className="dashboardMenu">
				<ul>
					<li>
						<Button
							onClick={() => {
								props.setDashboardContent('Expenses');
							}}
						>
							Lançamentos
						</Button>
					</li>
					<li>
						<Button
							onClick={() => {
								props.setDashboardContent('Categories');
							}}
						>
							Categorias
						</Button>
					</li>
					<li>
						<Button
							onClick={() => {
								props.setDashboardContent('Places');
							}}
						>
							Lugares
						</Button>
					</li>
					<li>
						<Button
							onClick={() => {
								props.setDashboardContent('Reports');
							}}
						>
							Relatórios
						</Button>
					</li>
				</ul>
			</div>
		</>
	);
};

export default DashboardMenu;
