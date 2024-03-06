<script setup>
import { ref } from "vue";
import { useListsStore } from "../store/lists";

const tab = ref("one");
const selected = ref(null);
const search = ref(null);
const store = useListsStore();
store.fetchLists();

const headers = [
  { title: "Name", align: "start", key: "name" },
  { title: "List Size", align: "start", key: "listsize" },
  { title: "Description", key: "description" },
  { title: "Live", key: "live" }
];

const edit = () => alert("edit");
const erase = () => {
  store.deleteList({
    id: selected.value[0]._id
  });
};

const name = ref(null);
const description = ref(null);
const live = ref(true);
const filter = ref(null);
const createList = isActive => {
  isActive.value = false;
  const body = {
    name: name.value,
    description: description.value,
    live: Boolean(live.value),
    filter: JSON.parse(filter.value)
  };
  store.createList(body);
};
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
      <v-col xs="12" md="10">
        <h2>List</h2>
      </v-col>
      <v-col xs="12" md="2">
        <v-dialog width="500">
          <template v-slot:activator="{ props }">
            <v-btn variant="outlined" v-bind="props" text="Create List"></v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Create List">
              <v-card-text class="mt-4">
                <v-text-field v-model="name" label="Name" variant="outlined"></v-text-field>
                <v-textarea v-model="description" label="Description" variant="outlined"></v-textarea>
                <v-container fluid>
                  <p>List type</p>
                  <v-radio-group v-model="live">
                    <v-radio label="Live" value="true"></v-radio>
                    <v-radio label="Static" value="false"></v-radio>
                  </v-radio-group>
                </v-container>
                <v-textarea v-model="filter" label="Filter" variant="outlined"></v-textarea>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn text="Close" @click="isActive.value = false"></v-btn>
                <v-btn color="success" text="Submit" @click="createList(isActive)"></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-tabs v-model="tab">
            <v-tab value="one">All Lists</v-tab>
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
                        label="Search name, list size, description"
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
                        :items="store.getLists"
                        item-value="name"
                        show-select
                        return-object
                      >
                        <template v-slot:item.name="{value}">
                          <router-link
                            :to="`/list?id=${store.getList(value)._id}`"
                            class="link"
                          >{{ value }}</router-link>
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