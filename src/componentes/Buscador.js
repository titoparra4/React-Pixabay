import React, { Component } from 'react';

class Buscador extends Component {
	busquedaRef = React.createRef();

	obtenerDatos = (e) => {
		e.preventDefault();

		const termino = this.busquedaRef.current.value;

		this.props.datosBusqueda(termino);
	};

	render() {
		return (
			<form onSubmit={this.obtenerDatos}>
				<div className="row">
					<div className="form-group col-md-8">
						<input
							ref={this.busquedaRef}
							className="form-control form-control-lg"
							type="text"
							placeholder="Look for your image, example: soccer"
						/>
					</div>
					<div className="form-group col-md-4">
						<input type="submit" className="bt btn-lg btn-danger btn-block" value="Search..." />
					</div>
				</div>
			</form>
		);
	}
}

export default Buscador;
