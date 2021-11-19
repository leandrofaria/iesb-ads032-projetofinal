import * as AuthService from '../services/AuthService';
import * as fakeBackend from '../fakeBackend/FakeBackend';

export const getCategories = () => {
	const authUser = AuthService.autoLogin();

	const categories = fakeBackend.getCategories(authUser);

	return categories;
};

export const addCategory = (data) => {
	const authUser = AuthService.autoLogin();

	const response = fakeBackend.addCategory(authUser, data);

	return response;
};

export const deleteCategory = (data) => {
	const authUser = AuthService.autoLogin();

	const response = fakeBackend.deleteCategory(authUser, data);

	return response;
};
