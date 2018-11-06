import React from 'react';
import Router, { withRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import { url } from '../config/public';

class Configuration extends React.Component {

	static async getInitialProps() {
		if (!Router.query.edit) {
			return {
				id: '',
				channels: []
			};
		}
		const url =
			url.scheme
			+ '://'
			+ url.host
			+ ':'
			+ url.port
			+ '/api/configuration/'
			+ Router.query.edit;
		return {
			configuration: await fetch(url).then((res) => {
				return res.json();
			})
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			configuration: this.props.configuration
		};
	}

	handleChange(event) {

	}

	render() {
		return (
			<div>
				<h1>Configuration for { Router.query.edit || 'new entry'  }</h1>
				<div>
					<form name='configuration'>
						<fieldset>
							<label>
								<p>unique name</p>
								<input
									type='text'
									name='id'
									value={this.state.configuration}
								/>
							</label>
						</fieldset>
					</form>
				</div>
			</div>
		);
	}
}

export default Configuration;