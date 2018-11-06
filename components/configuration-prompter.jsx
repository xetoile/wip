import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Link from 'next/link';
import Router from 'next/router';

Modal.setAppElement('#root');
const customStyles = {
	content : {
		top			: '50%',
		left		: '50%',
		right		: 'auto',
		bottom		: 'auto',
		marginRight	: '-50%',
		transform	: 'translate(-50%, -50%)',
		textAlign	: 'center'
	}
};

class ConfigurationPrompter extends React.Component {

	constructor(props) {
		super(props);
		this.refSelect = React.createRef();
	}

	toEdit() {
		Router.push({
			pathname: '/configuration',
			query: {
				edit: this.refSelect.current.value
			}
		});
	}

	onValidate() {
		this.props.select(this.refSelect.current.value);
	}

	render() {
		let selector = (
			<div>
				Select your configuration:
				<br />
				<select
					value={this.props.value}
					ref={this.refSelect}
				>
					{this.props.configurations.map(p => <option value={p} key={p}>{p}</option>)}
				</select>
				<br />
				<button onClick={this.toEdit.bind(this)}>Edit</button>
				<button onClick={this.onValidate.bind(this)}>Use</button>
				<hr />
				Or{' '}
			</div>
		);
		return (
			<Modal
				isOpen={this.props.show}
				style={customStyles}
				shouldCloseOnEsc={false}
				shouldCloseOnOverlayClick={false}
			>
				<div>
					{
						this.props.configurations.length ?
							selector
						:
							null
					}
					<Link prefetch href='/configuration'>
						<a>create a configuration</a>
					</Link>
					.
				</div>
			</Modal>
		);
	}
}

ConfigurationPrompter.propTypes = {
	selected: PropTypes.string,
	select: PropTypes.func,
	show: PropTypes.bool,
	configurations: PropTypes.arrayOf(PropTypes.string)
};

export default ConfigurationPrompter;