import { API_BASE_URL } from '../constants/api';

// Small wrapper around fetch so every service call handles JSON parsing and
// HTTP errors the same way, instead of repeating that logic in each service.
export async function get(path) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
        throw new Error(`Request to ${path} failed with status ${response.status}`);
    }

    return response.json();
}

export async function post(path, body) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(`Request to ${path} failed with status ${response.status}`);
    }

    return response.json();
}
