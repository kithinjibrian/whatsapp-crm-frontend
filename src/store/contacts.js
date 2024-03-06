import { defineStore } from "pinia";

export const useContactsStore = defineStore("contacts", {
  state: () => ({ contacts: [] }),
  getters: {
    getContacts: (state) => {
      return state.contacts == undefined ? [] : state.contacts;
    },
    getContactById: (state) => (id) => {
      const c = state.contacts.find((i) => i._id == id);
      return c == undefined ? "+254721731515" : c;
    },
    getFullName: (state) => (id) => {
      const contact = state.contacts.find((i) => i._id == id);
      return contact == undefined
        ? "Kithinji Brian"
        : `${contact.firstname} ${contact.lastname}`;
    },
    getContactByFullName: (state) => (fname) => {
      const names = fname.split(" ");
      const c = state.contacts.find(
        (i) => i.firstname == names[0] && i.lastname == names[1]
      );
      return c == undefined ? null : c;
    },
  },
  actions: {
    fetchContacts() {
      const self = this;
      fetch("http://34.27.241.186/bleh/contact")
        .then((res) => res.json())
        .then((data) => {
          self.contacts = data;
        });
    },
    async uploadContacts(body) {
      await fetch("http://34.27.241.186/bleh/contact/import", {
        method: "POST",
        body,
      });
    },
  },
});
