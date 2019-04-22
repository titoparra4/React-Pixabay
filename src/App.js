import React, { Component } from 'react';
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';

class App extends Component {
	state = {
		termino: '',
		imagenes: []
	};

	consultarAPI = () => {
		const termino = this.state.termino;
		const url = `https://pixabay.com/api/?key=12267502-fa0a8ac33d4005d9f97a88c08&q=${termino}&per_page=100`;

		fetch(url)
			.then((respuesta) => respuesta.json())
			.then((resultado) => this.setState({ imagenes: resultado.hits }));
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
				<div className="row">
					<Resultado imagenes={this.state.imagenes} />
				</div>
			</div>
		);
	}
}

export default App;
