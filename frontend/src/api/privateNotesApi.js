import axios from 'axios'
import config from '../config'

const apiClient = axios.create({
    baseURL: config.apiUrl,
    headers: {
        "Content-Type" : "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
})

export const getProfileData = async() => {
    try {
        const res = await apiClient.get('/api/accounts/profile');
        return res.data
    } catch (error) {
        throw error
    }
}

export const getNotes = async() => {
    try {
        const res = await apiClient.get('/api/notes');
        return res.data
    } catch (error) {
        throw error
    }
}
export const updateNotes = async(inputData, noteId) => {
    try {
        const res = await apiClient.put(`/api/notes/update-notes/${noteId}`, inputData);
        return res.data
    } catch (error) {
        throw error
    }
}
export const addNotes = async(inputData) => {
    try {
        const res = await apiClient.post('/api/notes/add-notes/', inputData);
        return res.data
    } catch (error) {
        throw error
    }
}
export const deleteNotes = async(noteId) => {
    try {
        const res = await apiClient.delete(`/api/notes/delete-notes/${noteId}`);
        return res.data
    } catch (error) {
        throw error
    }
}