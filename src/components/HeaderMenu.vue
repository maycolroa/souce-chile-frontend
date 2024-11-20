<template>
  <header class="flex items-center h-14 p-6 bg-[#345367] sm:h-16 md:px-6 lg:px-8">
    <div class="flex items-center ml-auto">
      <img src="@/assets/logo_rigs_blanco_R 1.png" alt="Logo" class="h-8" />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeaderMenu',
});
</script>

<style scoped>
/* Estilos específicos del header */
header {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 10;
}
</style>
