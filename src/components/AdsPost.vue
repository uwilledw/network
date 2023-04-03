<template>
    <div class="sticky-top">
        <div class="padding">
            <button v-show="account.id" data-bs-toggle="modal" data-bs-target="#modal" class="btn btn-info"> Post <i
                    class="mdi mdi-plus"></i></button>
        </div>
        <div class="my-3" v-for="ad in ads">
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
            ads: computed(() => AppState.ads)
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