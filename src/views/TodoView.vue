<template>
  <div class="todo-list">
    <h2>To Do List</h2>
    <div class="input-container">
      <input
        class="todo-input"
        v-model="newTodo"
        @keyup.enter="addTodo"
        placeholder="Add new todo"
      />
      <button @click="addTodo" class="submit-btn">Add</button>
      <button @click="toggleCompletedFilter" class="filter-btn">
        {{ showCompleted ? "Hide Completed" : "Show Completed" }}
      </button>
    </div>
    <table class="todo-table">
      <thead>
        <tr>
          <th>Completed</th>
          <th>To Do</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(todo, index) in filteredTodos"
          :key="index"
          class="todo-item"
        >
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
            <button @click="removeTodo(index)" class="delete-btn">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const newTodo = ref('');
const todos = ref([]);
const todoEditText = ref('');
const showCompleted = ref(true);

const addTodo = () => {
  if (newTodo.value.trim() !== '') {
    todos.value.push({
      text: newTodo.value,
      completed: false,
      editing: false,
    });
    newTodo.value = '';
  }
};

const removeTodo = (index) => {
  todos.value.splice(index, 1);
};

const editTodo = (index) => {
  todos.value[index].editing = true;
  todoEditText.value = todos.value[index].text;
};

const saveTodoOnEnter = (index) => {
  if (todoEditText.value.trim() !== '') {
    todos.value[index].text = todoEditText.value;
    todos.value[index].editing = false;
    todoEditText.value = '';
  } else {
    removeTodo(index);
  }
};

const saveTodo = (index) => {
  if (todos.value[index].editing && todoEditText.value.trim() !== '') {
    todos.value[index].text = todoEditText.value;
    todos.value[index].editing = false;
    todoEditText.value = '';
  } else if (!todos.value[index].editing && newTodo.value.trim() !== '') {
    todos.value.push({
      text: newTodo.value,
      completed: false,
      editing: false,
    });
    newTodo.value = '';
  }
};

const toggleCompletedFilter = () => {
  showCompleted.value = !showCompleted.value;
};

const filteredTodos = computed(() => {
  if (showCompleted.value) {
    return todos.value;
  } else {
    return todos.value.filter((todo) => !todo.completed);
  }
});
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
input[type="checkbox"] {
  width: 1.4rem;
  height: 1.4rem;
  accent-color: #27374d;
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
  border: 4px;
}

input.edit-input {
  display: inline-block;
  width: auto;
  margin-left: 5px;
  vertical-align: middle;
}

.completed {
  text-decoration: line-through;
}
.todo-item span {
  font-size: 1rem;
  font-weight: 800;
  color: #fff;
}

.edit-input {
  padding: 0.5rem;
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
  padding: 0.5rem 1rem;

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
  padding: 0.5rem 1rem;

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
  padding: 0.5rem 1rem;

  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 7px;
  font-size: 1rem;
  font-weight: 500;
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
