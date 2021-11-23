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

//############################ DUMMY DATA ########################################################

export const createDummyData = (authUser) => {
	const dummyData = {
		categories: [
			{ user: authUser.username, name: 'MERCADO', id: 1637543528791 },
			{ user: authUser.username, name: 'COMBUSTÍVEL', id: 1637543483890 },
			{ user: authUser.username, name: 'LAZER', id: 1637543393679 },
			{ user: authUser.username, name: 'EDUCAÇÃO', id: 1637543366521 },
			{ user: authUser.username, name: 'VESTUÁRIO', id: 1637543362680 },
			{ user: authUser.username, name: 'ALIMENTAÇÃO', id: 1637543358405 },
		],
		places: [
			{ user: authUser.username, name: 'RIACHUELO', id: 1637543607470 },
			{ user: authUser.username, name: 'RENNER', id: 1637543602678 },
			{ user: authUser.username, name: 'ASSAÍ', id: 1637543543338 },
			{ user: authUser.username, name: 'ATACADÃO DIA A DIA', id: 1637543539846 },
			{ user: authUser.username, name: 'POSTO JK', id: 1637543492308 },
			{ user: authUser.username, name: 'IESB', id: 1637543441709 },
			{ user: authUser.username, name: 'MANGAI', id: 1637543433494 },
			{ user: authUser.username, name: 'CONJUNTO NACIONAL', id: 1637543425769 },
			{ user: authUser.username, name: 'ZARA', id: 1637543416918 },
			{ user: authUser.username, name: 'PARK SHOPPING', id: 1637543409757 },
			{ user: authUser.username, name: 'NAZO', id: 1637543404756 },
		],
		expenses: [
			{
				user: authUser.username,
				description: 'ABASTECIMENTO CARRO',
				category: 'COMBUSTÍVEL',
				place: 'POSTO JK',
				date: 1636513200000,
				cost: '120.00',
				id: 1637547529943,
			},
			{
				user: authUser.username,
				description: 'CAMISAS NOVAS',
				category: 'VESTUÁRIO',
				place: 'ZARA',
				date: 1633402800000,
				cost: '140.00',
				id: 1637544239471,
			},
			{
				user: authUser.username,
				description: 'JANTAR COM A FAMÍLIA',
				category: 'ALIMENTAÇÃO',
				place: 'MANGAI',
				date: 1631242800000,
				cost: '260.00',
				id: 1637544184046,
			},
			{
				user: authUser.username,
				description: 'ABASTECIMENTO CARRO',
				category: 'COMBUSTÍVEL',
				place: 'POSTO JK',
				date: 1629342000000,
				cost: '280.00',
				id: 1637544133453,
			},
			{
				user: authUser.username,
				description: 'COMPRAS DO MÊS',
				category: 'MERCADO',
				place: 'ASSAÍ',
				date: 1626058800000,
				cost: '980.00',
				id: 1637544106920,
			},
			{
				user: authUser.username,
				description: 'PAGAMENTO MENSALIDADE ADS',
				category: 'EDUCAÇÃO',
				place: 'IESB',
				date: 1623034800000,
				cost: '433.00',
				id: 1637544021551,
			},
			{
				user: authUser.username,
				description: 'PASSEIO E DIVERSÃO',
				category: 'LAZER',
				place: 'PARK SHOPPING',
				date: 1620097200000,
				cost: '620.00',
				id: 1637543983472,
			},
			{
				user: authUser.username,
				description: 'ALMOÇO COM AMIGOS',
				category: 'ALIMENTAÇÃO',
				place: 'NAZO',
				date: 1618887600000,
				cost: '350.00',
				id: 1637543933721,
			},
			{
				user: authUser.username,
				description: 'ROUPAS NOVAS',
				category: 'VESTUÁRIO',
				place: 'RENNER',
				date: 1615777200000,
				cost: '500.00',
				id: 1637543849256,
			},
			{
				user: authUser.username,
				description: 'COMPRAS DO MÊS',
				category: 'MERCADO',
				place: 'ATACADÃO DIA A DIA',
				date: 1612926000000,
				cost: '1200.00',
				id: 1637543818152,
			},
			{
				user: authUser.username,
				description: 'ABASTECIMENTO CARRO',
				category: 'COMBUSTÍVEL',
				place: 'COMBUSTÍVEL',
				date: 1609815600000,
				cost: '150.00',
				id: 1637543683582,
			},
		],
	};

	const backend = JSON.parse(localStorage.getItem('backend')) || {};

	const newBackend = {
		...backend,
		expenses: dummyData.expenses,
		places: dummyData.places,
		categories: dummyData.categories,
	};
	localStorage.setItem('backend', JSON.stringify(newBackend));

	return { status: 'success', message: 'Dados de exemplo importados com sucesso.' };
};
