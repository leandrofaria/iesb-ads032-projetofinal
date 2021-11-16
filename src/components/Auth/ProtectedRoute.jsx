import { React } from 'react';
import { Navigate } from 'react-router-dom';
import * as AuthService from '../../services/AuthService';

const ProtectedRoute = (props) => {
	const isAuthenticated = AuthService.verifyAuth();

	return isAuthenticated ? props.children : <Navigate to="/login" />;
};

export default ProtectedRoute;
