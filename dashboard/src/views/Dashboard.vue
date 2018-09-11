<template>
  <div class="dashboard">
    <nav>
      <aside>
        <span>YSA</span>
      </aside>
      <ul>
        <li class="first">
          <router-link to='/dashboard'>Home</router-link>
        </li>
        <li>
          <router-link to='/dashboard/apps'>Apps</router-link>
        </li>
        <li>
          <router-link to='/dashboard/groups'>Groups</router-link>
        </li>
        <li>
          <router-link to='features'>Features</router-link>
        </li>
        <li>
          <router-link to='users'>Users</router-link>
        </li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
  aside {
    float: left;
    margin-left: 20px;
    font-weight: bold;
    margin-top: 2px;
  }
  nav {
    margin-top: 0;
    padding-top: 0;
    display: block;
  }
  ul {
    margin: 0;
    padding: 0;
    text-align: right;
    border-bottom: 1px solid black;
  }
  li {
    text-align: center;
    width: 10%;
    min-width: 90px;
    display: inline-block;
    margin-top: 0;
    margin-bottom: -6px;
    padding: 0;
    font-size: 20px;
    overflow: hidden;
    border-right: 1px solid black;
  }
  li.first {
    border-left: 1px solid black;
  }
  nav a:hover {
    text-decoration: underline;
  }
</style>
