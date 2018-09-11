<template>
  <div class="home">

    <div class="links">
      <router-link to='about'>About</router-link>
    </div>

    <Login :storage="storage"> </Login>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'

export default {
  name: 'Home',
  props: {
    storage: Object
  },
  components: {
    Login
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>

  .links {
    margin: 0 20px 0 0;
    padding: 0;
    text-align: right;
  }

  .links a {
    font-weight: bold;
    text-decoration: none;
    color: #2c3e50;
  }

  .links a.router-link-exact-active {
    color: #42b983;
  }

</style>
