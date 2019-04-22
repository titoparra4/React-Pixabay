import React, { Component } from 'react';
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';
import './App.css';

class App extends Component {
	state = {
		termino: '',
		imagenes: [],
		pagina: '',
		cargando: false,
		totalPaginas: ''
	};

	consultarAPI = async () => {
		const termino = this.state.termino;
		const pagina = this.state.pagina;
		const url = `https://pixabay.com/api/?key=12267502-fa0a8ac33d4005d9f97a88c08&q=${termino}&per_page=40&page=${pagina}`;

		await fetch(url)
			.then((respuesta) => {
				this.setState({
					cargando: true
				});
				return respuesta.json();
			})
			.then((resultado) => {
				const totalPaginacion = Math.ceil(resultado.totalHits / 30);
				setTimeout(() => {
					this.setState({
						imagenes: resultado.hits,
						cargando: false,
						totalPaginas: totalPaginacion
					});
				}, 500);
			});
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
		let { pagina } = this.state;
		const { totalPaginas } = this.state;

		if (pagina === totalPaginas) return null;

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
		const cargando = this.state.cargando;
		let resultado;
		if (cargando) {
			resultado = (
				<div className="spinner">
					<div className="dot1" />
					<div className="dot2" />
				</div>
			);
		} else {
			resultado = (
				<Resultado
					imagenes={this.state.imagenes}
					paginaAnterior={this.paginaAnterior}
					paginaSiguiente={this.paginaSiguiente}
					pagina={this.state.pagina}
					totalPaginas={this.state.totalPaginas}
				/>
			);
		}

		return (
			<div className="App container">
				<div className="jumbotron">
					<p className="lead text-center">Image search engine</p>
					<Buscador datosBusqueda={this.datosBusqueda} />
				</div>
				<div className="row justify-content-center">{resultado}</div>
			</div>
		);
	}
}

export default App;
