export function load({ cookies }) {
	return {
		error: cookies.get('error'),
		accessToken: cookies.get('accessToken')
	};
}

export const actions = {
	login: async ({ cookies, request }) => {
		cookies.delete('error', { path: '/' });
		const data = await request.formData();
		// Convert FormData to a plain object before multer is implemented on backend
		const json = Object.fromEntries(data);
		const backendResponse = await fetch('https://oldschoolgames-backend.codevert.org/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(json)
		}).then((res) => res.json());
		if (backendResponse.error != undefined) {
			//loginData.setResponse({ error: backendResponse.error });
			cookies.set('error', backendResponse.error, { path: '/' });
			return;
		}
		cookies.set('accessToken', backendResponse.accessToken, { path: '/' });
	},

	register: async ({ cookies, request }) => {
		cookies.set('error', '', { path: '/' });
		const data = await request.formData();
		// Convert FormData to a plain object before multer is implemented on backend
		const json = Object.fromEntries(data);
		const backendResponse = await fetch(
			'https://oldschoolgames-backend.codevert.org/auth/register',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(json)
			}
		).then((res) => res.json());
		if (backendResponse.error != undefined) {
			cookies.set('error', backendResponse.error, { path: '/' });
			return;
		}
		cookies.set('accessToken', backendResponse.accessToken, { path: '/' });
	}
};
