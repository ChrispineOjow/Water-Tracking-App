import axios from 'axios';

const rawBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const normalizedBaseUrl = rawBaseUrl.endsWith('/api')
  ? rawBaseUrl
  : `${rawBaseUrl.replace(/\/$/, '')}/api`;

const api = axios.create({
  baseURL: normalizedBaseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});


export const reportsAPI = {
  getAll: async () => {
    const response = await api.get('/reports');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/reports/${id}`);
    return response.data;
  },
  create: async (reportData, token) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await api.post('/reports', reportData, { headers });
    return response.data;
  },
  update: async (id, reportData, token) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await api.put(`/reports/${id}`, reportData, { headers });
    return response.data;
  },
  delete: async (id, token) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await api.delete(`/reports/${id}`, { headers });
    return response.data;
  },
  getNearby: async (lat, lng, radius = 5) => {
    const response = await api.get(`/reports/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
    return response.data;
  },
  getStats: async () => {
    const response = await api.get('/reports');
    return response.data.reports || response.data || [];
  }
};

export const userAPI = {
  getOrCreateUser: async (clerkId, name = "", email = "", coordinates = [0, 0], token) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    try {
      // try to GET the user (backend requires token and owner matching)
      const res = await api.get(`/user/clerk/${clerkId}`, { headers });
      return res.data;
    } catch (err) {
      // If forbidden, bubble up
      if (err?.response?.status === 403) throw err;
      // otherwise try to create the user (backend will validate token and sync)
      const createRes = await api.post('/user', { clerkId, name, email, coordinates }, { headers });
      return createRes.data;
    }
  },
  getUserByClerkId: async (clerkId, token) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await api.get(`/user/clerk/${clerkId}`, { headers });
    return res.data;
  }
};

export default api;
