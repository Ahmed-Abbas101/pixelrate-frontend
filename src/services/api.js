const BASE_URL = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api`
    : '/api';

async function request(path, { method = 'GET', body, auth = false } = {}) {
    const headers = { 'Content-Type': 'application/json' };

    if (auth) {
        const token = localStorage.getItem('pixelrate_token');
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
    }

    const res = await fetch(`${BASE_URL}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : {};

    if (!res.ok) {
        const message = data.message || `Request failed with status ${res.status}`;
        throw new Error(message);
    }

    return data;
}

export const phoneApi = {
    getAll:   ()             => request('/phones'),
    search:   (query = {})   => {
        const qs = new URLSearchParams(query).toString();
        return request(`/phones/search${qs ? `?${qs}` : ''}`);
    },
    getById:  (id)           => request(`/phones/${id}`)
};

export const companyApi = {
    getAll: ()               => request('/companies'),
    search: (query = {})     => {
        const qs = new URLSearchParams(query).toString();
        return request(`/companies/search${qs ? `?${qs}` : ''}`);
    },
    getById: (id)            => request(`/companies/${id}`),
    getPhones: (id)          => request(`/companies/${id}/phones`)
};

export const userApi = {
    register: (payload)      => request('/users/register', { method: 'POST', body: payload }),
    login:    (payload)      => request('/users/login',    { method: 'POST', body: payload }),
    profile:  ()             => request('/users/profile',  { auth: true })
};

export const contactApi = {
    create: (payload)        => request('/contacts', { method: 'POST', body: payload })
};
