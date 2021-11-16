import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

const Routing = (props) => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/painel"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/login"
					element={<Login showGlobalToast={props.showGlobalToast} setAuthUser={props.setAuthUser} />}
				/>
				<Route path="/signup" element={<Signup showGlobalToast={props.showGlobalToast} />} />
				<Route path="/*" element={<NotFound />} />
			</Routes>
		</>
	);
};

export default Routing;
