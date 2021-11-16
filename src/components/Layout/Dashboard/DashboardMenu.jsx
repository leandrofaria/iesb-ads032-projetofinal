import { React } from 'react';
import { Button } from 'primereact/button';

const DashboardMenu = () => {
	return (
		<>
			<div className="dashboardMenu">
				<ul>
					<li>
						<Button>Lançamentos</Button>
					</li>
					<li>
						<Button>Categorias</Button>
					</li>
				</ul>
			</div>
		</>
	);
};

export default DashboardMenu;
