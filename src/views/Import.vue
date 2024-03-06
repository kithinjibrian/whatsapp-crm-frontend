<script setup>
import { ref } from "vue";
import { useContactsStore } from "../store/contacts";
const file = ref(null);
const loading = false;
const store = useContactsStore();

const submit = () => {
  if (!file.value[0]) {
    console.error("No file selected");
    return;
  }

  const body = new FormData();
  body.set("file", file.value[0]);
  store.uploadContacts(body);
};
</script>

<template>
  <v-card class="mx-auto mt-5" width="400">
    <v-card-title>Import contacts</v-card-title>
    <v-card-subtitle>Import contacts in csv, json formart.</v-card-subtitle>
    <v-card-text>
      <v-file-input v-model="file" label="Contact file" variant="underlined" clearable></v-file-input>
      <v-btn
        @click="submit"
        :loading="loading"
        type="submit"
        block
        class="mt-2"
        text="Submit"
        color="success"
      ></v-btn>
    </v-card-text>
  </v-card>
</template>