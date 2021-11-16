import * as fakeBackend from '../fakeBackend/FakeBackend';
import * as jwt from 'jsonwebtoken';

export const login = (username, password) => {
	return fakeBackend.login(username, password);
};
export const signup = (name, username, password) => {
	return fakeBackend.signup(name, username, password);
};

export const saveLogin = (user) => {
	const loggedUser = { user: user };
	localStorage.setItem('frontend', JSON.stringify(loggedUser));
};

export const logout = () => {
	const frontend = JSON.parse(localStorage.getItem('frontend')) || {};
	frontend['user'] = null;
	localStorage.setItem('frontend', JSON.stringify(frontend));
};

export const verifyAuth = () => {
	const frontend = JSON.parse(localStorage.getItem('frontend'));
	if (frontend) {
		const user = frontend['user'];
		if (user && user.jwtToken) {
			const authUser = jwt.verify(user.jwtToken, 'secureJwtToken');
			if (user !== null && user.username === authUser.username) {
				return true;
			}
		}
	}
	return false;
};

export const autoLogin = () => {
	if (verifyAuth()) {
		const frontend = JSON.parse(localStorage.getItem('frontend'));
		const user = frontend['user'];

		return user;
	}
};
