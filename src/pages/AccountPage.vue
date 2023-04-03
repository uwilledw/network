<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>

  <form @submit.prevent="editAccount()" class="p-3">
    <div class="form-floating mb-3">
      <input type="text" v-model="editable.name" class="form-control" id="name" placeholder="name">
      <label for="name">name</label>
    </div>
    <div class="form-floating mb-3">
      <input type="text" v-model="editable.email" class="form-control" id="email" placeholder="email">
      <label for="email">email</label>
    </div>
    <div class="form-floating mb-3">
      <input type="text" v-model="editable.picture" class="form-control" id="picture" placeholder="picture">
      <label for="picture">picture</label>
    </div>
    <div class="form-floating mb-3">
      <input type="text" v-model="editable.coverImg" class="form-control" id="coverImg" placeholder="coverImg">
      <label for="coverImg">coverImg</label>
    </div>
    <div class="form-floating mb-3">
      <input type="text" v-model="editable.bio" class="form-control" id="bio" placeholder="bio">
      <label for="bio">bio</label>
    </div>
    <div class="form-floating mb-3">
      <input type="text" v-model="editable.github" class="form-control" id="github" placeholder="github">
      <label for="github">github</label>
    </div>
    <div class="form-floating mb-3">
      <input type="text" v-model="editable.linkedin" class="form-control" id="linkedin" placeholder="linkedin">
      <label for="linkedin">linkedin</label>
    </div>
    <div class="form-floating mb-3">
      <input type="text" v-model="editable.resume" class="form-control" id="resume" placeholder="resume">
      <label for="resume">resume</label>
    </div>
    <div class=" mb-3">
      <input type="checkbox" v-model="editable.graduated" id="graduated">
      <label for="graduated">Graduated?</label>
    </div>
    <div class="mb-3 form-floating">
      <input type="text" v-model="editable.class" id="class" class="form-control" placeholder="classhere">
      <label for="class">Class</label>
    </div>
    <button class="btn btn-outline-dark" type="submit">Edit Account</button>
  </form>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'


export default {

  setup() {
    const editable = ref({})


    watchEffect(() => {
      if (AppState.account.id) {
        editable.value = { ...AppState.account }
      }
    })


    return {
      account: computed(() => AppState.account),
      editable,

      async editAccount() {
        try {
          const edits = editable.value
          await accountService.editAccount(edits)
          Pop.toast('edited account')
        } catch (error) {
          logger.log(error.message)
          Pop.error(error.message)
        }
      }


    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
