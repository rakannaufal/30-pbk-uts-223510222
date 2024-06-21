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
import { storeToRefs } from "pinia";
import { useTodoStore } from "../stores/todoStore.js";
import TodoInput from "../components/TodoInput.vue";
import TodoList from "../components/TodoList.vue";

const todoStore = useTodoStore();
const { newTodo, todos, showCompleted } = storeToRefs(todoStore);
const {
  updateNewTodo,
  addTodo,
  removeTodo,
  editTodo,
  saveTodo,
  toggleCompletedFilter,
} = todoStore;
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
