<template>
  <div>
    <nav class="navbar">
      <a href="#" class="navbar-logo">Rakan<span>Naufal</span>.</a>

      <div class="navbar-nav">
        <router-link to="/">Todo</router-link>
        <router-link to="/post">Post</router-link>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.4rem 7%;
  background-color: rgba(1, 1, 1, 0.5);
  border-bottom: 1px solid #513c28;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
}

.navbar .navbar-logo {
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  font-style: italic;
}

.navbar .navbar-logo span {
  color: #a6a6a6;
}

.navbar .navbar-nav {
  display: flex;
  justify-content: flex-end;
}

.navbar .navbar-nav a {
  color: #fff;
  display: inline-block;
  font-size: 1.3rem;
  margin: 0 1rem;
}

.navbar .navbar-nav a:hover {
  color: var(--primary);
}
.navbar .navbar-nav a::after {
  content: "";
  display: block;
  padding-bottom: 0.5rem;
  border-bottom: 0.1rem solid var(--primary);
  transform: scaleX(0);
  transition: 0.2s linear;
}

.navbar .navbar-nav a:hover::after {
  transform: scaleX(0.5);
}

.navbar .navbar-extra a {
  color: #fff;
  margin: 0 0.5rem;
}

.navbar .navbar-extra a:hover {
  color: var(--primary);
}
</style>
