<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useContactsStore } from "../store/contacts";

const store = useContactsStore();
const route = useRoute();

store.fetchContacts();

const id = ref(route.query.id);
const tab = ref("two");

const fullName = computed(() => {
  return store.getFullName(id.value);
});

const contact = computed(() => {
  return store.getContactById(id.value).contact;
});
</script>

<template>
  <v-app>
    <v-navigation-drawer>
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
          :title="store.getFullName(id)"
          :subtitle="`+${contact}`"
        ></v-list-item>
      </v-list>
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="auto" align="center">
            <v-btn density="default" icon="mdi-pencil"></v-btn>
            <p>Note</p>
          </v-col>
          <v-col cols="auto" align="center">
            <v-btn density="default" icon="mdi-phone"></v-btn>
            <p>Call</p>
          </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-card flat>
        <v-card-title>About this contact</v-card-title>
        <v-card-text>
          <v-list lines="three">
            <v-list-item title="Email" :subtitle="store.getContactById(id).email"></v-list-item>
            <v-list-item title="Lead Status" :subtitle="store.getContactById(id).leadstatus"></v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-navigation-drawer>

    <v-main>
      <v-tabs v-model="tab">
        <v-tab value="one">Overview</v-tab>
        <v-tab value="two">Activities</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item value="one">1</v-window-item>
        <v-window-item value="two">
          <v-container>
            <v-row>
              <v-col
                cols="12"
                xs="12"
                md="4"
                v-for="(a,n) in store.getContactById(id).activities"
                :key="n"
              >
                <v-card>
                  <v-card-title>Text message {{ a.activity }}</v-card-title>
                  <v-card-subtitle>{{ new Date(a.createdAt) }}</v-card-subtitle>
                  <v-card-text>{{ a.media }}</v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-window-item>
      </v-window>
    </v-main>
  </v-app>
</template>