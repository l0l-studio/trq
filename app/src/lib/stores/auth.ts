import type { AccessTokenValidation } from '$lib/types/auth';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

//custom store https://svelte.dev/examples/custom-stores

//function createCount() {
//    const { subscribe, set, update } = writable(0);
//
//    return {
//        subscribe,
//        increment: () => update((n) => n + 1),
//        decrement: () => update((n) => n - 1),
//        reset: () => set(0)
//    };
//}

export const accessToken = writable<string | null>(
	browser ? localStorage.getItem('access_token') : null
);
export const authed = writable(false);

//TODO: type this properly
export const validationPromise = writable<Promise<AccessTokenValidation> | null>();

//TODO: type this properly
export const userStore = writable({
	github: '',
	website: '',
	bio: 'I am a software developer.'
});
