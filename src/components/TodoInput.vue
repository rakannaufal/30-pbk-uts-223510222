<template>
  <div class="input-container">
    <input
      class="todo-input"
      v-model="localNewTodo"
      @keyup.enter="addTodo"
      placeholder="Add new todo"
    />
    <button @click="addTodo" class="submit-btn">Add</button>
    <button @click="toggleCompletedFilter" class="filter-btn">
      {{ showCompleted ? "Hide Completed" : "Show Completed" }}
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  newTodo: {
    type: String,
    required: true,
  },
  showCompleted: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits([
  "update:newTodo",
  "addTodo",
  "toggleCompletedFilter",
]);

const localNewTodo = ref(props.newTodo);

watch(
  () => props.newTodo,
  (newVal) => {
    localNewTodo.value = newVal;
  }
);

const addTodo = () => {
  if (localNewTodo.value.trim() !== "") {
    emit("addTodo", localNewTodo.value);
    emit("update:newTodo", ""); // Clear the input after adding
  }
};

const toggleCompletedFilter = () => {
  emit("toggleCompletedFilter");
};
</script>

<style scoped>
.input-container {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}
.todo-input {
  margin-right: 5px;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 5px;
  border: none;
  flex: 1;
}
.submit-btn {
  background-color: #4caf50;
  padding: 0.5rem 1rem;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 7px;
  font-size: 1rem;
  font-weight: 800;
}
.filter-btn {
  background-color: #ffcc00;
  padding: 0.5rem 1rem;
  color: #000;
  border: none;
  cursor: pointer;
  border-radius: 7px;
  font-size: 1rem;
  font-weight: 800;
  margin-left: 10px;
}
</style>
