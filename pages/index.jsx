import React from 'react';
import Router from 'next/router';
import Head from '../components/head';
import ConfigurationPrompter from '../components/configuration-prompter';

const localStorageConfigurationKey = 'configuration';

export default class Index extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			[localStorageConfigurationKey]: ''
		};
	}

	componentDidMount() {
		// retrieve client cache if any, and push to state
		this._setConfiguration(localStorage.getItem(localStorageConfigurationKey));
	}

	// callback for ConfigurationPrompter's action
	storeConfiguration(configuration) {
		this._setConfiguration(configuration);
	}

	// state/localStorage sync logic
	_setConfiguration(cfg) {
		localStorage.setItem(localStorageConfigurationKey, cfg || ''); // need to stringify falsies
		this.setState(() => {
			return {
				[localStorageConfigurationKey]: cfg
			};
		});
	}

	render() {
		return (
			<div id='root'>
				<Head />
				<h1>Kronicles homepage</h1>
				<ConfigurationPrompter
					show={!this.state[localStorageConfigurationKey]}
					configurations={Object.keys(this.props.configurations)}
					selected={this.state[localStorageConfigurationKey]}
					select={this.storeConfiguration.bind(this)}
				/>
			</div>
		);
	}
}