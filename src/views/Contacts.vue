<script setup>
import { ref } from "vue";
import { useContactsStore } from "../store/contacts";

const tab = ref("one");
const selected = ref(null);
const search = ref(null);
const store = useContactsStore();
store.fetchContacts();

const headers = [
  { title: "Name", align: "start", key: "name" },
  { title: "Contact", align: "end", key: "contact" },
  { title: "Email", align: "end", key: "email" },
  { title: "Lead Status", align: "end", key: "leadstatus" }
];

const edit = () => alert("edit");
const erase = () => alert("erase");
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
        <h2>Contacts</h2>
      </v-col>
      <v-col xs="12" md="4">
        <v-btn variant="outlined" to="/import">Import</v-btn>
        <v-btn variant="outlined" class="ms-3">Create Contact</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-tabs v-model="tab">
            <v-tab value="one">All Contacts</v-tab>
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
                    <v-col cols="4">
                      <div v-if="selected != null && selected.length > 0">
                        <v-chip @click="edit">
                          <v-icon start icon="mdi-pencil"></v-icon>Edit
                        </v-chip>
                        <v-chip class="ms-3" @click="erase">
                          <v-icon start icon="mdi-delete"></v-icon>Delete
                        </v-chip>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-data-table
                        v-model="selected"
                        :search="search"
                        :headers="headers"
                        :items="store.getContacts"
                        item-value="name"
                        show-select
                        return-object
                      >
                        <template v-slot:item.name="{item}">
                          <router-link
                            :to="`/contact?id=${item._id}`"
                            class="link"
                          >{{ item.firstname }} {{ item.lastname }}</router-link>
                        </template>
                        <template v-slot:item.contact="{value}">
                          <a class="link" :href="`tel:+${value}`">{{ value }}</a>
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