<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="navbar">
      <q-toolbar-title>
        <a href="#" class="navbar-logo">Rakan<span>Naufal</span>.</a>
      </q-toolbar-title>

      <div class="navbar-nav">
        <router-link to="/todos" class="nav-link">Todo</router-link>
        <router-link to="/post" class="nav-link">Post</router-link>
        <router-link to="/albums" class="nav-link">Album</router-link>
      </div>
    </q-header>
  </q-layout>
</template>
<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.4rem 7%;
  background-color: #10213a;
  border-bottom: 1px solid #513c28;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
}

.navbar-logo {
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  font-style: italic;
}

.navbar-logo span {
  color: #a6a6a6;
}

.q-toolbar {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.navbar-nav {
  display: flex;
  align-items: center;
}

.nav-link {
  color: #fff;
  font-size: 1.3rem;
  margin: 0 1rem;
  text-decoration: none;
  position: relative;
}

.nav-link:hover {
  color: var(--q-primary);
}

.nav-link::after {
  content: "";
  display: block;
  padding-bottom: 0.5rem;
  border-bottom: 0.1rem solid var(--q-primary);
  transform: scaleX(0);
  transition: 0.2s linear;
}

.nav-link:hover::after {
  transform: scaleX(0.5);
}
</style>
