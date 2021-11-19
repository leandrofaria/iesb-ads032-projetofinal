import { Button } from 'primereact/button';
import { React, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import ResponsiveCard from '../components/UI/ResponsiveCard';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { Messages } from 'primereact/messages';
import * as AuthService from '../services/AuthService';

const Login = (props) => {
	const authMsg = useRef(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate();

	const submitAuth = (data) => {
		const response = AuthService.login(data.username, data.password);

		authMsg.current.clear();
		if (response.status === 'fail') {
			authMsg.current.replace({
				severity: 'error',
				summary: response.message,
				sticky: true,
			});
		} else {
			const user = response.data;
			AuthService.saveLogin(user);
			props.setAuthUser(user);

			props.showGlobalToast('success', 'Usuário autenticado com sucesso.');
			navigate('/painel');
		}
	};

	return (
		<>
			<ResponsiveCard className="responsiveCard" title="Acesso ao Sistema">
				<p>Informe abaixo seu nome de usuário e senha.</p>
				<Messages ref={authMsg} />
				<div className="formLayout">
					<form onSubmit={handleSubmit(submitAuth)}>
						<label htmlFor="username">Nome de Usuário:</label>
						<InputText
							type="text"
							style={{ textTransform: 'lowercase' }}
							{...register('username', { required: true })}
							className={errors?.username ? 'p-invalid' : ''}
						/>
						{errors?.username && (
							<Message
								severity="error"
								text="Campo obrigatório."
								style={{ display: 'block', marginBottom: '15px' }}
							></Message>
						)}
						<label htmlFor="password">Senha:</label>
						<InputText
							type="password"
							{...register('password', { required: true })}
							className={errors?.password ? 'p-invalid' : ''}
						/>
						{errors?.password && (
							<Message
								severity="error"
								text="Campo obrigatório."
								style={{ display: 'block', marginBottom: '15px' }}
							></Message>
						)}
						<br />
						<div style={{ width: '100%', textAlign: 'center' }}>
							<Button type="submit">Entrar</Button>
						</div>
					</form>
				</div>
				<br />
				<hr />
				<Link to="/signup">
					<p>Ainda não possui cadastro? Registre-se agora!</p>
				</Link>
			</ResponsiveCard>
		</>
	);
};

export default Login;
