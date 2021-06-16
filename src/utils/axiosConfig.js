export function config() {
    const token = localStorage.getItem('auth-token')

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    if (token) {
        config.headers['auth-token'] = token
    }

    return config
}
