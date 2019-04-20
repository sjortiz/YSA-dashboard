<template>
  <div class="wrap">
    <div class="boxes">
      <span class="full-bar">Create your group!</span>
    </div>
    <form @submit.prevent="createGroup">
      <h1>{{msg}}</h1>

      <label for="appName">App name</label>
      <select name="appName" id="appName" v-model="appName" tabindex="1" required >
        <option v-for="app in apps" :value="app.name" :key="app.name">{{app.name}}</option>
      </select>

      <label for="groupName">Group name</label>
      <input type="text" v-model="groupName" name="groupName" id="groupName" tabindex="2" required />

      <input type="submit" value="You know what to do!" tabindex="3" />
    </form>
  </div>
</template>

<script>
import { asynchRequest, retryRequestIfToken } from '../utils/utils'

export default {
  props: {
    msg: {
      type: String,
      default: 'Add details!'
    }
  },
  data () {
    return {
      appName: '',
      groupName: '',
      apps: []
    }
  },
  methods: {
    createGroup () {
      let targetUrl = `http://localhost:8080/group/${this.appName}/${this.groupName}`
      retryRequestIfToken(
        targetUrl,
        { ...this.$store.getters.retrieveHeadersWithToken }
      ).then(data => {
        this.appName = ''
        this.groupName = ''
      }).catch(error => {
        // eslint-disable-next-line
        console.log(error)
      })
    }
  },
  mounted () {
    asynchRequest(
      `http://localhost:8080/apps`,
      { ...this.$store.getters.retrieveHeadersWithToken },
      null,
      'GET'
    ).then(data => {
      this.apps = data.data
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>
