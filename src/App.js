import React, { Component } from 'react';
import Buscador from './componentes/Buscador';

class App extends Component {
	state = {
		termino: ''
	};

	consultarAPI = () => {
		console.log('From API');
	};

	datosBusqueda = (termino) => {
		this.setState(
			{
				termino
			},
			() => {
				this.consultarAPI();
			}
		);
	};

	render() {
		return (
			<div className="App container">
				<div className="jumbotron">
					<p className="lead text-center">Image search engine</p>
					<Buscador datosBusqueda={this.datosBusqueda} />
				</div>
			</div>
		);
	}
}

export default App;
