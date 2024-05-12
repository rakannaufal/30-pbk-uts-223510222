<template>
  <div class="container">
    <h1>Fitur Posting</h1>

    <div class="container-post">
      <div class="user-select">
        <label for="user">Pilih User: </label>
        <select id="user" v-model="selectedUser">
          <option :value="null">Semua User</option>
          <option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.name }}
          </option>
        </select>
      </div>
      <div class="post-list">
        <h2>Postingan dari {{ nameFormat }}</h2>
        <ul>
          <li v-for="post in filteredPosts" :key="post.id">
            <h3> Title : {{ post.title }}</h3>
            <p>{{ post.body }}</p>
            <p>Ditulis oleh: {{ getUserById(post.userId).name }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";

export default {
  setup() {
    const users = ref([]);
    const selectedUser = ref(null);
    const posts = ref([]);

    // Fetch users from JSONPlaceholder
    const fetchUsers = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      users.value = data;
    };

    // Fetch posts from JSONPlaceholder
    const fetchPosts = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      posts.value = data;
    };

    // Filter posts based on selected user
    const filteredPosts = computed(() => {
      if (selectedUser.value === null) {
        return posts.value;
      }
      return posts.value.filter((post) => post.userId === selectedUser.value);
    });

    // Fetch data on mount
    onMounted(() => {
      fetchUsers();
      fetchPosts();
    });

    // Function to get user by ID
    const getUserById = (userId) => {
      return (
        users.value.find((user) => user.id === userId) || {
          name: "User Tidak Ditemukan",
        }
      );
    };

    // Format user name
    const nameFormat = computed(() => {
      if (selectedUser.value === null) {
        return "Semua User";
      }
      const user = getUserById(selectedUser.value);
      return user.name;
    });

    return {
      users,
      selectedUser,
      filteredPosts,
      nameFormat,
      getUserById,
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 2rem;
  font-weight: 800;
  padding-top: 2rem;
  text-align: center;
  color: #fff;
}
h3 {
  font-weight: bold;
  font-size: 1.2rem;
}  
.container {
  margin: 7rem auto;
  width: 800px;
  background-color: #526d82;
  border-radius: 7px;
  list-style: none;
  color: #fff;
}
.container-post {
  margin: 0 5rem;
  padding: 2rem;
}
label {
  font-size: 1.2rem;
}
select {
  appearance: none;
  -webkit-appearance: none;
  font-size: 1rem;
  padding: 4px;
  background-color: #fff;
  border: 1px solid #caced1;
  border-radius: 0.25rem;
  color: #000;
  cursor: pointer;
}

.post-list li {
  margin-bottom: 1rem;
  border-radius: 7px;
  padding: 10px;
  background-color: #9db2bf;
}
</style>
