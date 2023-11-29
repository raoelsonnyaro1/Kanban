<!-- src/views/Login.vue -->
<template>
   <v-container fluid>
     <v-row justify="center mt-16">
       <v-col cols="12" sm="8" md="6" class="pa-16">
         <v-card class="pa-16">
           <v-card-title class="text-h6 text-center">Login</v-card-title>
           <v-card-text>
             <v-form @submit.prevent="login">
               <v-text-field v-model="username" label="Username" required></v-text-field>
               <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
               <v-btn type="submit" color="primary" class="mr-4">Login</v-btn>
             </v-form>
           </v-card-text>
           <v-card-actions class="justify-center">
             <router-link to="/register">
               Register
             </router-link>
           </v-card-actions>
         </v-card>
         <div v-if="loading">Logging in...</div>
       </v-col>
     </v-row>
   </v-container>
 </template>
 
 <script>
 export default {
   data() {
     return {
       username: '',
       password: '',
       loading: false,
     };
   },
   methods: {
    async login() {
      this.loading = true;
      try {
      const credentials = { username: this.username, password: this.password };
      const success = await this.$store.dispatch('login', credentials);
      if (success) {
        this.$router.push('/');
      } else {
        console.log(success);
        this.$router.push('/');
      }
    } catch (error) {
        console.error('Login error:', error);
        // Handle the error (show an error message, etc.)
      } finally {
        this.loading = false;
      }
    },
  },
 };
 </script>
 