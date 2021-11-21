import sha256 from 'crypto-js/sha256';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'secureJwtToken';

//############################ AUTH ########################################################

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

//############################ CATEGORIES ########################################################

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

export const updateCategory = (user, data) => {
	const authUser = jwt.verify(user.jwtToken, 'secureJwtToken');

	if (authUser !== null) {
		const backend = JSON.parse(localStorage.getItem('backend')) || {};

		const categories = backend['categories'] || [];

		const userCategories = categories.filter((category) => {
			return category.user === authUser.username;
		});

		const selectedCategory = userCategories.filter((category) => {
			return category.id === data.id;
		});

		const remainingCategories = userCategories.filter((category) => {
			return category.id !== data.id;
		});

		const existingCategories = remainingCategories.filter((category) => {
			return category.name === data.name.toString().toUpperCase() && category.id !== data.id;
		});

		if (existingCategories.length > 0) {
			return { status: 'fail', message: 'Categoria já cadastrada.' };
		}

		selectedCategory[0].name = data.name.toString().toUpperCase();

		remainingCategories.push(selectedCategory[0]);

		const newBackend = { ...backend, categories: remainingCategories };

		localStorage.setItem('backend', JSON.stringify(newBackend));

		return { status: 'success', message: 'Categoria atualizada com sucesso.', data: remainingCategories };
	}
};

//############################ PLACES ########################################################

export const getPlaces = (user) => {
	const authUser = jwt.verify(user.jwtToken, 'secureJwtToken');

	if (authUser !== null) {
		const backend = JSON.parse(localStorage.getItem('backend')) || {};

		const places = backend['places'] || [];

		const userPlaces = places.filter((place) => {
			return place.user === authUser.username;
		});

		return userPlaces;
	}

	return [];
};

export const addPlace = (user, data) => {
	const authUser = jwt.verify(user.jwtToken, 'secureJwtToken');

	if (authUser !== null) {
		const backend = JSON.parse(localStorage.getItem('backend')) || {};

		const places = backend['places'] || [];

		const userPlaces = places.filter((place) => {
			return place.user === authUser.username;
		});

		const existingPlaces = userPlaces.filter((place) => {
			return place.name === data.name.toString().toUpperCase();
		});

		if (existingPlaces.length > 0) {
			return { status: 'fail', message: 'Lugar já cadastrado.' };
		} else {
			const currentTimestamp = Date.now();
			const newPlaces = [
				{ user: authUser.username, name: data.name.toString().toUpperCase(), id: currentTimestamp },
				...places,
			];
			const newBackend = { ...backend, places: newPlaces };

			localStorage.setItem('backend', JSON.stringify(newBackend));
			return { status: 'success', message: 'Lugar adicionado com sucesso.', data: newPlaces };
		}
	}
};

export const deletePlace = (user, data) => {
	const authUser = jwt.verify(user.jwtToken, 'secureJwtToken');

	if (authUser !== null) {
		const backend = JSON.parse(localStorage.getItem('backend')) || {};

		const places = backend['places'] || [];

		const userPlaces = places.filter((place) => {
			return place.user === authUser.username;
		});

		const newPlaces = userPlaces.filter((place) => {
			return place.id !== data.id;
		});

		const newBackend = { ...backend, places: newPlaces };

		localStorage.setItem('backend', JSON.stringify(newBackend));
		return { status: 'success', message: 'Lugar excluído com sucesso.', data: newPlaces };
	}
};

