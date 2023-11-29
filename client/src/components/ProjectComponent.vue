<template>
  
    <v-container
    class="spacing-playground pa-6 grey lighten-5"
    fluid
  >


    <v-card class="spacing-playground pa-6 elevation-2">
      <div class="d-flex justify-center">
      <h1>{{title}}</h1>
    </div>
    <v-row class="justify-end mb-6 pa-8">  <v-btn fab color="primary" dark class="mb-2" @click="addNewItem">
    <v-icon>mdi-plus</v-icon>
          </v-btn></v-row>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
    :headers="headers"
    :items="projects"
    :search="search"
    :items-per-page="5"
    sort-by="name"
    class="pa-6"
  >

  
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>PROJET</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <!-- <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Nouveau projet
            </v-btn>
          </template> -->
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.type"
                      label="Type"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.duration"
                      label="Duration"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.status"
                      label="Status"
                      :disabled="statusDropdownDisabled"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    class="d-flex"
                    cols="12"
                    sm="6"
                  >
                    <v-select
                      v-model="editedItem.client"
                      :items="clientOptions"
                      label="Client"
                      item-text="name"
                      item-value="id"
                    ></v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-select
                      v-model="editedItem.responsibles"
                      :items="responsiblesOptions"
                      label="Responsibles"
                      item-text="firstname"
                      item-value="id"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-textarea
                      v-model="editedItem.description"
                      label="Description"
                      rows="5"  
                      auto-grow 
                    ></v-textarea>
                  </v-col>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Vous êtes sure de supprimer ce projet?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <router-link v-if="item._id" :to="{name: 'projectDetail', params:{projectId: item._id }}">
        <v-icon
        small
        class="mr-2"
      >
        mdi-eye
      </v-icon>
      </router-link>

      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
    </v-card>
  </v-container>
  </template>

<script>
import store from "@/store";
import Vuex from "vuex";

global.v = Vuex;
  export default {
    store: store,
    data: () => ({
      dialog: false,
      dialogDelete: false,
      title:'Projet',
      search: '',

      headers: [
        {
          text: 'Nom du projet',
          align: 'start',
          value: 'name',
        },
        { text: 'Type', value: 'type' },
        { text: 'Duration', value: 'duration' },
        { text: 'Description', value: 'description' },
        { text: 'Status', value: 'status' },
        { text: 'Client', value: 'client.name' },
        { text: 'Responsable', value: 'responsibles' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],

      clientOptions: [], // List of clients for the dropdown
      responsiblesOptions: [], // List of Responsibles for the dropdown
      
      editedIndex: -1,
      editedItem: {
        name: '',
          type: '',
          duration: '',
          description: '',
          status: 'STARTED', // Set default value
          client: '',
          responsibles: '',
      },

      statusDropdownDisabled: true, // Flag to disable the dropdown

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
      ...Vuex.mapGetters(["projects","clientNames"]),
 
      formTitle () {
        return this.editedIndex === -1 ? 'Nouveau projet' : 'Modifier le projet'
      },
      
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    // created () {
    //   this.initialize()
    // },

    methods: {
      ...Vuex.mapActions({
      addProjectStore: "addProject",
    }),

    

      async editItem(item) {
        await this.$store.dispatch("fetchClients");
        this.editedIndex = this.projects.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.statusDropdownDisabled = false; // Enable the status dropdown
        
        await this.fetchItemAndOpenModal();
      },

      async addNewItem() {
        // Initialize the editedItem with default values
        this.editedItem = Object.assign({}, this.defaultItem);
        this.statusDropdownDisabled = true; // Disable the status dropdown for new items

        await this.fetchItemAndOpenModal();
      },

      async fetchItemAndOpenModal() {
        // Fetch the list of clients before opening the modal
        await this.$store.dispatch("fetchClients");
        await this.$store.dispatch("fetchUsers");
        
        // Update the clientOptions with the fetched clients
        this.clientOptions = this.$store.getters.clients;
        this.responsiblesOptions = this.$store.getters.users;
        console.log( this.responsiblesOptions);
        
        this.dialog = true;
      },

      deleteItem (item) {
        this.editedIndex = this.projects.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.projects.splice(this.editedIndex, 1)
        this.closeDelete()
      },


      close() {
        this.dialog = false;
        this.statusDropdownDisabled = true; // Disable the dropdown
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save() {
        if (this.editedIndex > -1) {
          Object.assign(this.projects[this.editedIndex], this.editedItem);
        } else {
          this.addProjectStore(this.editedItem);
        }
        this.close();
      },

    },

    mounted() {
    this.$store.dispatch("fetchProjects");
    },
  }
</script>