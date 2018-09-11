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
    createApp: function () {
      fetch(`http://localhost:8080/app/${this.appName}`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$store.state.accessToken
        }
      }).then(response => {
        console.log(response)
        // eslint-disable-next-line
        if (response.status == 410) {
          this.$store.dispatch('refreshAccessToken')
        }
        return response.json()
      }).then(data => {
        console.log(data)
      })
      this.appName = ''
    }
  }
}
</script>
