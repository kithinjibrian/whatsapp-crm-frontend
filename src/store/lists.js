import { defineStore } from "pinia";

export const useListsStore = defineStore("list", {
  state: () => ({ lists: [], list: {} }),
  getters: {
    getLists: (state) => {
      state.lists.map((i) => (i.listsize = i.contacts.length));
      return state.lists;
    },
    getList: (state) => (name) => state.lists.find((i) => i.name == name),
    getListById: (state) => (id) => {
      const l = state.lists.find((i) => i._id == id);
      return l == undefined ? { contacts: [] } : l;
    },
    getListName: (state) => {
      return state.lists.map((i) => {
        return {
          title: `${i.name} (${i.contacts.length})`,
          _id: i._id,
        };
      });
    },
  },
  actions: {
    fetchLists() {
      const self = this;
      fetch("http://34.27.241.186/bleh/list")
        .then((res) => res.json())
        .then((data) => {
          self.lists = data;
        });
    },
    createList(data) {
      const self = this;
      fetch("http://34.27.241.186/bleh/list/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(() => {
        self.fetchLists();
      });
    },
    deleteList(data) {
      const self = this;
      fetch("http://34.27.241.186/bleh/list/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(() => {
        self.fetchLists();
      });
    },
  },
});
