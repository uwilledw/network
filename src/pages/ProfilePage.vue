<template>
    <div class="container-fluid">
        <section class="row justify-content-center my-5">
            <div class="col-10 elevation-3">
                <img class="cover-img" :src="profile?.coverImg" alt="">
                <div>
                    <img class="profile-img" :src="profile?.picture" alt="">
                    <h3>{{ profile?.name }}</h3>
                    <a v-if="profile?.github" :href="profile?.github">Github</a>
                    <br>
                    <a v-if="profile?.linkedin" :href="profile?.linkedin">Linkedin</a>
                    <br>
                    <a v-if="profile?.resume" :href="profile?.resume">Resume</a>
                    <br>
                </div>
                <div class="p-2">
                    <p v-if="profile?.graduated"> 🎓</p>
                    <p>{{ profile?.class }}</p>
                    <p>{{ profile?.bio }}</p>
                    <button v-if="account?.id == profile?.id" class="btn btn-outline-dark">Edit</button>
                </div>
            </div>
        </section>
        <section class="row">
            <div class="col-10">
                <button v-show="previousPage" class="btn" @click="changeProfilePage(previousPage)">Previous</button>
                <button v-show="nextPage" class="btn" @click="changeProfilePage(nextPage)">Next</button>
            </div>
        </section>
        <section class="row justify-content-center" v-for="note in notes" :key="note.id">
            <NoteCard :note="note" />
        </section>
    </div>
</template>


<script>
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { profilesService } from '../services/ProfilesService.js'
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import NoteCard from '../components/NoteCard.vue';
import { notesService } from '../services/NotesService.js';

export default {
    setup() {
        const route = useRoute();
        async function getProfileId() {
            try {
                const profileId = route.params.profileId;
                await profilesService.getProfileById(profileId);
            }
            catch (error) {
                logger.log(error.message);
                Pop.error(error.message);
            }
        }

        async function getNotesForProfile() {
            try {
                AppState.nextPage = null;
                AppState.previousPage = null;
                const profileId = route.params.profileId
                await notesService.getNotesForProfile(profileId)
            } catch (error) {
                logger.log(error.message);
                Pop.error(error.message);
            }
        }





        onMounted(() => {
            getProfileId();
            getNotesForProfile();
        });
        return {
            route,
            profile: computed(() => AppState.activeProfile),
            notes: computed(() => AppState.notes),
            previousPage: computed(() => AppState.previousPage),
            nextPage: computed(() => AppState.nextPage),
            account: computed(() => AppState.account),

            async changeProfilePage(url) {
                try {
                    logger.log(url, 'LOOK HERE')
                    const profileId = route.params.profileId
                    await notesService.changePage(url, profileId)
                } catch (error) {
                    logger.log(error.message)
                    Pop.error(error.message)
                }
            }

        };
    },
    components: { NoteCard }
}
</script>


<style lang="scss" scoped>
.cover-img {
    width: 100%;
    object-fit: cover;
    object-position: center;
}

.profile-img {
    height: 10vh;
    width: 10vh;
    border-radius: 50%;
}
</style>