import axios from 'axios'
import config from '../config'

const apiClient = axios.create({
    baseURL: config.apiUrl,
    headers: {
        "Content-Type" : "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
})

export const getNotes = async() => {
    try {
        const res = await apiClient.get('/api/notes');
        return res.data
    } catch (error) {
        throw error
    }
}