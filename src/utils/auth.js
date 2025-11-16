const AUTH_KEY = 'md_auth_logged_in';

export const MD_AUTH = {
    isFrontLoggedIn() {
        return localStorage.getItem(AUTH_KEY) === 'true';
    },

    setLoggedIn() {
        localStorage.setItem(AUTH_KEY, 'true');
    },

    clearLogin() {
        localStorage.removeItem(AUTH_KEY);
    }
};

