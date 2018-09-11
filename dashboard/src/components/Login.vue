<template>
  <div class="login_fields">

    <form @submit.prevent="login">

      <h1>{{message}}</h1>

      <label for="email">Email</label>
      <input type="email" v-model="email" name="email" id="email" tabindex="1" required />

      <label for="password">Password</label>
      <input type="password" v-model="password" name="password" id="password" tabindex="2" required />

      <input type="submit" value="You know what to do!" tabindex="3" />

    </form>

  </div>

</template>

<style scoped>

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
  input[type=submit] {
    width: 45%;
    font-size: 0.8em;
  }

</style>

<script>

const url = 'http://localhost:8080/login'

export default {
  name: 'Login',
  props: {
    msg: {
      type: String,
      default: 'Login'
    }
  },
  data () {
    return {
      message: this.msg,
      email: '',
      password: '',
      access_token: '',
      refresh_token: '',
      hasError: false,
      errorTitle: '',
      errorDetail: '',
      // Can be null, requesting, set
      tokenState: null
    }
  },
  computed: {
    credentialsDict () {
      return { user: this.email, password: this.password }
    }
  },
  methods: {
    removeTokens: function () {
      this.refresh_token = ''
      this.access_token = ''
      this.tokenState = null
    },
    login: function () {
      this.$store.dispatch('requestInitialTokens', {
        url: url,
        credentialsDict: this.credentialsDict
      }).then(() => {
        this.$router.push('dashboard')
      }).catch(error => {
        console.log(error)
      })
    }
  }
}

</script>
