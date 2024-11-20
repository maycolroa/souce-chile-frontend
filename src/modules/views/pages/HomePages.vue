<template>
  <div class="h-screen w-screen flex items-center justify-center bg-cover relative overflow-hidden">
    <!-- Contenedor del contenido transparente -->
    <div class="p-32 max-w-lg" style="transform: translate(-33vw, -20vh);">
      <h1 class="text-4xl font-bold text-[#213741] mb-2">Bienvenido</h1>
      <!-- Mostrar el nombre del usuario dinámicamente -->
      <p class="text-xl text-gray-600 mb-8">
        {{ user?.name || 'Cargando...' }}
      </p>

      <!-- Opciones del menú -->
      <div class="space-y-4">
        <router-link to="/aspectos-legales" class="flex items-center space-x-4 group">
          <img src="@/assets/aspecto-legal.png" alt="Aspecto Legal" class="h-8" />
          <span class="text-lg font-semibold text-[#213741] group-hover:underline">Matriz Legal</span>
        </router-link>

        <router-link to="/administrativo" class="flex items-center space-x-4 group mt-4">
          <img src="@/assets/imagen-administrativo.png" alt="Administrativo" class="h-8" />
          <span class="text-lg font-semibold text-[#213741] group-hover:underline">Administrativo</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/modules/auth/store/auth.store';

export default {
  name: 'HomePages',
  setup() {
    const authStore = useAuthStore(); // Usar la store para obtener los datos del usuario
    const user = authStore.user;

    // Depuración para verificar los datos del usuario
    console.log('Usuario desde la store:', user);

    return {
      user,
    };
  },
};
</script>

<style scoped>
/* Fondo con imagen */
.bg-cover {
  background-image: url('@/assets/rocas_3.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* Asegura que no haya scroll en la página */
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  font-family: 'Arial', sans-serif;
}

/* Asegura que el contenedor ocupe toda la pantalla */
.h-screen {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
}
</style>
