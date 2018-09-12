<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
  padding: 0;
 }
li {
  list-style-type: none;
}
input[type=submit] {
  margin-top: 30px;
  margin-bottom: 30px;
  border: 1px solid #dadada;
  font-size: 0.8em;
}
input:focus {
  outline: groove;
}
a {
  text-decoration: none;
  color: black;
}

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

.full-bar {
  display: block;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid black;
  width: 100%;
}
.medium-bar{
  display: block;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid black;
  width: 50%;
}
.small-bar {
  display: block;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid black;
  width: 25%;
}
.bar {
  display: block;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid black;
}
.boxes {
  display: flex;
  flex-wrap: wrap;
}
.columns {
  flex-wrap: none;
  display: flex;
  flex-direction: column;
}
.left-text{
  text-align: left;
  margin-left: 1px;
}
.bordered-right {
  border-right: 1px solid black;
}
.medium-bar.bordered-right {
  width: calc(50% - 1px);
  border-right: 1px solid black;
}
</style>
