<template>
  <div class="input-container">
    <q-input
      class="todo-input"
      v-model="localNewTodo"
      @keyup.enter="addTodo"
      placeholder="Add new todo"
      outlined
      dense
      clearable
      input-class="custom-input"
      style="background-color: #fff; border-radius: 5px"
    />
    <q-btn
      @click="addTodo"
      class="submit-btn"
      label="Add"
      color="positive"
      style="background-color: #4caf50; color: #fff"
    />
    <q-btn
      @click="toggleCompletedFilter"
      class="filter-btn"
      :label="showCompleted ? 'Hide Completed' : 'Show Completed'"
      style="background-color: #ffcc00; color: #fff; margin-left: 10px"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { QInput, QBtn } from "quasar";

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
    emit("update:newTodo", "");
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
  flex: 1;
  margin-right: 5px;
}
.custom-input {
  padding: 0.5rem;
  font-size: 1rem;
}
.submit-btn,
.filter-btn {
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  border-radius: 7px;
  font-size: 14px;
}
</style>
