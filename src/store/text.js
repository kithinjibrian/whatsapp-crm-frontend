import { defineStore } from "pinia";

export const useTextsStore = defineStore("texts", {
  state: () => ({ texts: [] }),
  getters: {
    getTexts: (state) => state.texts,
    getText: (state) => (name) => state.texts.find((i) => i.name == name),
  },
  actions: {
    fetchTexts() {
      const self = this;
      fetch("http://34.27.241.186/bleh/text")
        .then((res) => res.json())
        .then((data) => (self.texts = data));
    },
    createText(data) {
      const self = this;
      fetch("http://34.27.241.186/bleh/text/create", {
        method: "POST",
        body: data,
      }).then(() => {
        self.fetchTexts();
      });
    },
    textRun(data) {
      const self = this;
      fetch("http://34.27.241.186/bleh/text/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(() => {
        self.fetchTexts();
      });
    },
    textPause(data) {
      const self = this;
      fetch("http://34.27.241.186/bleh/text/pause", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(() => {
        self.fetchTexts();
      });
    },
  },
});
