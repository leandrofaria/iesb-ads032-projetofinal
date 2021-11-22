import React from 'react';

const About = () => {
	return (
		<>
			<div className="p-grid">
				<div className="p-col-12" style={{ textAlign: 'left' }}>
					<h3>Sobre o Projeto</h3>
					<hr className="rightFade" />
					<p>
						Projeto desenvolvido por Leandro Faria, para fins de avaliação na matéria de Construção de
						Frontend, do curso de Análise e Desenvolvimento de Sistemas do IESB, no ano de 2021.
					</p>
					<p>
						Este website não salva dados inseridos em servidores, pelo contrário, emula um backend falso que
						utiliza o localStorage do próprio navegador como meio de armazenamento e comunicação com o
						frontend.
					</p>
					<br />
					<h3>Tecnologias</h3>
					<hr className="rightFade" />
					<p>
						Projeto desenvolvido utilizando-se NodeJS, React e bibliotecas adicionais como PrimeReact,
						JsonWebToken, CryptoJS, ChartJS e React Hook Form.
					</p>
				</div>
			</div>
			<br />
			<div className="p-grid">
				<div className="p-col-12 p-md-6">
					<h3>Desenvolvedor</h3>
					<div
						style={{
							position: 'relative',
							margin: 'auto',
							width: '400px',
							height: '400px',
							backgroundImage:
								'url("https://avatars.githubusercontent.com/u/14020366?s=400&u=2aea6a881827e37993666435a12405a72749aea1&v=4")',
							backgroundPosition: 'center center',
							backgroundRepeat: 'no-repeat',
							backgroundSize: 'cover',
						}}
					>
						<div style={{ position: 'absolute', bottom: 0, left: '110px' }}>
							<img src="/img/ss.png" alt="SS" />
						</div>
					</div>
				</div>
				<div className="p-col-12 p-md-6">
					<h3>Professor</h3>
					<div
						style={{
							position: 'relative',
							margin: 'auto',
							width: '400px',
							height: '400px',
							backgroundImage: 'url("https://avatars.githubusercontent.com/u/217235?v=4")',
							backgroundPosition: 'center center',
							backgroundRepeat: 'no-repeat',
							backgroundSize: 'cover',
						}}
					>
						<div style={{ position: 'absolute', bottom: 0, left: '110px' }}>
							<img src="/img/certeza.png" alt="Certeza" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default About;
