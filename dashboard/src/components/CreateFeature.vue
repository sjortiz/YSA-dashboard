<template>
  <div class="wrap">
    <div class="boxes">
      <span class="full-bar">Create your feature!</span>
    </div>
    <form @submit.prevent="createGroup">
      <h1>{{msg}}</h1>

      <label for="groupName">Group name</label>
      <select name="groupName" id="groupName" v-model="groupName" tabindex="1" required >
        <option v-for="group in groups" :value="group.name" :key="group.name">{{app.app}} -- {{app.name}}</option>
      </select>

      <label for="featureName">Feature name</label>
      <input type="text" v-model="featureName" name="featureName" id="featureName" tabindex="1" required />

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
      groupName: '',
      featureName: '',
      groups: []
    }
  },
  methods: {
    createGroup () {
      let targetUrl = `http://localhost:8080/feature/${this.groupName}/${this.featureName}`
      retryRequestIfToken(
        targetUrl,
        { ...this.$store.getters.retrieveHeadersWithToken }
      ).then(data => {
        this.groupName = ''
        this.featureName = ''
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    asynchRequest(
      `http://localhost:8080/groups`,
      { ...this.$store.getters.retrieveHeadersWithToken },
      null,
      'GET'
    ).then(data => {
      this.groups = data.data
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>
