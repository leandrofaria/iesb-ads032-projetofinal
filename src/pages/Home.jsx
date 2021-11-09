import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { Link } from 'react-router-dom';
import { IoMdLogIn } from 'react-icons/io';

const Home = () => {
	return (
		<>
			<div className="p-grid">
				<div className="p-col-12 p-lg-6 ">
					<img className="homeImage" src="/img/graph.png" alt="Controle de Gastos" />
				</div>
				<div className="p-col-12 p-lg-6">
					<h1>Tenha total controle sobre suas finanças</h1>
					<hr />
					<h2>
						<FaCheck style={{ color: 'rgba(0, 200, 0, 1)' }} />
						&nbsp;Totalmente responsivo!
					</h2>
					<h2>
						<FaCheck style={{ color: 'rgba(0, 200, 0, 1)' }} />
						&nbsp;Gratuito e seguro!
					</h2>
					<h2>
						<FaCheck style={{ color: 'rgba(0, 200, 0, 1)' }} />
						&nbsp;Absolutamente topíssimo!
					</h2>
					<hr />
					<br />
					<Button>
						<IoMdLogIn />
						&nbsp;Entrar Agora!
					</Button>
				</div>
			</div>
			<br />
			<div className="p-grid">
				<div className="p-col">
					<Panel header="Informações Importantes">
						<p>
							Este sistema foi desenvolvido como projeto final da disciplina Construção de Frontend, do
							curso de Análise e Desenvolvimento de Sistemas do IESB.
						</p>
						<p>
							Apesar de funcional este website serve apenas como demonstração de tecnologias e técnicas de
							desenvolvimento e <span style={{ color: '#ff0000' }}>NÃO DEVE</span> ser utilizado pelo
							público em geral.
						</p>
						<p>
							<Link to="/sobre">Para maiores detalhes clique aqui.</Link>
						</p>
					</Panel>
				</div>
			</div>
		</>
	);
};

export default Home;
