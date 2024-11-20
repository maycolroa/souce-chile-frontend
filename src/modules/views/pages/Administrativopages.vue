<template>
  <div class="h-screen w-screen bg-cover bg-center bg-no-repeat flex flex-col overflow-hidden">
    <!-- Encabezado administrativo -->
    <div class="flex items-center justify-start px-12 py-20 mb-6 flex-shrink-0">
      <i class="fas fa-balance-scale text-4xl mr-4 text-[#213741]"></i>
      <h1 class="text-3xl font-bold text-[#213741]">Administrativo</h1>
    </div>

    <!-- Contenido principal -->
    <div class="flex-grow flex flex-col items-center justify-end pb-16">
      <div class="p-6 rounded-lg shadow-none">
        <div class="bg-transparent rounded-full shadow-md flex space-x-8">
          <router-link v-for="item in menuItems" :key="item.name" :to="item.path" class="menu-link"
            :class="{ 'active': $route.path === item.path }">
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import usuariosImage from '@/assets/usuarios.png';
import rolesImage from '@/assets/roles.png';
import configImage from '@/assets/config.png';
import planesImage from '@/assets/planesAccion.png';
import ayudaImage from '@/assets/ayuda.png';

export default {
  name: 'AdministrativoPages',
  data() {
    return {
      menuItems: [
        { name: 'Usuarios', path: '/usuarios', image: usuariosImage },
        { name: 'Roles', path: '/roles', image: rolesImage },
        { name: 'Configuración', path: '/config', image: configImage },
        { name: 'Planes de acción', path: '/planes', image: planesImage },
        { name: 'Soporte', path: '/soporte', image: ayudaImage },
      ],
    };
  },
};
</script>

<style scoped>
/* Imagen de fondo */
.bg-cover {
  background-image: url('@/assets/admin_image.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* Asegura que no haya scroll */
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  font-family: 'Arial', sans-serif;
}

/* Evita que el contenido crezca más allá de la pantalla */
.h-screen {
  height: 100vh;
  overflow: hidden;
}

/* Estilo del enlace del menú */
.menu-link {
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background-color: transparent;
  color: #6b7280;
  /* Gris claro */
  font-size: 1.125rem;
  /* text-lg equivalente */
  font-weight: 600;
  /* font-semibold equivalente */
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Estado activo del enlace del menú */
.menu-link.active {
  background-color: #213741;
  color: white;
}

/* Hover para las opciones del menú */
.menu-link:hover {
  background-color: #213741;
  color: white;
}

/* Espaciado entre los enlaces del menú */
.space-x-8>*+* {
  margin-left: 2rem;
}

/* Sombra del contenedor */
.shadow-md {
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}
</style>
