<template>
    <div class="col-10 m-4 elevation-4 p-4">
        <div v-if="profile">
            <div class="d-flex m-3 p-2 rounded align-items-center">
                <p>
                    <img class="profile-img" :src="note.creator.picture" alt="">
                    {{ note.creator.name }}
                </p>
            </div>
        </div>
        <div v-else>
            <router-link :to="{ name: 'Profile', params: { profileId: note.creator.id } }">
                <div class="d-flex m-3 p-2 selectable rounded align-items-center">
                    <p>
                        <img class="profile-img" :src="note.creator.picture" alt="">
                        {{ note.creator.name }}
                    </p>
                </div>
            </router-link>
        </div>
        <div class="m-3">
            <p>{{ note.createdAt }}</p>
            <p>{{ note.body }}</p>
            <p class="text-end">Likes: {{ note?.likes.length }} <i @click="like(note.id, note.creator.id)" v-if="account.id"
                    class="mdi mdi-heart-outline"></i></p>
            <img v-if="note.imgUrl" class="note-img" :src="note.imgUrl" alt="">
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState.js';
import { Note } from '../models/Note.js';
import { computed, watchEffect } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { notesService } from '../services/NotesService.js';

export default {

    props: {
        note: { type: Note, required: true }
    },

    setup() {




        return {
            profile: computed(() => AppState.activeProfile),
            account: computed(() => AppState.account),
            user: computed(() => AppState.user),
            // notes: computed(() => AppState.notes),

            async like(noteId, creatorId) {
                try {
                    logger.log(noteId, creatorId)
                    await notesService.like(noteId, creatorId)
                } catch (error) {
                    logger.log(error.message)
                    Pop.error(error.message)
                }
            }
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