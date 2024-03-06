<script setup>
import { computed, ref } from "vue";
import { useTextsStore } from "../store/text";
import { useListsStore } from "../store/lists";
import { useContactsStore } from "../store/contacts";

const tab = ref("one");
const selected = ref(null);
const search = ref(null);
const textStore = useTextsStore();
const listStore = useListsStore();
const contactStore = useContactsStore();

listStore.fetchLists();
textStore.fetchTexts();
contactStore.fetchContacts();

const name = ref(null);
const text = ref(null);
const media = ref(null);
const lists = ref(null);
const contactsinclude = ref(null);
const listsexclude = ref(null);
const contactsexclude = ref(null);
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
const filta = (array1, array2) => {
  const stringifiedArray2 = array2.map(obj => JSON.stringify(obj));
  return array1.filter(
    obj1 => !stringifiedArray2.includes(JSON.stringify(obj1))
  );
};
const run = () => {
  textStore.textRun({
    _id: selected.value[0]._id
  });
  selected.value = [];
};
const pause = () => {
  textStore.textPause({});
};
const createT = isActive => {
  isActive.value = false;
  //include contacts
  const list = lists.value
    .map(i => listStore.getListById(i._id))
    .map(j => j.contacts)
    .flat();
  const cinclude =
    contactsinclude.value !== null
      ? contactsexclude.value.map(i => contactStore.getContactByFullName(i))
      : [];
  const include = [...new Set([...list, ...cinclude])];

  //exclude contacts
  const listexclude =
    listsexclude.value !== null
      ? listsexclude.value
          .map(i => listStore.getListById(i._id))
          .map(j => j.contacts)
          .flat()
      : [];

  const cexclude =
    contactsexclude.value !== null
      ? contactsexclude.value.map(i => contactStore.getContactByFullName(i))
      : [];

  const exclude = [...new Set([...listexclude, ...cexclude])];

  const contacts = filta(include, exclude, "_id").map(i => i._id);
  const body = new FormData();
  body.set("name", name.value);
  body.set("text", text.value);
  body.set("contacts", contacts);
  if (media.value) {
    body.set("media", media.value[0]);
  }
  textStore.createText(body);
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
                <p class="ma-5">Include list</p>
                <v-divider class="mb-5" />
                <v-combobox
                  v-model="lists"
                  :items="listStore.getListName"
                  :hide-no-data="false"
                  label="Lead List"
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
                <v-combobox
                  v-model="contactsinclude"
                  :items="contactStore.getContacts.map(i=> `${i.firstname} ${i.lastname}`)"
                  :hide-no-data="false"
                  hint="Type to search"
                  label="Contacts"
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
                <p class="ma-5">Exclude list</p>
                <v-divider class="mb-5" />
                <v-combobox
                  v-model="listsexclude"
                  :items="listStore.getListName"
                  :hide-no-data="false"
                  label="Lead List"
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
                <v-combobox
                  v-model="contactsexclude"
                  :items="contactStore.getContacts.map(i=> `${i.firstname} ${i.lastname}`)"
                  :hide-no-data="false"
                  hint="Type to search"
                  label="Contacts"
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
                <v-btn color="success" text="Submit" @click="createT(isActive)"></v-btn>
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
            <v-tab value="one">All Text</v-tab>
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
                        :items="textStore.getTexts"
                        item-value="name"
                        show-select
                        return-object
                      >
                        <template v-slot:item.name="{value}">
                          <router-link
                            :to="`/content?t=${textStore.getText(value)._id}`"
                            class="link"
                          >{{ value }}</router-link>
                          <span
                            class="ml-3 text-green"
                            v-if="textStore.getText(value).active"
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