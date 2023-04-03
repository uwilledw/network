<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-10">
        <button v-show="previousPage" class="btn" @click="changePage(previousPage)">Previous</button>
        <button v-show="nextPage" class="btn" @click="changePage(nextPage)">Next</button>
      </div>
    </section>
    <section class="row justify-content-center" v-for="note in notes" :key="note.id">
      <NoteCard :note="note" />
    </section>
  </div>
</template>

<script>
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
import { notesService } from '../services/NotesService.js'
import { onMounted, computed } from 'vue'
import { AppState } from '../AppState.js'
import NoteCard from '../components/NoteCard.vue'

export default {
  setup() {
    onMounted(() => AppState.activeProfile = null)
    async function getNotes() {
      try {
        await notesService.getNotes()
      } catch (error) {
        logger.log(error.message)
        Pop.error(error.message)
      }
    }

    onMounted(() => getNotes())


    return {
      notes: computed(() => AppState.notes),
      previousPage: computed(() => AppState.previousPage),
      nextPage: computed(() => AppState.nextPage),

      async changePage(url) {
        try {
          await notesService.changePage(url)
        } catch (error) {
          logger.log(error.message)
          Pop.error(error.message)
        }
      }

    }
  },
  components: { NoteCard }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
