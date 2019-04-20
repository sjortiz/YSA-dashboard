# TODO: Verify is there is a token and it is valid, if not send to login
<template>
  <div class="home">
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
