<!-- KanbanColumn.vue -->
<template>
  <v-col>
    <v-card>
      <v-card-title>{{ status }}</v-card-title>
      <v-card-text>
        <draggable
          :list="tasks"
          :group="status"
          @end="onDragEnd"
          :move="checkMove"
        >
          <kanban-task
            v-for="task in tasks"
            :key="task.id"
            :task="task"
          ></kanban-task>
        </draggable>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import Draggable from 'vuedraggable';
import KanbanTask from './KanbanTaskComponent.vue';

export default {
  props: ['status'],
  components: {
    Draggable,
    KanbanTask,
  },
  computed: {
    tasks() {
      console.log('status:', this.status);
    console.log('kanbanBoard:', this.$store.state.kanbanBoard);

    const tasksForStatus = this.$store.state.kanbanBoard[this.status] || [];
    console.log('tasksForStatus:', tasksForStatus);

    return tasksForStatus;
    },
  },
  methods: {
    onDragEnd(event) {
      const draggedTaskId = event.item.dataset.taskId;
      const newStatus = this.status;

      if (draggedTaskId) {
        const fromIndex = event.oldIndex;
        const toIndex = event.newIndex;

        this.$store.dispatch('updateTaskStatus', {
          taskId: draggedTaskId,
          newStatus,
          fromIndex,
          toIndex,
        });

        // Fetch tasks again to reflect the updated state
        this.$store.dispatch('getTasks');
      }
    },
    checkMove(evt) {
      // Customize your move validation logic here if needed
      return true;
    },
  },
  mounted() {
      console.log("Project ID:", this.$route.params.projectId);
      // this.$store.dispatch("getProject", { id: this.$route.params.id });
      this.$store.dispatch("getTasks", this.$route.params.projectId);
    },
};
</script>
