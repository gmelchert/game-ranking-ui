import { route } from "preact-router";

const responseHandler = async (r: Response) => {
    const json = await r.json();
    if (!json.success && json.needLogin) return route('/sign-in');

    return r;
}

export const useApi = (endpoint: string) => {
    const url = import.meta.env.API_URL + endpoint;

    const headers = new Headers({ 'Content-Type': 'application/json' });

    const init: { headers: Headers; method?: string; body?: any } = {
        headers,
    }

    return {
        get: async () => {
            init.method = 'GET';
            return fetch(url, init)
                .then(responseHandler)
                .catch(error => ({
                    success: false,
                    message: 'Failed to FETCH().',
                    error
                }))
        },
        post: async <B>(body?: B) => {
            init.method = 'POST';
            (body) && (init.body = body);

            return fetch(url, init)
                .then(responseHandler)
                .catch(error => ({
                    success: false,
                    message: 'Failed to FETCH().',
                    error
                }))
        },
        put: async <B>(body?: B) => {
            init.method = 'PUT';
            (body) && (init.body = body);

            return fetch(url, init)
                .then(responseHandler)
                .catch(error => ({
                    success: false,
                    message: 'Failed to FETCH().',
                    error
                }))
        },
        delete: async () => {
            init.method = 'DELETE';

            return fetch(url, init)
                .then(responseHandler)
                .catch(error => ({
                    success: false,
                    message: 'Failed to FETCH().',
                    error
                }))
        },
    }
}