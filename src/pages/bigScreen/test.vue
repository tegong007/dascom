<template>
  <button @click="startExternalApp">
    启动外部程序
  </button>
</template>

<script setup lang="ts">
function startExternalApp() {
  window.ipcRenderer.send('check-for-updates');
}
</script>
