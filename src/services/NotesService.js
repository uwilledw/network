import { api } from "./AxiosService.js"
import { logger } from '../utils/Logger.js'
import { AppState } from "../AppState.js"
import { Note } from "../models/Note.js"


class NotesService {

    async getNotes() {
        const res = await api.get('api/posts')
        logger.log(res.data)
        AppState.notes = res.data.posts.map(n => new Note(n))
        AppState.nextPage = res.data.older
        AppState.previousPage = res.data.newer
        logger.log(AppState.notes, AppState.nextPage, AppState.previousPage, 'appstate notes')
    }

    async getNotesForProfile(profileId) {
        const res = await api.get(`api/posts?creatorId=${profileId}`)
        logger.log(res.data, 'notes for profile')
        AppState.notes = res.data.posts.map(n => new Note(n))
        AppState.nextPage = res.data.older
        AppState.previousPage = res.data.newer
        logger.log(AppState.notes)
    }

    async searchNotes(query) {
        const res = await api.get('api/posts', { params: query })
        logger.log('search note', res.data)
        AppState.query = query.query
        AppState.notes = res.data.posts.map(n => new Note(n))
        AppState.nextPage = res.data.older
        AppState.previousPage = res.data.newer
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
        logger.log(res.data, 'note created')
        const newNote = new Note(res.data)
        logger.log(newNote, 'new note here')
        AppState.notes.splice(0, 0, newNote)
        logger.log(AppState.notes, 'appstate notes after new')
    }

    async deleteNote(noteId) {
        const res = await api.delete(`api/posts/${noteId}`)
        logger.log(res.data, 'deleted note')
        AppState.notes = AppState.notes.filter(n => n.id != noteId)
        logger.log(AppState.notes)

    }

    async changePage(url) {
        logger.log(url)
        const res = await api.get(url)
        logger.log('changing page', res.data)
        AppState.nextPage = res.data.older
        AppState.previousPage = res.data.newer
        AppState.notes = res.data.posts.map(n => new Note(n))
    }

    async changeProfilePage(url, profileId) {
        logger.log(url)
        const res = await api.get(url, { params: { creatorId: profileId } })
        logger.log('changing page', res.data.posts)
        AppState.nextPage = res.data.older
        AppState.previousPage = res.data.newer
        AppState.notes = res.data.posts
    }
}

export const notesService = new NotesService()