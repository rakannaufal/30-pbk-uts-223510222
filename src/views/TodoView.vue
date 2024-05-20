<template>
  <div class="todo-list">
    <h2>To Do List</h2>
    <TodoInput
      :newTodo="newTodo"
      :showCompleted="showCompleted"
      @update:newTodo="updateNewTodo"
      @addTodo="addTodo"
      @toggleCompletedFilter="toggleCompletedFilter"
    />
    <TodoList
      :todos="todos"
      :showCompleted="showCompleted"
      @editTodo="editTodo"
      @saveTodo="saveTodo"
      @removeTodo="removeTodo"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import TodoInput from "../components/TodoInput.vue";
import TodoList from "../components/TodoList.vue";

const newTodo = ref("");
const todos = ref([]);
const showCompleted = ref(true);

const updateNewTodo = (value) => {
  newTodo.value = value;
};

const addTodo = (todoText) => {
  if (todoText.trim() !== "") {
    todos.value.push({
      text: todoText,
      completed: false,
      editing: false,
    });
    newTodo.value = ""; // Clear the input after adding
  }
};

const removeTodo = (index) => {
  todos.value.splice(index, 1);
};

const editTodo = (index) => {
  todos.value[index].editing = true;
};

const saveTodo = (index, text) => {
  if (text.trim() !== "") {
    todos.value[index].text = text;
    todos.value[index].editing = false;
  } else {
    removeTodo(index);
  }
};

const toggleCompletedFilter = () => {
  showCompleted.value = !showCompleted.value;
};
</script>

<style scoped>
.todo-list {
  margin: 7rem auto;
  padding: 2rem;
  width: 800px;
  background-color: #526d82;
  border-radius: 7px;
}
h2 {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 2rem;
  text-align: center;
  color: #fff;
}
</style>
