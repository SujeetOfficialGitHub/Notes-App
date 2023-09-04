import axios from 'axios'
import config from '../config'

const apiClient = axios.create({
    baseURL: config.apiUrl,
    headers: {
        "Content-Type": "application/json"
    }
})
export const signup = async (credentials) => {
    try {
        const res = await apiClient.post('/api/accounts/signup/', credentials);
        return res.data
    } catch (error) {
        throw error
    }
}

export const login = async(credentials) => {
    try {
        const res = await apiClient.post('/api/accounts/login/', credentials)
        return res.data
    } catch (error) {
        throw error
    }
}