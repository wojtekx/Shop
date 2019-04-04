<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
html{
   background-color: #788bdf8a;
  padding: 0;
  margin: 0;
  min-height: 100vh;
}
body{
  margin: 0;
}
button{
  cursor: pointer;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
  max-width: 1000px;
  margin: 0 auto;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
