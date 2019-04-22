import React, { Component } from 'react';
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';

class App extends Component {
	state = {
		termino: '',
		imagenes: [],
		pagina: ''
	};

	consultarAPI = () => {
		const termino = this.state.termino;
		const pagina = this.state.pagina;
		const url = `https://pixabay.com/api/?key=12267502-fa0a8ac33d4005d9f97a88c08&q=${termino}&per_page=100&page=${pagina}`;

		fetch(url)
			.then((respuesta) => respuesta.json())
			.then((resultado) => this.setState({ imagenes: resultado.hits }));
	};

	datosBusqueda = (termino) => {
		this.setState(
			{
				termino: termino,
				pagina: 1
			},
			() => {
				this.consultarAPI();
			}
		);
	};

	paginaAnterior = () => {
		let pagina = this.state.pagina;

		if (pagina === 1) return null;
		pagina -= 1;
		this.setState(
			{
				pagina
			},
			() => {
				this.consultarAPI();
				this.scroll();
			}
		);
	};
	paginaSiguiente = () => {
		let pagina = this.state.pagina;
		pagina += 1;
		this.setState(
			{
				pagina
			},
			() => {
				this.consultarAPI();
				this.scroll();
			}
		);
	};

	scroll = () => {
		const elemento = document.querySelector('.jumbotron');
		elemento.scrollIntoView('smooth', 'start');
	};

	render() {
		return (
			<div className="App container">
				<div className="jumbotron">
					<p className="lead text-center">Image search engine</p>
					<Buscador datosBusqueda={this.datosBusqueda} />
				</div>
				<div className="row justify-content-center">
					<Resultado
						imagenes={this.state.imagenes}
						paginaAnterior={this.paginaAnterior}
						paginaSiguiente={this.paginaSiguiente}
					/>
				</div>
			</div>
		);
	}
}

export default App;
