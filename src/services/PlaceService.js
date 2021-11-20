import * as AuthService from '../services/AuthService';
import * as fakeBackend from '../fakeBackend/FakeBackend';

export const getPlaces = () => {
	const authUser = AuthService.autoLogin();

	const places = fakeBackend.getPlaces(authUser);

	return places;
};

export const addPlace = (data) => {
	const authUser = AuthService.autoLogin();

	const response = fakeBackend.addPlace(authUser, data);

	return response;
};

export const deletePlace = (data) => {
	const authUser = AuthService.autoLogin();

	const response = fakeBackend.deletePlace(authUser, data);

	return response;
};

export const updatePlace = (data) => {
	const authUser = AuthService.autoLogin();

	const response = fakeBackend.updatePlace(authUser, data);

	return response;
};
