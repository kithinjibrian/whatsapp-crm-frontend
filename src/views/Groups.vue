<script setup>
import { ref } from "vue";
import { useGroupsStore } from "../store/groups";

const tab = ref("one");
const search = ref(null);
const selected = ref(null);
const store = useGroupsStore();
store.fetchGroups();

const headers = [
  { title: "Name", align: "start", key: "name" },
  { title: "announce", key: "announce" },
  { title: "groupID", key: "id" }
];
</script>

<style scoped>
.link {
  text-decoration: none;
  color: white;
}

.link:hover {
  text-decoration: underline;
}
</style>

<template>
  <v-container>
    <v-row justify="end">
      <v-col xs="12" md="8">
        <h2>Groups</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-tabs v-model="tab">
            <v-tab value="one">All Groups</v-tab>
          </v-tabs>

          <v-card-text>
            <v-window v-model="tab">
              <v-window-item value="one">
                <v-container>
                  <v-row align="start">
                    <v-col cols="4">
                      <v-text-field
                        v-model="search"
                        prepend-inner-icon="mdi-magnify"
                        density="compact"
                        label="Search name, contact, email"
                        single-line
                        flat
                        hide-details
                        variant="solo-filled"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-data-table
                        v-model="selected"
                        :search="search"
                        :headers="headers"
                        :items="store.getGroups"
                        item-value="name"
                        show-select
                        return-object
                      >
                        <template v-slot:item.name="{item}">
                          <router-link :to="`/group?id=${item._id}`" class="link">{{ item.name }}</router-link>
                        </template>
                      </v-data-table>
                    </v-col>
                  </v-row>
                </v-container>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>