<template>
    <user-component/>
  </template>
  
  <script>

import UserComponent from '@/components/UserComponent.vue'
  
    export default {
      name: 'User',
  
      components: {
            UserComponent,
      },
    }
  </script>