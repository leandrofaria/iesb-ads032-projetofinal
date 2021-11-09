import { React } from 'react';
import { Button } from 'primereact/button';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = (props) => {
	return (
		<>
			<header>
				<div></div>
				<Link to="/">
					<h1>Controle de Gastos</h1>
				</Link>
				<div>
					<Button onClick={props.toggleMenu} className="p-button-sm">
						<FaBars />
					</Button>
				</div>
			</header>
		</>
	);
};

export default Header;