export const updatePlace = (user, data) => {
	const authUser = jwt.verify(user.jwtToken, 'secureJwtToken');

	if (authUser !== null) {
		const backend = JSON.parse(localStorage.getItem('backend')) || {};

		const places = backend['places'] || [];

		const userPlaces = places.filter((place) => {
			return place.user === authUser.username;
		});

		const selectedPlace = userPlaces.filter((place) => {
			return place.id === data.id;
		});

		const remainingPlaces = userPlaces.filter((place) => {
			return place.id !== data.id;
		});

		const existingPlaces = remainingPlaces.filter((place) => {
			return place.name === data.name.toString().toUpperCase() && place.id !== data.id;
		});

		if (existingPlaces.length > 0) {
			return { status: 'fail', message: 'Lugar já cadastrado.' };
		}

		selectedPlace[0].name = data.name.toString().toUpperCase();

		remainingPlaces.push(selectedPlace[0]);

		const newBackend = { ...backend, places: remainingPlaces };

		localStorage.setItem('backend', JSON.stringify(newBackend));

		return { status: 'success', message: 'Categoria atualizada com sucesso.', data: remainingPlaces };
	}
};

//############################ EXPENSES ########################################################
export const getExpenses = (user) => {
	const authUser = jwt.verify(user.jwtToken, 'secureJwtToken');

	if (authUser !== null) {
		const backend = JSON.parse(localStorage.getItem('backend')) || {};

		const expenses = backend['expenses'] || [];

		const userExpenses = expenses.filter((expense) => {
			return expense.user === authUser.username;
		});

		return userExpenses;
	}

	return [];
};

export const addExpense = (user, data) => {
	const authUser = jwt.verify(user.jwtToken, 'secureJwtToken');

	if (authUser !== null) {
		const backend = JSON.parse(localStorage.getItem('backend')) || {};

		const expenses = backend['expenses'] || [];

		const userExpenses = expenses.filter((expense) => {
			return expense.user === authUser.username;
		});

		const currentTimestamp = Date.now();
		const newExpenses = [
			{
				user: authUser.username,
				description: data.description.toString().toUpperCase(),
				category: data.category,
				place: data.place,
				date: data.date.getTime(),
				cost: data.cost,
				id: currentTimestamp,
			},
			...userExpenses,
		];

		const newBackend = { ...backend, expenses: newExpenses };

		localStorage.setItem('backend', JSON.stringify(newBackend));

		return { status: 'success', message: 'Lançamento adicionado com sucesso.', data: newExpenses };
	}
};

export const deleteExpense = (user, data) => {
	const authUser = jwt.verify(user.jwtToken, 'secureJwtToken');

	if (authUser !== null) {
		const backend = JSON.parse(localStorage.getItem('backend')) || {};

		const expenses = backend['expenses'] || [];

		const userExpenses = expenses.filter((expense) => {
			return expense.user === authUser.username;
		});

		const newExpenses = userExpenses.filter((expense) => {
			return expense.id !== data.id;
		});

		const newBackend = { ...backend, expenses: newExpenses };

		localStorage.setItem('backend', JSON.stringify(newBackend));
		return { status: 'success', message: 'Lançamento excluído com sucesso.', data: newExpenses };
	}
};

export const updateExpense = (user, data) => {
	const authUser = jwt.verify(user.jwtToken, 'secureJwtToken');

	if (authUser !== null) {
		const backend = JSON.parse(localStorage.getItem('backend')) || {};

		const expenses = backend['expenses'] || [];

		const userExpenses = expenses.filter((expense) => {
			return expense.user === authUser.username;
		});

		const selectedExpense = userExpenses.filter((expense) => {
			return expense.id === +data.id;
		});

		const remainingExpenses = userExpenses.filter((expense) => {
			return expense.id !== +data.id;
		});

		selectedExpense[0].description = data.description.toString().toUpperCase();
		selectedExpense[0].category = data.category;
		selectedExpense[0].place = data.category;
		selectedExpense[0].date = data.date.getTime();
		selectedExpense[0].cost = data.cost;

		remainingExpenses.push(selectedExpense[0]);

		const newBackend = { ...backend, expenses: remainingExpenses };

		localStorage.setItem('backend', JSON.stringify(newBackend));

		return { status: 'success', message: 'Lançamento atualizado com sucesso.', data: remainingExpenses };
	}
};
