<template>

  <form @submit.prevent="login">

    <h1>LogIn</h1>

    <label for="email">Email</label>
    <input type="email" v-model="email" name="email" id="email" tabindex="1" required />

    <label for="password">Password</label>
    <input type="password" v-model="password" name="password" id="password" tabindex="2" required />

    <input type="submit" value="LogIn" tabindex="3" />

  </form>

</template>

<style scoped>
  form {
    margin: 5% auto;
    width: 15%;
    min-width: 332px;
  }
  label {
    width: 100%;
    margin-top: 20px;
    font-size: 25px;
    font-weight: bold;
  }
  input {
    margin-bottom: 25px;
  }
  input[type=submit] {
    width: 40%;
    font-size: 1.8em;
    padding-top: 10px;
    padding-bottom: 10px;
  }

</style>

<script>

const url = 'http://localhost:8080/login'

export default {
  name: 'Login',
  props: {
  },
  data () {
    return {
      email: '',
      password: '',
      hasError: false,
      errorTitle: '',
      errorDetail: ''
    }
  },
  computed: {
    credentialsDict () {
      return { user: this.email, password: this.password }
    }
  },
  methods: {
    login: function () {
      this.$store.dispatch('requestInitialTokens', {
        url: url,
        credentialsDict: this.credentialsDict
      }).then((data) => {
        this.$router.push('dashboard')
      }).catch(error => {
        console.log(error)
      })
    }
  }
}

</script>
