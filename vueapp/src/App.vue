<template>
   <div id="app">
    <nav class="nav">
        <router-link class="nav-link"  to='/'>Home</router-link>
        <router-link class="nav-link" to='/orders'>Orders</router-link>
    </nav>
    <router-view />
  </div>
</template>
<script>
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
nav.nav {
    overflow: hidden;
    background-color: #e9e9e9;
}
a.nav-link {
  float: left;
  display: block;
  color: black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}
</style>