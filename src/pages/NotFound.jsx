import React from 'react';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const NotFound = () => {
	return (
		<>
			<div className="verticalFlexContainer">
				<h1>Erro 404</h1>
				<hr />
				<h2>Oops...</h2>
				<h3>A página que você está tentando acessar não existe.</h3>
				<Link to="/">
					<Button style={{ marginTop: '25px' }}>
						<FaHome />
						&nbsp; Retornar à Página Inicial
					</Button>
				</Link>
			</div>
		</>
	);
};

export default NotFound;
