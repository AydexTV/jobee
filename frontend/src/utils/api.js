export const api = {
  async request(endpoint, options = {}) {
    const defaultOptions = {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(`/api/${endpoint}`, {
      ...defaultOptions,
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Something went wrong");
    }

    return response.json();
  },

  auth: {
    async register(email, password) {
      // TODO
    },

    async login(email, password) {
      // TODO
    },

    async logout() {
      // TODO
    },

    async getMe() {
      // TODO
    },
  },
};
