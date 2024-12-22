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
      return api.request("auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
    },

    async login(email, password) {
      return api.request("auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
    },

    async logout() {
      return api.request("auth/logout", {
        method: "POST",
      });
    },

    async getMe() {
      return api.request("auth/me", {
        method: "GET",
      });
    },
  },

  jobs: {
    async postJob(jobData) {
      return api.request("/jobs", {
        method: "POST",
        body: JSON.stringify(jobData),
      });
    },

    async getJobs() {
      return api.request("/jobs", {
        method: "GET",
      });
    },
  },

  applications: {
    async apply(applicationData) {
      return api.request("/applications", {
        method: "POST",
        body: JSON.stringify(applicationData),
      });
    },
  },
};
