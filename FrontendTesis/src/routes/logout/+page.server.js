import { redirect } from '@sveltejs/kit';

// LIKELY TO MOVE THIS TO LAYOUT (??)

export function load({cookies}) {
    cookies.delete('access_token', { path: '/' });
    cookies.delete('refresh_token', { path: '/' });
    cookies.delete('expires', { path: '/' });
    cookies.delete('restrictivo', { path: '/' })
	throw redirect(303, '/');
}

