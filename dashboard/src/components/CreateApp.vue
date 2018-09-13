<template>
  <div class="wrap">
    <div class="boxes">
      <span class="full-bar">Create your app!</span>
    </div>
    <form @submit.prevent="createApp">
      <h1>{{msg}}</h1>

      <label for="appName">App name</label>
      <input type="text" v-model="appName" name="appName" id="appName" tabindex="1" required />

      <input type="submit" value="You know what to do!" tabindex="3" />
    </form>
  </div>
</template>

<script>
import { retryRequestIfToken } from '../utils/utils'

export default {
  props: {
    msg: {
      type: String,
      default: 'Add details!'
    }
  },
  data () {
    return {
      appName: ''
    }
  },
  methods: {
    createApp () {
      let targetUrl = `http://localhost:8080/app/${this.appName}`
      retryRequestIfToken(
        targetUrl,
        { ...this.$store.getters.retrieveHeadersWithToken }
      ).then(data => {
        this.appName = ''
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
