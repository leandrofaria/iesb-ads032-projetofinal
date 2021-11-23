import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import * as AuthService from '../../services/AuthService';
import { confirmDialog } from 'primereact/confirmdialog';
import * as fakeBackend from '../../fakeBackend/FakeBackend';

const MainMenu = (props) => {
	const navigate = useNavigate();

	const handleLogout = () => {
		props.setAuthUser(null);
		AuthService.logout();
		navigate('/');
	};

	const confirmImport = (data) => {
		props.closeMenu();
		confirmDialog({
			message:
				'Deseja realmente importar os dados de exemplo? Todos os seus dados inseridos serão excluídos. Essa ação não poderá ser desfeita.',
			header: 'Importar Dados',
			icon: 'pi pi-info-circle',
			acceptClassName: 'p-button-warning',
			position: 'top',
			acceptLabel: 'Sim',
			rejectLabel: 'Não',
			accept: () => {
				const response = fakeBackend.createDummyData(AuthService.autoLogin());
				if (response.status === 'success') {
					props.showGlobalToast('success', response.message);
				}
				navigate('/');
			},
			reject: () => {},
		});
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
				{(props.authUser === null || props.authUser === undefined) && (
					<Link to="/login" onClick={props.closeMenu}>
						<li>
							<Button>Login</Button>
						</li>
					</Link>
				)}
				{props.authUser !== null && props.authUser !== undefined && (
					<li>
						<Button
							onClick={() => {
								props.closeMenu();
								handleLogout();
							}}
						>
							Logout
						</Button>
					</li>
				)}
				{props.authUser !== null && props.authUser !== undefined && (
					<li>
						<Button
							onClick={() => {
								confirmImport();
							}}
						>
							Importar Dados de Exemplo
						</Button>
					</li>
				)}
				{(props.authUser === null || props.authUser === undefined) && (
					<Link to="/signup" onClick={props.closeMenu}>
						<li>
							<Button>Cadastro</Button>
						</li>
					</Link>
				)}
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
