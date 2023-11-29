<template>
    <div>
      <router-link to="/project"><v-btn color="primary btn-back"  icon>
    <v-icon>mdi-arrow-left</v-icon>
  </v-btn></router-link>
      
      <v-card class="mx-auto" max-width="600" outlined>
        <v-list-item three-line>
          <v-list-item-content v-if="project">
            <div  class="text-overline mb-4"><h1>{{project.name}}</h1></div>
            <div  class="text-overline mb-4"><h2>Status:{{project.status}}</h2></div>
            <div  class="text-overline mb-4"><h2>Client:{{project.client.name}}</h2></div>
          </v-list-item-content>
        </v-list-item>
      </v-card>
      <v-row>
        <v-container fluid>
            <v-row>
              <kanban-column
                v-for="(status, index) in statuses"
                :key="index"
                :status="status"
              ></kanban-column>
            </v-row>
          </v-container>
  </v-row>
    </div>
    
  </template>
    
    <script>
  import store from "@/store";
  import Vuex from "vuex";
  import KanbanColumn from './KanbanColumnComponent.vue';
  
  global.v = Vuex;
  
  export default {
    props: ['task'],
    components: {
      KanbanColumn,
    },
    store: store, 
    name: "ProjectDetail",

    data: () => ({
      defaultItem: {
        name: '',
          type: '',
          duration: '',
          description: '',
          status: '',
          client: '',
          responsibles: '',
      },
    }),
  
    computed: {
      ...Vuex.mapGetters(["project","tasks"]),

      statuses() {
      return ['todo', 'in_progress', 'finished', 'payment_pending', 'payment_done'];
    },
    },
    mounted() {
      console.log("Project ID:", this.$route.params.projectId);
      // this.$store.dispatch("getProject", { id: this.$route.params.id });
      this.$store.dispatch("getProject", this.$route.params.projectId);
    },
  };
  </script>

<style scoped>
.btn-back {
  background-color: #344D59;
}
</style>