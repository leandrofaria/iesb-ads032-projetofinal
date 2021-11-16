import { Button } from 'primereact/button';
import { React, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import ResponsiveCard from '../components/UI/ResponsiveCard';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { Messages } from 'primereact/messages';
import * as AuthService from '../services/AuthService';

const Signup = (props) => {
	const authMsg = useRef(null);
	const password = useRef(null);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate();

	password.current = watch('password', '');

	const submitSignup = (data) => {
		const response = AuthService.signup(data.name, data.username, data.password);

		authMsg.current.clear();

		if (response.status === 'fail') {
			authMsg.current.replace({
				severity: 'error',
				summary: response.message,
				sticky: true,
			});
		} else {
			props.showGlobalToast('success', 'Usuário cadastrado com sucesso.');
			navigate('/login');
		}
	};

	return (
		<>
			<ResponsiveCard className="responsiveCard" title="Cadastro de Usuário">
				<p>Preencha seus dados abaixo.</p>
				<Messages ref={authMsg} />
				<div className="formLayout">
					<form onSubmit={handleSubmit(submitSignup)}>
						<label htmlFor="name">Nome Completo:</label>
						<InputText
							type="text"
							name="name"
							{...register('name', { required: true })}
							className={errors?.name ? 'p-invalid' : ''}
						/>
						{errors?.name && (
							<Message
								severity="error"
								text="Campo obrigatório."
								style={{ display: 'block', marginBottom: '15px' }}
							></Message>
						)}
						<label htmlFor="username">Nome de Usuário:</label>
						<InputText
							type="text"
							name="username"
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
							ref="password"
							type="password"
							name="password"
							{...register('password', { required: true, minLength: 3 })}
							className={errors?.password ? 'p-invalid' : ''}
						/>
						{errors?.password?.type === 'required' && (
							<Message
								severity="error"
								text="Campo obrigatório."
								style={{ display: 'block', marginBottom: '15px' }}
							></Message>
						)}
						{errors?.password?.type === 'minLength' && (
							<Message
								severity="error"
								text="Sua senha deve conter 3 ou mais caracteres."
								style={{ display: 'block', marginBottom: '15px' }}
							></Message>
						)}
						<label htmlFor="passwordCheck">Repita a Senha:</label>
						<InputText
							type="password"
							name="passwordCheck"
							{...register('passwordCheck', {
								validate: (value) => value === password.current,
							})}
							className={errors?.passwordCheck ? 'p-invalid' : ''}
						/>
						{errors?.passwordCheck && (
							<Message
								severity="error"
								text="A senha informada não confere."
								style={{ display: 'block', marginBottom: '15px' }}
							></Message>
						)}
						<br />
						<div style={{ width: '100%', textAlign: 'center' }}>
							<Button type="submit">Cadastrar</Button>
						</div>
					</form>
				</div>
				<br />
				<hr />
				<Link to="/login">
					<p>Já possui cadastro? Faça login agora!</p>
				</Link>
			</ResponsiveCard>
		</>
	);
};

export default Signup;
