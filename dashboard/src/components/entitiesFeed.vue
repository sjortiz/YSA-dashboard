<template>
  <div class="wrap">
    <span class="full-bar">
      <router-link :to="URL" class="red"> Hit me up and make new {{entity}}! </router-link>
    </span>
    <div class="boxes">
      <span class="full-bar">{{entity}}</span>
    </div>
    <div class="boxes">
      <div class="medium-bar bordered-right" v-for="(object, index) in objects" :key=object.name>
        <label for="">{{object.name}}</label>
        <div v-if="entity == 'features'">
          <button @click="toggleEntity(index, object.group, object.name)">
            {{object.status ? 'Hit me to disable': 'Hit me to enable' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

input[type=submit] {
  width: 200px;
  min-height: 30px;
  margin: 0;
  padding: 0;
  border-width: 3px;
}
i {
  font-weight: bold;
  font-size: 12px;
  margin: 0 4px 0 2px;
}
label {
  display: inline-block;
}
.actions {
  text-align: right;
  display: inline-block;
  width: 100%;
}
.table {
  display: inline-block;
  margin-top: 30px;
}
.red {
  color: red;
  font-weight: bold;
}
</style>

<script>
import { asynchRequest, retryRequestIfToken } from '../utils/utils'

export default {
  data () {
    return {
      hasError: false,
      objects: [],
      entity: this.$route.params.entity
    }
  },
  computed: {
    URL: function () {
      return `/dashboard/${this.entity}/new`
    }
  },
  methods: {
    toggleEntity (index, group, feature) {
      let url = `http://localhost:8080/status/${group}/${feature}`
      retryRequestIfToken(
        url,
        { ...this.$store.getters.retrieveHeadersWithToken },
        null,
        'put'
      ).then(data => {
        console.log(data)
        this.$set(this.objects, index, data.data)
      }).catch(error => {
        console.log(error)
      })
    },
    fillComponent (entity) {
      this.entity = entity
      asynchRequest(
        `http://localhost:8080/${entity}`,
        { ...this.$store.getters.retrieveHeadersWithToken },
        null,
        'GET'
      ).then(data => {
        console.log(data)
        this.objects = data.data
      }).catch(error => {
        this.objects = []
        console.log(error)
      })
    }
  },
  watch: {
    '$route' (to, from) {
      this.fillComponent(to.params.entity)
    }
  },
  mounted () {
    this.fillComponent(this.entity)
  }
}
</script>
