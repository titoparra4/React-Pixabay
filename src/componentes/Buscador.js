import React, { Component } from 'react';

class Buscador extends Component {
	render() {
		return (
			<form>
				<div className="row">
					<div className="form-group col-md-8">
						<input
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
