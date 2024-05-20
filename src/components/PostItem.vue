<template>
  <li class="post-item">
    <h3>Title : {{ post.title }}</h3>
    <p>{{ post.body }}</p>
    <p class="by">Ditulis oleh: {{ userName }}</p>
  </li>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
  getUserById: {
    type: Function,
    required: true,
  },
});

const userName = computed(() => {
  const user = props.getUserById(props.post.userId);
  return user.name;
});
</script>

<style scoped>
.post-item {
  margin-bottom: 1rem;
  border-radius: 7px;
  padding: 10px;
  background-color: #9db2bf;
}
h3 {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 10px;
}
.by {
  margin-top: 10px;
  font-weight: bold;
}
</style>
