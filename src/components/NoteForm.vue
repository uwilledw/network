<template>
    <form @submit.prevent="createNote()">
        <div class="modal-body">

            <div class="mb-3">
                <label for="description" class="form-label">Body</label>
                <input v-model="editable.body" type="text" required class="form-control" id="body">
            </div>
            <div class="mb-3">
                <label for="imgUrl" class="form-label">ImgUrl</label>
                <input v-model="editable.imgUrl" type="url" class="form-control" id="imgUrl">
            </div>
        </div>



        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="Submit" class="btn btn-primary" data-bs-dismiss="modal">Submit
            </button>
        </div>
    </form>
</template>


<script>
import { ref, computed } from 'vue';
import { AppState } from '../AppState.js';
import { Note } from '../models/Note.js';
import { notesService } from '../services/NotesService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {

    props: {
        note: { required: true }
    },

    setup(props) {

        const editable = ref({ ...props.note })
        return {
            editable,


            async createNote() {
                try {
                    const noteData = editable.value
                    logger.log(noteData, 'notedata')
                    await notesService.createNote(noteData)
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