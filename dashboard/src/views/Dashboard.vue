<template>
  <div class="dashboard">
    <nav>
      <aside>
        <span>YSA</span>
      </aside>
      <ul>
        <li>
          <router-link to='/dashboard'>Home</router-link>
        </li>
        <li>
          <router-link to='/dashboard/features'>Features</router-link>
        </li>
        <li>
          <router-link to='/dashboard/workspaces'>Workspaces</router-link>
        </li>
        <li>
          <router-link to='/dashboard/apps'>Applications</router-link>
        </li>
        <li>
          <router-link to='/dashboard/users'>Users</router-link>
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
  span {
    color: black;
  }
  nav {
    background-color: white;
    margin-top: 0;
    padding-top: 0;
    display: block;
    color: black;
  }
  ul {
    margin: 0;
    padding: 0;
    text-align: right;
    border-bottom: 1px solid black;
  }
  li {
    text-align: center;
    padding-right: 1%;
    display: inline-block;
    font-size: 20px;
  }
  nav a:hover {
    text-decoration: underline;
  }
  a {
    color: black;
  }
</style>
