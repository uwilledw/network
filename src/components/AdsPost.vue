<template>
    <div class="sticky-top">
        <div class="pt-2">
            <button v-show="active == null || account.id == active.id" data-bs-toggle="modal" data-bs-target="#modal"
                class="btn btn-info">
                Post <i class="mdi mdi-plus"></i></button>
        </div>
        <div class="my-2 text-center" v-for="ad in ads">
            <img class="img-fluid" :src="ad.square" alt="">

        </div>
    </div>
    <ModalComp>
        <NoteForm :note="note" />
    </ModalComp>
</template>


<script>
import { onMounted, computed } from 'vue'
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { adsService } from '../services/AdsService.js'
import ModalComp from './ModalComp.vue';
import NoteForm from './NoteForm.vue';


export default {
    setup() {

        async function getAds() {
            try {
                await adsService.getAds()
            } catch (error) {
                logger.log(error.message)
                Pop.error(error.message)
            }
        }

        onMounted(() => getAds())

        return {

            note: computed(() => AppState.notes),
            account: computed(() => AppState.account),
            ads: computed(() => AppState.ads),
            active: computed(() => AppState.activeProfile)
        }
    },
    components: { ModalComp, NoteForm }
}
</script>


<style lang="scss" scoped>
.ad-img {
    max-height: 40vh;
    width: auto;
    object-fit: contain;
}
</style>