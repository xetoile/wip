import React from 'react';
import App from 'next/app';
import fetch from 'isomorphic-unfetch';
import { url } from '../config/public';

export default class TheApp extends App {

	static async getInitialProps({ Component, router, ctx }) {
		let promises = [
			fetch(`${url.scheme}://${url.host}:${url.port}/api/configuration`).then((res) => {
				return res.json();
			})
		];
		if (Component.getInitialProps) {
			promises.push(Component.getInitialProps(ctx));
		}
		return Promise.all(promises)
		.then((results) => {
			return {
				pageProps: results.reduce((result, obj) => {
					return {
						...obj,
						...result
					};
				}, {})
			};
		});
	}

}