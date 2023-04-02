import { api } from "./AxiosService.js"
import { logger } from '../utils/Logger.js'
import { AppState } from "../AppState.js"
import { Note } from "../models/Note.js"


class NotesService {

    async getNotes() {
        const res = await api.get('api/posts')
        logger.log(res.data.posts)
        AppState.notes = res.data.posts.map(n => new Note(n))
        logger.log(AppState.notes, 'appstate notes')
    }

    async getNotesForProfile(profileId) {
        const res = await api.get(`api/posts?creatorId=${profileId}`)
        logger.log(res.data, 'notes for profile')
        AppState.notes = res.data.posts.map(n => new Note(n))
        logger.log(AppState.notes)
    }

    async searchNotes(query) {
        const res = await api.get('api/posts', { params: query })
        logger.log('search note', res.data)
        AppState.query = query.query
        AppState.notes = res.data.posts.map(n => new Note(n))

    }

    async searchProfileNotes(query, profileId) {
        const res = await api.get(`api/posts?creatorId=${profileId}`, { params: query })
        logger.log(res.data, 'search profiles')
        AppState.query = query.query
        AppState.notes = res.data.posts.map(n => new Note(n))
    }

    async like(noteId, creatorId) {
        const res = await api.post(`api/posts/${noteId}/like`, creatorId)
        logger.log(res.data)
    }

    async createNote(noteData) {
        const res = await api.post('api/posts', noteData)
        logger.log(res.data)
    }
}

export const notesService = new NotesService()