import * as AuthService from '../services/AuthService';
import * as fakeBackend from '../fakeBackend/FakeBackend';

export const getExpenses = () => {
	const authUser = AuthService.autoLogin();

	const expenses = fakeBackend.getExpenses(authUser);

	return expenses;
};

export const addExpense = (data) => {
	const authUser = AuthService.autoLogin();

	const response = fakeBackend.addExpense(authUser, data);

	return response;
};

export const deleteExpense = (data) => {
	const authUser = AuthService.autoLogin();

	const response = fakeBackend.deleteExpense(authUser, data);

	return response;
};

export const updateExpense = (data) => {
	const authUser = AuthService.autoLogin();

	//const response = fakeBackend.updateExpense(authUser, data);

	const response = null;
	return response;
};
