//TODO: use zod?
export type AccessTokenValidation = {
	client_id: string;
	expires_in: number;
	login: string;
	scopes: [string];
	user_id: string;
};
