import { defineStore } from "pinia";

export const useGroupsStore = defineStore("group", {
  state: () => ({ groups: [] }),
  getters: {
    getGroups: (state) => state.groups,
    getGroup: (state) => (name) => state.groups.find((i) => i.name == name),
    getGroupById: (state) => (id) => {
      return state.groups.find((i) => i._id == id);
    },
    getGroupName: (state) => {
      return state.groups.map((i) => {
        return {
          title: `${i.name}`,
          _id: i._id,
        };
      });
    },
  },
  actions: {
    fetchGroups() {
      const self = this;
      fetch("http://34.27.241.186/bleh/group")
        .then((res) => res.json())
        .then((data) => {
          self.groups = data;
        });
    },
  },
});
