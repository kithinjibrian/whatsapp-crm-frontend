<template>
  <div class="text-center">
    <v-menu location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn variant="plain" v-bind="props">
          {{menu}}
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list :items="items">
        <v-list-item v-for="(item, index) in items" :key="index" link :to="item.route">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup>
const props = defineProps({
  menu: String,
  items: Array
});
</script>