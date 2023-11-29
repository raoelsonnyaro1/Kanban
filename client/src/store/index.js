import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import authService from '@/services/authService';


Vue.use(Vuex)

const users_uri = "http://localhost:5000/api/v1/users";
const projects_uri = "http://localhost:5000/api/v1/projects";
const departements_uri = "http://localhost:5000/api/v1/departements";
const clients_uri = "http://localhost:5000/api/v1/clients";
const tasks_uri = "http://localhost:5000/api/v1/tasks";
const login_uri = "http://localhost:5000/api/v1/auth/login";

const state = {
  users: [],
  projects: [],
  project: null,
  departements: [],
  clients: [],
  clientNames: [],
  tasks: [],
  kanbanBoard: {
    todo: [],
    inProgress: [],
    finished: [],
    paymentPending: [],
    paymentDone: [],
  },
  currentStatus: 'todo', // Set a default status
  user: null,
  jwt: null,
};

const getters = {
  users: (state) => state.users,
  projects: (state) => state.projects,
  project: (state) => state.project,
  departements: (state) => state.departements,
  clients: (state) => state.clients,
  clientNames: (state) => {
    return state.clients.map(payload => payload.name);
  },
  tasks: (state) => state.tasks,
  isAuthenticated: (state) => !!state.user,
};

const mutations = {
  setUsers: (state, users) => (state.users = users),
  setProjects: (state, projects) => (state.projects = projects),
  setProject: (state, project) => (state.project = project),
  setDepartements: (state, departements) => (state.departements = departements),
  setClients: (state, clients) => (state.clients = clients),
  setClientsName: (state, clientNames) => (state.clientNames = clientNames),
  setTasks(state, tasks) {
    // state.tasks = tasks;
    state.kanbanBoard = {}; // Clear existing data
    tasks.forEach((task) => {
      const status = task.status;
      if (!state.kanbanBoard[status]) {
        // Initialize status category if not present
        state.kanbanBoard[status] = [];
      }
      state.kanbanBoard[status].push(task);
    });
  }, 

  SET_CURRENT_STATUS(state, newStatus) {
    state.currentStatus = newStatus;
  },

  addTask(state, task) {
    state.tasks.push(task);
  },

  updateTask(state, updatedTask) {
    const index = state.tasks.findIndex((task) => task._id === updatedTask._id);
    console.log(index);
    if (index !== -1) {
      Vue.set(state.tasks, index, updatedTask);
    }
  },

  deleteTask(state, taskId) {
    state.tasks = state.tasks.filter((task) => task._id !== taskId);
  },

  UPDATE_TASK_STATUS(state, payload) {
    // Find the task by ID and update its status
    const taskArray = Object.values(state.kanbanBoard)[payload.taskIndex-1];
    console.log('taskArray',taskArray);
    const taskToUpdate = taskArray.find(task => task._id === payload.taskId);
      console.log('taskToUpdate',taskToUpdate);
    if (taskToUpdate) {
      taskToUpdate.status = newStatus;
    }
  },
  // updateTaskStatus(state, payload) {
  //   const taskArray = Object.values(state.kanbanBoard)[payload.taskIndex-1];
    
  //   if (taskArray) {
  //     const taskToUpdate = taskArray.find(task => task._id === payload.taskId);
  //     console.log('taskToUpdate',taskToUpdate);
  //     if (taskToUpdate) {
  //       // If the task is found, update its status
  //       taskToUpdate.status = payload.newStatus;
  //     }
  //     console.log('taskArray',taskArray);
  //   }
  //   console.log('state kanbanboard',state.kanbanBoard);
  // },
  // updateTaskStatus(state, payload) {
  //   const { taskId, newStatus } = payload;
  //   const taskToUpdate = state.todo.find(task => task._id === payload.taskId)
  //     || state.in_progress.find(task => task._id === payload.taskId)
  //     || state.finished.find(task => task._id === payload.taskId)
  //     || state.payment_pending.find(task => task._id === payload.taskId)
  //     || state.payment_done.find(task => task._id === payload.taskId);

  //   if (taskToUpdate) {
  //     taskToUpdate.status = newStatus;
  //   }
  // },
  


  setUser(state, user) {
    state.user = user;
  },
  setJwt(state, jwt) {
    state.jwt = jwt;
  },
};

