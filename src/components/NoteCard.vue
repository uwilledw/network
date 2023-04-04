<template>
    <div class="col-10 m-4 elevation-4 p-4">
        <div class="text-end" v-if="profile">
            <button @click="deleteNote(note.id)" v-if="account.id == note.creator.id" class="btn btn-danger">Delete</button>
            <div class="text-start d-flex m-3 p-2 rounded align-items-center">
                <p>
                    <img v-if="note.creator.picture" class="profile-img" :src="note.creator.picture" alt="">
                    <img v-else class="profile-img"
                        src="https://images.unsplash.com/photo-1605199820234-0811f25a3b13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        alt="">
                    {{ note.creator.name }}
                </p>
            </div>
        </div>
        <div class="text-end" v-else>
            <button @click="deleteNote(note.id)" v-if="account.id == note.creator.id" class="btn btn-danger">Delete</button>
            <router-link :to="{ name: 'Profile', params: { profileId: note.creator.id } }">
                <div class=" text-start d-flex m-3 p-2 selectable rounded align-items-center justify-content-between">
                    <p>
                        <img v-if="note.creator.picture" class="profile-img" :src="note.creator.picture" alt="">
                        <img v-else class="profile-img"
                            src="https://images.unsplash.com/photo-1605199820234-0811f25a3b13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                            alt="">
                        {{ note.creator.name }}
                    </p>
                </div>
            </router-link>
        </div>
        <div class="m-3">
            <p>{{ note.createdAt }}</p>
            <p>{{ note.body }}</p>
            <p class="text-end">Likes: {{ note?.likes.length }} <i @click="like(note.id, note.creator.id)" v-if="account.id"
                    class="mdi mdi-heart-outline selectable"></i></p>
            <img v-if="note.imgUrl" class="note-img" :src="note.imgUrl" alt="">
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState.js';
import { Note } from '../models/Note.js';
import { computed } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { notesService } from '../services/NotesService.js';

export default {

    props: {
        note: { required: true, type: Note }
    },

    setup() {




        return {
            profile: computed(() => AppState.activeProfile),
            account: computed(() => AppState.account),
            user: computed(() => AppState.user),
            notes: computed(() => AppState.notes),

            async like(noteId, creatorId) {
                try {
                    logger.log(noteId, creatorId)
                    await notesService.like(noteId, creatorId)
                } catch (error) {
                    logger.log(error.message)
                    Pop.error(error.message)
                }
            },

            async deleteNote(noteId) {
                try {
                    if (await Pop.confirm())
                        await notesService.deleteNote(noteId)
                } catch (error) {
                    logger.log(error.message)
                    Pop.error(error.message)
                }
            },

        }
    }
}
</script>


<style lang="scss" scoped>
.profile-img {
    height: 10vh;
    width: 10vh;
    border-radius: 50%;
}

.note-img {
    max-height: 60vh;
    width: 55vw;
    border-radius: 5px;

}
</style>