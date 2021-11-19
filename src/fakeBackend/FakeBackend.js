import sha256 from 'crypto-js/sha256';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'secureJwtToken';

export const login = (username, password) => {
	const backend = JSON.parse(localStorage.getItem('backend')) || {};

	if (backend?.['users']) {
		const user = backend['users'].filter((u) => {
			return u.username === username.toString().toLowerCase();
		});
		if (user[0] && sha256(password).toString() === user[0].password) {
			const token = jwt.sign(
				{ username: user[0].username.toString().toLowerCase(), name: user[0].name },
				JWT_SECRET
			);
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
		return user.username === username.toString().toLowerCase();
	});

	if (existingUsers.length > 0) {
		return { status: 'fail', message: 'Usuário já cadastrado.' };
	}

	backend.users = backend.users || [];

	backend.users.push({ username: username, name: name, password: sha256(password).toString() });

	localStorage.setItem('backend', JSON.stringify(backend));

	return { status: 'success', message: 'Usuário cadastrado com sucesso.' };
};

export const getCategories = (user) => {
	const authUser = jwt.verify(user.jwtToken, 'secureJwtToken');

	if (authUser !== null) {
		const backend = JSON.parse(localStorage.getItem('backend')) || {};

		const categories = backend['categories'] || [];

		const userCategories = categories.filter((category) => {
			return category.user === authUser.username;
		});

		return userCategories;
	}

	return [];
};

export const addCategory = (user, data) => {
	const authUser = jwt.verify(user.jwtToken, 'secureJwtToken');

	if (authUser !== null) {
		const backend = JSON.parse(localStorage.getItem('backend')) || {};

		const categories = backend['categories'] || [];

		const userCategories = categories.filter((category) => {
			return category.user === authUser.username;
		});

		const existingCategories = userCategories.filter((category) => {
			return category.name === data.name.toString().toUpperCase();
		});

		if (existingCategories.length > 0) {
			return { status: 'fail', message: 'Categoria já cadastrada.' };
		} else {
			const currentTimestamp = Date.now();
			const newCategories = [
				{ user: authUser.username, name: data.name.toString().toUpperCase(), id: currentTimestamp },
				...categories,
			];
			const newBackend = { ...backend, categories: newCategories };

			localStorage.setItem('backend', JSON.stringify(newBackend));
			return { status: 'success', message: 'Categoria adicionada com sucesso.', data: newCategories };
		}
	}
};

export const deleteCategory = (user, data) => {
	const authUser = jwt.verify(user.jwtToken, 'secureJwtToken');

	if (authUser !== null) {
		const backend = JSON.parse(localStorage.getItem('backend')) || {};

		const categories = backend['categories'] || [];

		const userCategories = categories.filter((category) => {
			return category.user === authUser.username;
		});

		const newCategories = userCategories.filter((category) => {
			return category.id !== data.id;
		});

		const newBackend = { ...backend, categories: newCategories };

		localStorage.setItem('backend', JSON.stringify(newBackend));
		return { status: 'success', message: 'Categoria excluída com sucesso.', data: newCategories };
	}
};
