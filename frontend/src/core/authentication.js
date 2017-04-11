const Authentication = {
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    login: (token, user) => {
        if (localStorage.getItem('token')) {
            return false;
        }

        localStorage.setItem('token', token);
        localStorage.setItem('user_id', user._id);
        localStorage.setItem('username', user.username);
        return true;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('username');
    },

    get: () => {
        const token = localStorage.getItem('token');

        if (!token) {
            return {};
        }

        return {
            token: token,
            user_id: localStorage.getItem('user_id'),
            username: localStorage.getItem('username'),
        }
    }
};

export default Authentication;
