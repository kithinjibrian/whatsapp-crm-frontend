<script setup>
import { useQRStore } from "../store/qr";
import QRCodeVue3 from "qrcode-vue3";
const store = useQRStore();
</script>

<template>
  <v-sheet class="mx-auto" width="400" v-if="store.getQR != 'kithinji'">
    <QRCodeVue3
      :width="400"
      :height="400"
      :value="store.getQR"
      :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
      :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
      :dotsOptions="{
            type: 'rounded',
            color: '#26249a',
            gradient: {
              type: 'linear',
              rotation: 0,
              colorStops: [
                { offset: 0, color: '#26249a' },
                { offset: 1, color: '#26249a' },
              ],
            },
          }"
      :backgroundOptions="{ color: '#ffffff' }"
      :cornersSquareOptions="{ type: 'dot', color: '#000000' }"
      :cornersDotOptions="{ type: undefined, color: '#000000' }"
      myclass="my-qur"
      imgclass="img-qr"
    />
  </v-sheet>
</template>