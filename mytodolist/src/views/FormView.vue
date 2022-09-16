<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="name"
        :counter="10"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-select
        v-model="select"
        :items="items"
        :rules="[(v) => !!v || 'Item is required']"
        label="Item"
        required
      ></v-select>

      <v-checkbox
        v-model="checkbox"
        :rules="[(v) => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Validate
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>

      <v-btn color="warning" @click="resetValidation"> Reset Validation </v-btn>
    </v-form>
    <!-- <b-form class="mt-2">
      <b-row>
        <b-col class="col-6 offset-sm-3">
          <b-form-group label="Tarefa:" label-for="subject">
            <b-form-input
              id="subject"
              v-model="form.subject"
              type="text"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col class="col-6 offset-sm-3">
          <b-form-group label="Descrição:" label-for="description">
            <b-form-textarea
              id="description"
              v-model="form.description"
              type="text"
              required
            ></b-form-textarea>
          </b-form-group>
        </b-col>

        <b-col class="col-6 offset-sm-3">
          <b-button type="button" variant="info" @click="saveTask"
            >Salvar</b-button
          >
          <b-button type="reset" variant="warning" class="ml-2"
            >Limpar</b-button
          >
        </b-col>
      </b-row>
    </b-form> -->
  </div>
</template>

<script>
import { db } from "../firebaseDb";
import Vue from "vue";

export default {
  name: "Form",
  data() {
    return {
      form: {
        id: "",
        subject: "",
        description: "",
      },
    };
  },
  created() {
    this.form.id = this.$route.params.id;
    if (this.form.id) {
      db.collection("tasks")
        .doc(this.form.id)
        .get()
        .then((snapshot) => {
          const task = snapshot.data();
          this.form.subject = task.subject;
          this.form.description = task.description;
        });
    }
  },
  methods: {
    saveTask() {
      if (this.form.id) {
        this.updateTask();
      } else {
        this.insertTask();
      }
    },
    insertTask() {
      delete this.form.id;
      db.collection("tasks")
        .add(this.form)
        .then(() => {
          this.clearForm();
          this.makeToast();
          this.$router.push({ name: "list" });
        });
    },
    updateTask() {
      db.collection("tasks")
        .doc(this.form.id)
        .set(this.form)
        .then(() => {
          this.clearForm();
          this.makeToast();
          this.$router.push({ name: "list" });
        });
    },
    clearForm() {
      this.form.subject = "";
      this.form.description = "";
    },
    makeToast() {
      const vm = new Vue();
      vm.$bvToast.toast(`Tarefa salva com sucesso`, {
        title: "Sucesso",
        autoHideDelay: 5000,
        variant: "success",
      });
    },
  },
};
</script>
