<template>
  <v-container>
    <v-row justify="space-around">
      <v-card width="400">
        <v-img
          height="200px"
          src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
        >
          <v-app-bar flat color="rgba(0, 0, 0, 0)">
            <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>

            <v-toolbar-title class="text-h6 white--text pl-0">
              Messages
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn color="white" icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-app-bar>

          <v-card-title class="white--text mt-8">
            <v-avatar size="56">
              <img
                alt="user"
                src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
              />
            </v-avatar>
            <p class="ml-3">John Doe</p>
          </v-card-title>
        </v-img>

        <v-card-text>
          <div class="font-weight-bold ml-8 mb-2">Today</div>

          <v-timeline align-top dense>
            <v-timeline-item
              v-for="message in messages"
              :key="message.time"
              :color="message.color"
              small
            >
              <div>
                <div class="font-weight-normal">
                  <strong>{{ message.from }}</strong> @{{ message.time }}
                </div>
                <div>{{ message.message }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
  <!-- <div
      class="d-flex justify-content-center"
      v-for="task in tasks"
      :key="task.id"
    >
      <div class="col-6 mt-2">
        <b-card :title="task.subject">
          <b-card-text>
            {{ task.description }}
          </b-card-text>
          <b-button variant="info" class="mr-2" @click="updateTask(task.id)"
            >Editar</b-button
          >
          <b-button variant="danger" class="mr-2" @click="deleteTask(task)"
            >Excluir</b-button
          >
        </b-card>
      </div>
    </div>

    <b-modal ref="modalRemove" hide-footer title="Exclusão de tarefa">
      <div class="d-block text-center">
        Deseja realmente excluir a tarefa: {{ taskSelected.subject }}?
      </div>
      <div class="mt-3 d-flex justify-content-end">
        <b-button variant="ligth" @click="hideModal">Cancelar</b-button>
        <b-button class="ml-2" variant="danger" @click="confirmRemoveTask"
          >Excluir</b-button
        >
      </div>
    </b-modal> -->
</template>

<script>
import { db } from "../firebaseDb";
import Vue from "vue";

export default {
  name: "MyList",
  data() {
    return {
      tasks: [],
      taskSelected: "",
    };
  },
  created() {
    this.getTasks();
  },
  methods: {
    getTasks() {
      this.tasks = [];
      db.collection("tasks")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            let objectTask = {};
            objectTask = doc.data();
            objectTask.id = doc.id;
            console.log(this.tasks);
            this.tasks.push(objectTask);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateTask(idTask) {
      this.$router.push({ name: "form", params: { id: idTask } });
    },
    deleteTask(task) {
      this.taskSelected = task;
      this.$refs.modalRemove.show();
    },
    hideModal() {
      this.$refs.modalRemove.hide();
    },
    async confirmRemoveTask() {
      await db.collection("tasks").doc(this.taskSelected.id).delete();
      this.taskSelected = "";
      this.hideModal();
      this.getTasks();
      this.makeToast();
    },
    makeToast() {
      const vm = new Vue();
      vm.$bvToast.toast(`Tarefa excluída com sucesso`, {
        title: "Sucesso",
        autoHideDelay: 5000,
        variant: "success",
      });
    },
  },
};
</script>
