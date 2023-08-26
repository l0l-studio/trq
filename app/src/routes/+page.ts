import type { PageLoad } from './$types';

export const ssr = false;

export const load: PageLoad = async function (request) {
	const { params } = request;
	const accessToken = localStorage.getItem('access_token');
	if (!accessToken) {
		return {
			error: 'no accessToken found'
		};
	}

	try {
		const userRes = await fetch('http://localhost:8080/api/v1/users', {
			headers: { Authorization: 'Bearer ' + accessToken }
		});
		const user = (await userRes.json()).data;

		const pagesRes = await fetch(`http://localhost:8080/api/v1/pages?authorId=${user.id}`);
		const pages = (await pagesRes.json()).data;

		return {
			user,
			pages
		};
	} catch (_) {
		return {
			user: null
		};
	}
};
