<!-- KanbanTask.vue -->
<template>
    <v-card :ref="`taskCard-${task.id}`" draggable="true">
      <v-card-title>{{ task.title }}</v-card-title>
      <v-card-subtitle>{{ task.description }}</v-card-subtitle>
      <v-card-subtitle>{{ task.status }}</v-card-subtitle>
    </v-card>
  </template>
  
  <script>
  export default {
    props: ['task'],
  };
  </script>
  