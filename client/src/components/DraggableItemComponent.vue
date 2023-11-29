<template>
    <v-card>
      <v-card-title>{{ task.title }}</v-card-title>
      <v-card-subtitle>{{ task.description }}</v-card-subtitle>
      <!-- Add other task details as needed -->
    </v-card>
  </template>
  
  <script>
  export default {
    props: ['task'],
  };
  </script>