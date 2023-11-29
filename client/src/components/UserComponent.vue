<template>
    <v-container
    class="spacing-playground pa-6 grey lighten-5"
    fluid
  >
    <v-card class="spacing-playground pa-6 elevation-2">
      <div class="d-flex justify-center">
      <h1>{{title}}</h1>
    </div>
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
    :items="users"
    :search="search"
    :items-per-page="5"
    sort-by="name"
    class=" pa-6"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Utilisateurs</v-toolbar-title>
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
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
            <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
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
                      v-model="editedItem.firstname"
                      label="Prénom"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.lastname"
                      label="Nom"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.birthDate"
                      label="Date d'anniversaire"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.sexe"
                      label="Sexe"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.password"
                      label="Mot de passe"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.clearPassword"
                      label="ClearPassword"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.matricule"
                      label="Matricule"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.role"
                      label="Role"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.departement.name"
                      label="Departement"
                    ></v-text-field>
                  </v-col>
                </v-row>
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
            <v-card-title class="text-h5">Vous êtes sure de supprimer cet utilisateur?</v-card-title>
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
  
<style>
.v-main__wrap{
  background-color: #fafafa !important;
}
</style>
<!-- <script>
export default {
  data () {
    return {
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
        { text: 'Client', value: 'client' },
        { text: 'Responsable', value: 'responsibles' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      projects: [
        {
          name: 'Frozen Yogurt',
          type: 159,
          duration: 6.0,
          description: 24,
          status: 4.0,
          client: '1%',
          responsibles: '1%',
        }
      ],
    }
  },
}
</script> -->
<script>
import store from "@/store";
import Vuex from "vuex";

global.v = Vuex;

  export default {
    store: store,
    name: "User",
    data: () => ({
      dialog: false,
      dialogDelete: false,
      title:'Utilisateur',
      search: '',

      headers: [
        {
          text: 'Nom',
          align: 'start',
          value: 'lastname',
        },
        { text: 'Prénom', value: 'firstname' },
        { text: 'Date de naissance', value: 'birthDate' },
        { text: 'Sexe', value: 'sexe' },
        { text: 'Email', value: 'email' },
        { text: 'Password', value: 'password' },
        { text: 'ClearPassword', value: 'clearPassword' },
        { text: 'Matricule', value: 'matricule' },
        { text: 'Role', value: 'role' },
        { text: 'Departement', value: 'departement.name' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      // users: [],
      editedIndex: -1,
      editedItem: {
        lastname: '',
        firstname: '',
        birthDate: '',
        sexe: '',
        email: '',
        password: '',
        clearPassword: '',
        matricule: '',
        role: '',
        departement: '',
      },
      defaultItem: {
        lastname: '',
        firstname: '',
        birthDate: '',
        sexe: '',
        email: '',
        password: '',
        clearPassword: '',
        matricule: '',
        role: '',
        departement: '',
      },
    }),

    computed: {
      ...Vuex.mapGetters(["users"]),

      formTitle () {
        return this.editedIndex === -1 ? 'Nouvel utilisateur' : 'Modifier utilisateur'
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
      // initialize () {
      //   this.users = [
      //     {
      //   lastname: 'RAOEL',
      //   firstname: 'Ny',
      //   birthDate: '20/09/95',
      //   sexe: 'male',
      //   email: 'ny@gmail.com',
      //   password: 'password',
      //   clearPassword: 'password',
      //   matricule: '20/09/95Ny',
      //   role: 'admin',
      //   departement: 'informatique',
      //     },
      //   ]
      // },

      editItem (item) {
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.users.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.users[this.editedIndex], this.editedItem)
        } else {
          this.users.push(this.editedItem)
        }
        this.close()
      },
    },

    mounted() {
    this.$store.dispatch("fetchUsers");
  },
  }
</script>