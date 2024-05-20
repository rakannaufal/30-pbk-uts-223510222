<template>
  <table class="todo-table">
    <thead>
      <tr>
        <th>Completed</th>
        <th>To Do</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(todo, index) in filteredTodos" :key="index" class="todo-item">
        <td>
          <input
            class="todo-checkbox"
            type="checkbox"
            v-model="todo.completed"
          />
        </td>
        <td>
          <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
          <input
            v-if="todo.editing"
            v-model="todoEditText"
            @keyup.enter="saveTodoOnEnter(index)"
            @blur="saveTodo(index)"
            class="edit-input"
          />
        </td>
        <td class="button">
          <button
            v-if="!todo.editing"
            @click="editTodo(index)"
            class="edit-btn"
          >
            Edit
          </button>
          <button v-if="todo.editing" @click="saveTodo(index)" class="ok-btn">
            OK
          </button>
          <button @click="removeTodo(index)" class="delete-btn">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  todos: {
    type: Array,
    required: true,
  },
  showCompleted: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["editTodo", "saveTodo", "removeTodo"]);

const todoEditText = ref("");

const filteredTodos = computed(() => {
  if (props.showCompleted) {
    return props.todos;
  } else {
    return props.todos.filter((todo) => !todo.completed);
  }
});

const editTodo = (index) => {
  emit("editTodo", index);
};

const saveTodoOnEnter = (index) => {
  emit("saveTodo", index, todoEditText.value);
};

const saveTodo = (index) => {
  emit("saveTodo", index, todoEditText.value);
};

const removeTodo = (index) => {
  emit("removeTodo", index);
};

watch(filteredTodos, (newVal) => {
  newVal.forEach((todo) => {
    if (todo.editing) {
      todoEditText.value = todo.text;
    }
  });
});
</script>

<style scoped>
.todo-table {
  width: 100%;
  border-collapse: collapse;
}
.todo-table th,
.todo-table td {
  padding: 8px;
  border-bottom: solid 1px #fff;
}
.todo-table th {
  padding: 8px;
  font-weight: bold;
  background-color: #9db2bf;
  text-align: center;
  color: #fff;
}
td {
  position: relative;
  text-align: center;
}

span.completed {
  text-decoration: line-through;
}

input.edit-input {
  display: inline-block;
  width: auto;
  margin-left: 5px;
  vertical-align: middle;
}

.todo-item span {
  font-size: 1rem;
  font-weight: 800;
  color: #fff;
}

.edit-input {
  padding: 0.4rem;
  border: none;
  font-size: 1rem;
  border-radius: 3px;
  margin-left: 10px;
  width: 100%;
}
.button {
  display: flex;
  justify-content: center;
  font-weight: 800;
}
.delete-btn {
  background-color: #f44336;
  padding: 0.4rem 1rem;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 7px;
  font-size: 1rem;
  font-weight: 500;
}
.edit-btn {
  margin-right: 5px;
  background-color: #1e5ceb;
  padding: 0.4rem 1rem;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 7px;
  font-size: 1rem;
  font-weight: 500;
}
.ok-btn {
  margin-right: 5px;
  background-color: #008cba;
  padding: 0.4rem 1rem;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 7px;
  font-size: 1rem;
  font-weight: 500;
}
</style>
