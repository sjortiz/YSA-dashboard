<template>
  <div class="wrap">
    <span class="full-bar">
      <router-link to="/dashboard/apps/new" class="red"> Hit me up and make a new app! </router-link>
    </span>
    <div class="boxes">
      <span class="full-bar">Apps</span>
    </div>
    <div class="boxes">
      <div class="medium-bar bordered-right" v-for="app in apps" :key=app.id>
        <label for="">{{app.name}}</label>
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
export default {
  data () {
    return {
      hasError: false,
      apps: []
    }
  },
  mounted () {
    fetch('http://localhost:8080/apps', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        // eslint-disable-next-line
        if (response.status == 200) {
          this.hasError = false
        } else {
          this.hasError = true
        }
        return response.json()
      }).then(data => {
        if (this.hasError) {
          console.log(data)
        } else {
          this.apps = data.data
        }
      })
  }
}
</script>
