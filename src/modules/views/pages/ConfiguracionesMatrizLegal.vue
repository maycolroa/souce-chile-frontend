<template>
  <div class="px-8 py-8">
    <h1 class="text-2xl font-bold mb-4">Matriz Legal</h1>
    <h2 class="text-lg text-red-500 mb-8">Matriz legal</h2>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 justify-items-center">
      <div v-for="item in menuItems" :key="item.name"
        class="bg-white shadow-md rounded-lg p-6 flex flex-col items-center border border-gray-300 w-full max-w-lg h-40">

        <!-- Image/Icon -->
        <img :src="item.image" alt="Imagen de {{ item.name }}" class="h-10 mb-4" />

        <!-- Title -->
        <span class="text-sm font-semibold mb-2">{{ item.name }}</span>

        <!-- Button -->
        <router-link :to="item.path"
          class="mt-auto bg-red-100 text-red-500 px-4 py-2 rounded-full border border-red-300 hover:bg-red-500 hover:text-white text-xs mb-2">
          Más información
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// Importar las imágenes de los iconos
import configImage from '@/assets/config.png';
import ayudaImage from '@/assets/ayuda.png';
import establecerInteresesImage from '@/assets/establecer-intereses.png';
import miMatrizImage from '@/assets/mi-matriz.png';
import reporteImage from '@/assets/reporte.png';
import crearInteresesImage from '@/assets/crear-intereses.png';
import crearSistemasImage from '@/assets/crear-sistemas.png';
import crearNormasImage from '@/assets/crear-normas.png';

export default {
  name: 'ConfiguracionesMatrizLegal',
  data() {
    return {
      menuItems: [
        { name: 'Config', image: configImage, path: '/config' },
        { name: 'Ayuda', image: ayudaImage, path: '/ayuda' },
        { name: 'Establecer intereses', image: establecerInteresesImage, path: '/interes-matriz-legal' },
        { name: 'Mi Matriz legal', image: miMatrizImage, path: '/mi-matriz-legal' },
        { name: 'Reporte', image: reporteImage, path: '/reporte' },
        { name: 'Crear intereses', image: crearInteresesImage, path: '/crear-intereses' },
        { name: 'Crear sistemas', image: crearSistemasImage, path: '/crear-sistemas' },
        { name: 'Crear Normas', image: crearNormasImage, path: '/crear-normas' }
      ]
    };
  }
};
</script>

<style scoped>
.bg-white {
  background-color: white;
}

.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.rounded-lg {
  border-radius: 0.75rem;
}

.px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}

.py-8 {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 24px;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

img {
  max-width: 100%;
  height: auto;
}

/* Ajustes de tamaño */
.h-10 {
  height: 2.5rem;
  /* Reducción del tamaño de los iconos */
}

.max-w-lg {
  max-width: 18rem;
}

.h-40 {
  height: 10rem;
  /* Tamaño de las cards */
}

.text-sm {
  font-size: 0.875rem;
}

.text-xs {
  font-size: 0.75rem;
}

.justify-items-center {
  justify-items: center;
}

.mt-auto {
  margin-top: auto;
}

.mb-2 {
  margin-bottom: 0.5rem;
  /* Ajustar el espacio del botón dentro de la card */
}
</style>
