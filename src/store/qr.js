import { defineStore } from "pinia";

export const useQRStore = defineStore("qr", {
  state: () => ({ qr: "kithinji" }),
  getters: {
    getQR: (state) => state.qr,
  },
  actions: {
    set(qr) {
      this.qr = qr;
    },
  },
});
