<template>
    <form @submit.prevent="search()">
        <input type="text" v-model="editable.query" id="search">
        <button type="submit"> <i class="mdi mdi-magnify"></i></button>
    </form>
</template>


<script>
import { notesService } from '../services/NotesService.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
import { ref } from 'vue';
import { AppState } from '../AppState.js';
import { onMounted, computed } from 'vue';



export default {
    setup() {

        const editable = ref({})



        return {
            editable,
            profile: computed(() => AppState.activeProfile),

            search() {
                if (this.profile) {
                    this.searchProfileNotes()
                } else
                    this.searchNotes()
            },


            async searchNotes() {
                try {
                    const query = editable.value
                    await notesService.searchNotes(query)
                    editable.value = {}
                } catch (error) {
                    logger.log(error.message)
                    Pop.error(error.message)
                }
            },

            async searchProfileNotes() {
                try {
                    const profileId = this.profile.id
                    const query = editable.value
                    await notesService.searchProfileNotes(query, profileId)
                    editable.value = {}
                } catch (error) {
                    logger.log(error.message)
                    Pop.error(error.message)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped></style>