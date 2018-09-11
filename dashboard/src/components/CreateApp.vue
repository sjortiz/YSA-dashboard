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

<style>

  form {
    margin: 10% auto;
    width: 20%;
    min-width: 332px;
    border: 2px solid black;
    box-shadow: 0px 2px 10px 0px gray;
  }
  label {
    display: inline-block;
    width: 100%;
    padding-bottom: 10px;
    padding-top: 10px;
    font-weight: bold;
  }
  input {
    width: 80%;
    min-height: 30px;
    font-size: 20px;
  }
</style>
<script>
import { asynchRequest } from '../utils/utils'

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
      asynchRequest(
        `http://localhost:8080/app/${this.appName}`,
        { ...this.$store.getters.retrieveHeadersWithToken }
      ).then(data => {
        this.appName = ''
      }).catch(error => {
        // eslint-disable-next-line
        if (error.status == 401) {
          this.$store.dispatch('refreshAccessToken', { url: 'http://localhost:8080/login' }).then(() => {
            asynchRequest(
              `http://localhost:8080/app/${this.appName}`,
              { ...this.$store.getters.retrieveHeadersWithToken }
            ).then(data => {
              this.appName = ''
            }).catch(error => {
              console.log(error)
            })
          })
        }
      })
    }
  }
}
</script>
