<template>
  <header>
    <nav>
      <ul>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'Home'}">
            <img class="logo" src="./assets/build-a-bot-logo.png" alt="logo">
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'Build'}">
            Build
          </router-link>
        </li>
        <li class="nav-item cart">
          <router-link class="nav-link" :to="{name: 'Cart'}">
            Cart <span class="cart-items">({{ cart.length }})</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
  <div class="container">
    <aside class="aside">
      <router-view name="sidebar"/>
    </aside>
    <main>
      <router-view/>
    </main>
  </div>

</template>

<script>
import store from './store';

export default {
  name: 'App',
  computed: {
    cart() {
      return store.state.robots.cart;
    },
  },
};
</script>

<style>
body {
  background: linear-gradient(to bottom, #555, #9929) fixed;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style scoped>
main {
  padding: 20px;
  background-color: white;
  width: 964px;
  min-height: 300px;
}

header {
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #999;
  width: 1184px;
}

ul {
  padding: 3px;
  display: flex;
}

.nav-item {
  display: inline-block;
  padding: 5px 10px;
  font-size: 22px;
  border-right: 1px solid #bbb;
}

.nav-item.cart {
  position: relative;
  margin-left: auto;
  border-right: none;
}

.logo {
  vertical-align: middle;
  height: 30px;
}

.nav-link {
  text-decoration: none;
  color: inherit;
}

.router-link-active {
  color: white;
}

.container {
  display: flex;
  margin: 10px auto 0 auto;
  justify-content: center;
}

.aside {
  padding: 30px;
  background: #aaa;
  width: 100px;
  min-height: 300px;
}

.cart-items {
  border-radius: 50%;
  background: #9929;
  color: white;
}
</style>
