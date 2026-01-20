const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const AuthService = {
    login: async (email, password) => {
        await delay(1000);
        if (email === 'admin@gym.com' && password === 'password') {
            return {
                token: 'fake-jwt-token',
                user: {
                    id: '1',
                    name: 'Admin User',
                    email: 'admin@gym.com',
                    role: 'admin',
                },
            };
        }
        throw new Error('Invalid credentials');
    },

    logout: async () => {
        await delay(500);
        return true;
    },

    getUser: async () => {
        await delay(500);
        return {
            id: '1',
            name: 'Admin User',
            email: 'admin@gym.com',
            role: 'admin',
        };
    }
};
