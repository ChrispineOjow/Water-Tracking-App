import axios from "axios";

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
    
    //Get all reports
    getAll: async ()=>{
        const response = await api.get('/reports');
        return response.data
    },

    //Get a single report
    getById: async (id)=>{

        const response = await api.get(`/reports/${id}`);
        return response.data;

    },

    // Create report
    create: async (reportData)=>{

        const response = await api.post('/reports',reportData);
        return response.data;
    },

    //Update report
    update: async(id, reportData) =>{

        const response = await api.put(`/reports/${id}`, reportData)
        return response.data

    },

    //Delete Report

    delete: async(id) =>{
        const response = await api.delete(`/reports/${id}`);
        return response.data
    },

    //Get nearby reports
    getNearby: async(lat, lng, radius=5)=>{
        const response = await api.get(`/reports/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
        return response.data;
    },

    //Get sattistics
    getStats: async()=>{
        const response = await api.get('/reports');
        const reports = response.data.data || response.data

        return{
            total: reports.length,
            waterAvailable:reports.filter(r=> r.waterAvailable).length,
            cleanWater:reports.filter(r => r.waterClean).length
        }
    }

}

export default api;