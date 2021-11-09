import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import './App.css';
import { React, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routing from './Routing';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import MainMenu from './components/Layout/MainMenu';

function App() {
	const [isMenuVisible, showMainMenu] = useState(false);

	const toggleMenu = () => {
		showMainMenu((prevState) => {
			return !isMenuVisible;
		});
	};

	const closeMenu = () => {
		showMainMenu(false);
	};

	return (
		<>
			<BrowserRouter>
				<div className="mainContainer">
					<Header toggleMenu={toggleMenu} />
					<div className={`mainMenu ${isMenuVisible ? '' : 'hiddenMenu'}`}>
						<MainMenu closeMenu={closeMenu} />
					</div>
					<div className="contentContainer">
						<Routing />
					</div>
					<Footer />
				</div>
			</BrowserRouter>
		</>
	);
}

export default App;