const actions = {
  async updateTaskStatus({ commit }, { taskId, newStatus }) {
    try {
      // Perform an API request or update the state directly
      // For example, if you have an API endpoint for updating task status:
      // await api.updateTaskStatus(taskId, { status: newStatus });

      // If you're updating the state directly:
      commit('UPDATE_TASK_STATUS', { taskId, newStatus });
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  },
  // async updateTaskStatus({ commit, state }, payload) {
  //   const findTaskIndex = status => {
  //     const tasksArray = state.kanbanBoard[status];
  //     return tasksArray ? tasksArray.findIndex(task => task._id === payload.taskId) : -1;
  //   };
  
  //   const taskIndex = findTaskIndex('todo') !== -1
  //     ? findTaskIndex('todo')
  //     : findTaskIndex('in_progress') !== -1
  //       ? findTaskIndex('in_progress')
  //       : findTaskIndex('finished') !== -1
  //         ? findTaskIndex('finished')
  //         : findTaskIndex('paymentPending') !== -1
  //           ? findTaskIndex('paymentPending')
  //           : findTaskIndex('paymentDone');
  
  //           console.log(taskIndex);
  //   if (taskIndex !== -1) {
  //     // If the task is found, commit a mutation to update its status
  //     commit('updateTaskStatus', {
  //       taskIndex,
  //       newStatus: payload.newStatus,
  //     });
  //   }
  // },
  // login({ commit }, { username, password }) {
  //   return authService.login({ username, password })
  //     .then(response => {
  //       const token = response.data.token;
  //       commit('setAuthentication', { isAuthenticated: true, token });
  //     })
  //     .catch(error => {
  //       console.error('Login failed', error);
  //       throw error; // Propagate the error to handle it in the component
  //     });
  // },
  async getTasks({ commit }, projectId) {
    const response = await axios.get(`http://localhost:5000/api/v1/tasks/project/${projectId}`);
    commit('setTasks', response.data);
    console.log(response.data);
  },

  async createTask({ commit }, task) {
    const response = await axios.post(tasks_uri, task);
    commit('addTask', response.data);
  },
  async updateTask({ commit }, updatedTask) {
    const response = await axios.put(`http://localhost:5000/api/v1/tasks/${updatedTask._id}`, updatedTask);
    commit('updateTask', response.data);
  },
  async deleteTask({ commit }, taskId) {
    await axios.delete(`http://localhost:5000/api/v1/tasks/${taskId}`);
    commit('deleteTask', taskId);
  },

  async fetchKanbanBoard({ commit }) {
    try {
      const response = await axios.get(tasks_uri); // Adjust the API endpoint
      const tasks = response.data;

      // Organize tasks into status columns
      const organizedTasks = {
        todo: tasks.filter(task => task.status === 'todo'),
        inProgress: tasks.filter(task => task.status === 'in_progress'),
        finished: tasks.filter(task => task.status === 'finished'),
        paymentPending: tasks.filter(task => task.status === 'payment_pending'),
        paymentDone: tasks.filter(task => task.status === 'payment_done'),
      };

      commit('updateKanbanBoard', organizedTasks);
    } catch (error) {
      console.error('Error fetching Kanban board:', error);
    }
  },

  async login({ commit }, credentials) {
    console.log(credentials);
 
    try {
      const response = await axios.post(login_uri, credentials);
      console.log(response);
      const jwt = response.data.jwt;
      commit('setJwt', jwt);
      console.log(jwt);

      // Fetch user information using the token and set it in the state
      const userResponse = await axios.get('http://localhost:5000/api/v1/users', {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      commit('setUser', userResponse.data);

      return true;
    } catch (error) {
      console.error('Login failed', error);
      return false;
    }
  },


  logout({ commit }) {
    commit('setUser', null);
    commit('setJwt', null);
  },


  async fetchUsers({ commit }) {
    const response = await axios.get(users_uri);
    commit("setUsers", response.data);
  },

  // Project
  async fetchProjects({ commit }) {
    const response = await axios.get(projects_uri);
    commit("setProjects", response.data);
  },
  
  async addProject({ commit, state }, payload) {
    const response = await axios.post(projects_uri, payload);
    commit("setProjects", [
      ...state.projects,
      {
        // id: state.departements[state.departements.length - 1].id + 1,
        name: payload.name,
        type: payload.type,
        duration: payload.duration,
        description: payload.description,
        status: payload.status,
        client: payload.client.name,
        responsibles: payload.responsibles,
      },
    ]);
  },

  //Task
  async getProject({ commit }, projectId ) {
    // console.log("Type of id:", typeof projectId);
    // console.log("Value of id:", projectId);
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/projects/${projectId}`);
      // console.log(response.data);
      // console.log("Request URL:", response.config.url);
      commit("setProject", response.data);
   } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
   }
  },


  // Departement
  async fetchDepartements({ commit }) {
    const response = await axios.get(departements_uri);
    commit("setDepartements", response.data);
  },

  async addDepartement({ commit, state }, payload) {
    const response = await axios.post(departements_uri, payload);
    commit("setDepartements", [
      ...state.departements,
      {
        // id: state.departements[state.departements.length - 1].id + 1,
        name: payload.name,
        description: payload.description,
      },
    ]);
  },

// Clients
  async fetchClients({ commit }) {
    const response = await axios.get(clients_uri);
    commit("setClients", response.data);
  },


  async addClient({ commit, state }, payload) {
    const response = await axios.post(clients_uri, payload);
    commit("setClients", [
      ...state.clients,
      {
        // id: state.departements[state.departements.length - 1].id + 1,
        name: payload.name,
        activity_type: payload.activity_type,
        email: payload.email,
        phone: payload.phone,
        location: payload.location,
      },
    ]);
  },
}

let store = new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
});

global.store = store;

export default store;
