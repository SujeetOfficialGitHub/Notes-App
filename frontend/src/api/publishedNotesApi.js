import axios from 'axios'
import config from '../config'

const apiClient = axios.create({
    baseURL: config.apiUrl,
    headers: {
        "Content-Type" : "application/json"
    }
})

export const publishedNotes = async() => {
    try {
        const res = await apiClient.get('/api/notes/published-notes')
        return res.data
    } catch (error) {
        throw error
    }
}