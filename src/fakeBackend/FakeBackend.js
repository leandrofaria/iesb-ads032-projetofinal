import sha256 from 'crypto-js/sha256';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'secureJwtToken';

export const login = (username, password) => {
	const backend = JSON.parse(localStorage.getItem('backend')) || {};

	if (backend?.['users']) {
		const user = backend['users'].filter((u) => {
			return u.username === username;
		});
		if (user[0] && sha256(password).toString() === user[0].password) {
			const token = jwt.sign({ username: user[0].username, name: user[0].name }, JWT_SECRET);
			return {
				status: 'success',
				message: 'Usuário logado com sucesso.',
				data: { username: user[0].username, name: user[0].name, jwtToken: token },
			};
		}
	}

	return { status: 'fail', message: 'Dados de autenticação inválidos.' };
};

export const signup = (name, username, password) => {
	const backend = JSON.parse(localStorage.getItem('backend')) || {};

	const users = backend['users'] || [];

	const existingUsers = users.filter((user) => {
		return user.username === username;
	});

	if (existingUsers.length > 0) {
		return { status: 'fail', message: 'Usuário já cadastrado.' };
	}

	backend.users = backend.users || [];

	backend.users.push({ username: username, name: name, password: sha256(password).toString() });

	localStorage.setItem('backend', JSON.stringify(backend));

	return { status: 'success', message: 'Usuário cadastrado com sucesso.' };
};
