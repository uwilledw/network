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
                <p>{{ profile?.graduated }}</p>
                <p>{{ profile?.class }}</p>
                <p>{{ profile?.bio }}</p>
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
            profile: computed(() => AppState.activeProfile),
            notes: computed(() => AppState.notes)
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