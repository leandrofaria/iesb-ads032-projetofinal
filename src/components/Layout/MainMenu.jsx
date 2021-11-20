import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import * as AuthService from '../../services/AuthService';

const MainMenu = (props) => {
	const navigate = useNavigate();

	const handleLogout = () => {
		props.setAuthUser(null);
		AuthService.logout();
		navigate('/');
	};

	return (
		<>
			<ul>
				<Link to="/" onClick={props.closeMenu}>
					<li>
						<Button>Página Inicial</Button>
					</li>
				</Link>
				{props.authUser !== null && props.authUser !== undefined && (
					<Link to="/painel" onClick={props.closeMenu}>
						<li>
							<Button>Painel de Finanças</Button>
						</li>
					</Link>
				)}
				{props.authUser === null ||
					(props.authUser === undefined && (
						<Link to="/login" onClick={props.closeMenu}>
							<li>
								<Button>Login</Button>
							</li>
						</Link>
					))}
				{props.authUser !== null && props.authUser !== undefined && (
					<li>
						<Button onClick={handleLogout}>Logout</Button>
					</li>
				)}
				{props.authUser === null ||
					(props.authUser === undefined && (
						<Link to="/signup" onClick={props.closeMenu}>
							<li>
								<Button>Cadastro</Button>
							</li>
						</Link>
					))}
				<Link to="/sobre" onClick={props.closeMenu}>
					<li>
						<Button>Sobre o Projeto</Button>
					</li>
				</Link>
			</ul>
		</>
	);
};

export default MainMenu;
