import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.css';
import { React, useState, useRef, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import Routing from './Routing';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import MainMenu from './components/Layout/MainMenu';
import * as AuthService from './services/AuthService';

function App() {
	const [isMenuVisible, showMainMenu] = useState(false);
	const [authUser, setAuthUser] = useState(null);

	const toggleMenu = () => {
		showMainMenu((prevState) => {
			return !isMenuVisible;
		});
	};

	const closeMenu = () => {
		showMainMenu(false);
	};

	const globalToast = useRef(null);

	const showGlobalToast = (severity, message) => {
		globalToast.current.clear();
		globalToast.current.show({ severity: severity, summary: message });
	};

	useEffect(() => {
		const user = AuthService.autoLogin();
		setAuthUser(user);
	}, []);

	return (
		<>
			<BrowserRouter>
				<Toast ref={globalToast} />
				<div className="mainContainer">
					<Header toggleMenu={toggleMenu} />
					<div className={`mainMenu ${isMenuVisible ? '' : 'hiddenMenu'}`}>
						<MainMenu
							closeMenu={closeMenu}
							authUser={authUser}
							setAuthUser={setAuthUser}
							showGlobalToast={showGlobalToast}
						/>
					</div>
					<div className="contentContainer">
						<Routing showGlobalToast={showGlobalToast} setAuthUser={setAuthUser} />
					</div>
					<Footer />
				</div>
			</BrowserRouter>
		</>
	);
}

export default App;
