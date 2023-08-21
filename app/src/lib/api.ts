// api.ts

export async function validateAccessToken(token: string): Promise<AccessTokenValidation> {
	const validationUrl = 'https://id.twitch.tv/oauth2/validate';
	const userInfoUrl = 'https://api.twitch.tv/helix/users';

	return fetch(validationUrl, {
		headers: {
			Authorization: `OAuth ${token}`
		}
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.status === 401) {
				throw new Error('Unauthorized');
			}

			const userId = data.user_id;

			return fetch(`${userInfoUrl}?id=${userId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Client-ID': 'vfywy5dgmpky85ux4rhvlm1vrvvqf5'
				}
			})
				.then((response) => response.json())
				.then((data) => {
					const user = data.data[0];

					return {
						clientId: decoded.aud,
						login: decoded.preferred_username,
						email: user.email,
						scopes: decoded.scope.split(' '),
						userId: decoded.sub,
						expiresIn: decoded.exp - decoded.iat
					};
				});
		});
}
