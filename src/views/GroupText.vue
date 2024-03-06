<script setup>
import { computed, ref } from "vue";
import { useGroupTextsStore } from "../store/grouptext";
import { useGroupsStore } from "../store/groups";

const tab = ref("one");
const search = ref(null);
const selected = ref(null);
const groupTextStore = useGroupTextsStore();
const groupsStore = useGroupsStore();

groupTextStore.fetchTexts();
groupsStore.fetchGroups();

const name = ref(null);
const text = ref(null);
const media = ref(null);
const groups = ref(null);
const headers = [
  { title: "Name", align: "start", key: "name" },
  { title: "Media", key: "media" },
  { title: "Text", key: "text" },
  { title: "Sent", key: "sent" },
  { title: "Seen", key: "seen" },
  { title: "Read", key: "read" }
];

const edit = () => alert("edit");
const erase = () => alert("erase");
const run = () => {
  groupTextStore.textRun({
    _id: selected.value[0]._id
  });
  selected.value = [];
};
const pause = () => {
  groupTextStore.textPause({});
};
const createGroupText = isActive => {
  isActive.value = false;
  const body = new FormData();
  body.set("name", name.value);
  body.set("text", text.value);
  body.set(
    "groups",
    groups.value.map(i => i._id)
  );
  if (media.value) {
    body.set("media", media.value[0]);
  }
  groupTextStore.createText(body);
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
        <h2>Marketing Texts</h2>
      </v-col>
      <v-col xs="12" md="2">
        <v-dialog width="500">
          <template v-slot:activator="{ props }">
            <v-btn variant="outlined" v-bind="props" text="Create Text"></v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Create Text">
              <v-card-text class="mt-4">
                <v-text-field v-model="name" label="Name" variant="outlined"></v-text-field>
                <v-textarea v-model="text" label="Text" variant="outlined"></v-textarea>
                <v-file-input v-model="media" label="Media file" variant="underlined" clearable></v-file-input>
                <p class="ma-5">Include Group list</p>
                <v-divider class="mb-5" />
                <v-combobox
                  v-model="groups"
                  :items="groupsStore.getGroupName"
                  :hide-no-data="false"
                  label="Group Lead List"
                  variant="outlined"
                  multiple
                  chips
                >
                  <template v-slot:no-data>
                    <v-list-item>
                      <v-list-item-title>No results matching</v-list-item-title>
                    </v-list-item>
                  </template>
                </v-combobox>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn text="Close" @click="isActive.value = false"></v-btn>
                <v-btn color="success" text="Submit" @click="createGroupText(isActive)"></v-btn>
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
            <v-tab value="one">All Group Text</v-tab>
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
                        <v-chip @click="run">
                          <v-icon start icon="mdi-play"></v-icon>Run
                        </v-chip>
                        <v-chip class="ms-3" @click="pause">
                          <v-icon start icon="mdi-pause"></v-icon>Pause
                        </v-chip>
                        <v-chip class="ms-3" @click="edit">
                          <v-icon start icon="mdi-pencil"></v-icon>Edit
                        </v-chip>
                        <v-chip class="ms-3" @click="erase">
                          <v-icon icon="mdi-delete"></v-icon>Delete
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
                        :items="groupTextStore.getTexts"
                        item-value="name"
                        show-select
                        return-object
                      >
                        <template v-slot:item.name="{value}">
                          <router-link
                            :to="`/content?t=${groupTextStore.getText(value)._id}`"
                            class="link"
                          >{{ value }}</router-link>
                          <span
                            class="ml-3 text-green"
                            v-if="groupTextStore.getText(value).active"
                          >running...</span>
                        </template>
                        <template v-slot:item.media="{value}">
                          <v-card
                            v-if="value!==null"
                            width="300"
                            height="300"
                            class="overflow-auto"
                            flat
                          >
                            <v-img
                              :src="`data:image/jpeg;base64,${value}`"
                              height="300"
                              class="bg-grey-lighten-2"
                            ></v-img>
                          </v-card>
                        </template>
                        <template v-slot:item.text="{value}">
                          <v-card width="300" height="300" class="overflow-auto" flat>
                            <v-card-text>{{ value }}</v-card-text>
                          </v-card>
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