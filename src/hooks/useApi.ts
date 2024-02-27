import { route } from "preact-router";

interface ApiResponse<R> {
    success: boolean;
    message: string;
    data?: R;
    error?: { message: string; };
    needLogin?: boolean;
}

const responseHandler = async (r: Response) => {
    const json = await r.json() as ApiResponse<any>;
    if (!json.success && json.needLogin) {
        route('/sign-in');
    }

    return json;
}

export const useApi = <R>(endpoint: string) => {
    const url = import.meta.env.VITE_API_URL + endpoint;

    const headers = new Headers({ 'Content-Type': 'application/json' });
    
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
        headers.append('authorization', `Bearer ${jwt}`);
    }

    const init: { headers: Headers; method?: string; body?: any } = {
        headers,
    }

    return {
        get: async (): Promise<ApiResponse<R>> => {
            init.method = 'GET';

            try {
                const response = await fetch(url, init);
                return responseHandler(response);
            } catch (error) {
                return ({
                    success: false,
                    message: 'Failed to FETCH().',
                    error: {
                        message: 'Failed to FETCH().',
                    },
                })
            }
        },
        post: async <B>(body?: B): Promise<ApiResponse<R>> => {
            init.method = 'POST';
            (body) && (init.body = JSON.stringify(body));

            try {
                const response = await fetch(url, init);
                return responseHandler(response);
            } catch (error) {
                return ({
                    success: false,
                    message: 'Failed to FETCH().',
                    error: {
                        message: 'Failed to FETCH().',
                    },
                })
            }
        },
        put: async <B>(body?: B): Promise<ApiResponse<R>> => {
            init.method = 'PUT';
            (body) && (init.body = JSON.stringify(body));

            try {
                const response = await fetch(url, init);
                return responseHandler(response);
            } catch (error) {
                return ({
                    success: false,
                    message: 'Failed to FETCH().',
                    error: {
                        message: 'Failed to FETCH().',
                    },
                })
            }
        },
        delete: async (): Promise<ApiResponse<R>> => {
            init.method = 'DELETE';

            try {
                const response = await fetch(url, init);
                return responseHandler(response);
            } catch (error) {
                return ({
                    success: false,
                    message: 'Failed to FETCH().',
                    error: {
                        message: 'Failed to FETCH().',
                    },
                })
            }
        },
    }
}