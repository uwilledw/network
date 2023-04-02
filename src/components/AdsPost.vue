<template>
    <div class="sticky">
        <div class="padding">
            <button v-show="account.id" data-bs-toggle="modal" data-bs-target="#modal" class="btn btn-info"> Post <i
                    class="mdi mdi-plus"></i></button>
        </div>
    </div>
    <ModalComp>
        <NoteForm :note="note" />
    </ModalComp>
</template>


<script>
import { onMounted, computed } from 'vue'
import { AppState } from '../AppState.js';


export default {
    setup() {
        return {

            note: computed(() => AppState.notes[0]),
            account: computed(() => AppState.account)
        }
    }
}
</script>


<style lang="scss" scoped>
.padding {
    padding-top: 5em;
}

.sticky {
    position: sticky;
}
</style>