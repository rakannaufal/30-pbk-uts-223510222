<template>
  <tr class="todo-item">
    <td>
      <input class="todo-checkbox" type="checkbox" v-model="todo.completed" />
    </td>
    <td>
      <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
      <input
        v-if="todo.editing"
        v-model="todoEditText"
        @keyup.enter="saveTodoOnEnter"
        @blur="saveTodo"
        class="edit-input"
      />
    </td>
    <td class="button">
      <button v-if="!todo.editing" @click="editTodo" class="edit-btn">
        Edit
      </button>

      <button v-if="todo.editing" @click="saveTodo" class="ok-btn">OK</button>
      <button @click="removeTodo" class="delete-btn">Delete</button>
    </td>
  </tr>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["editTodo", "saveTodo", "removeTodo"]);

const todoEditText = ref(props.todo.text);

const editTodo = () => {
  emit("editTodo", props.index);
};

const saveTodoOnEnter = () => {
  emit("saveTodo", props.index, todoEditText.value);
};

const saveTodo = () => {
  emit("saveTodo", props.index, todoEditText.value);
};

const removeTodo = () => {
  emit("removeTodo", props.index);
};
</script>

<style scoped>
.todo-item span {
  font-size: 1rem;
  font-weight: 800;
  color: #fff;
}
.completed {
  text-decoration: line-through;
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
</style>
