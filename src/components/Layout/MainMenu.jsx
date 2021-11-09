import { React } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';

const MainMenu = (props) => {
	return (
		<>
			<ul>
				<Link to="/" onClick={props.closeMenu}>
					<li>
						<Button>Página Inicial</Button>
					</li>
				</Link>
				<Link to="/painel" onClick={props.closeMenu}>
					<li>
						<Button>Painel de Finanças</Button>
					</li>
				</Link>
				<li>
					<Button>Login</Button>
				</li>
				<li>
					<Button>Cadastro</Button>
				</li>
				<li>
					<Button>Configurações Avançadas</Button>
				</li>
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
