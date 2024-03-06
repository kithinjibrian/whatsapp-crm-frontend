<script setup>
import menuDropdown from "./components/menu.vue";
import { socket } from "./socket";
import { useQRStore } from "./store/qr";

const store = useQRStore();

socket.off();
socket.on("connect", () => {
  console.log("connected");
});
socket.on("clientQR", qr => {
  store.set(qr);
});
</script>

<template>
  <v-app id="inspire" theme="dark">
    <v-system-bar>
      <span>Kithinji Brian</span>
      <v-spacer />
      <v-icon icon="mdi-cogs"></v-icon>
      <v-icon icon="mdi-account-circle" class="ms-2"></v-icon>
    </v-system-bar>
    <v-app-bar>
      <menuDropdown
        menu="Contacts"
        :items="[
        {'title': 'Contacts', 'route':'contacts'},
        {'title': 'Groups', 'route':'groups'},
        {'title': 'Lists', 'route':'lists'}
        ]"
      ></menuDropdown>
      <menuDropdown menu="Conversations" :items="[
	  {'title': 'Inbox'}
	  ]"></menuDropdown>
      <menuDropdown
        menu="Marketing"
        :items="[
        {'title': 'Text', 'route':'text'},
        {'title': 'Group Text', 'route':'grouptext'},
        ]"
      ></menuDropdown>
      <menuDropdown
        menu="Whatsapp"
        :items="[
        {'title': 'Connect', 'route':'qr'},
        ]"
      ></menuDropdown>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
