<template>
  <div class="flex min-h-screen">
    <!-- Sección izquierda con imagen -->
    <div class="w-1/2 bg-cover bg-center" :style="{ backgroundImage: 'url(../assets/books.jpg)' }"></div>

    <!-- Sección derecha con formulario -->
    <div class="w-1/2 flex items-center justify-center bg-gray-50">
      <div class="w-full max-w-md p-8 space-y-6">
        <div class="text-center">
          <img src="../assets/logo.png" alt="Logo" class="w-24 mx-auto mb-4" />
          <h1 class="text-2xl font-bold text-gray-900">Matriz legal</h1>
          <p class="text-gray-500">Iniciar sesión</p>
        </div>

        <!-- Formulario -->
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Correo</label>
            <input type="email" id="email" v-model="email" placeholder="Ingresa tu correo"
              class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-teal-600 focus:border-teal-600"
              required />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Clave</label>
            <input type="password" id="password" v-model="password" placeholder="Ingresa tu clave"
              class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-teal-600 focus:border-teal-600"
              required />
          </div>

          <div class="flex justify-end">
            <a href="#" class="text-sm text-teal-600 hover:underline">¿Olvidaste tu contraseña?</a>
          </div>

          <button type="submit"
            class="w-full bg-sky-900 hover:bg-teal-800 text-white py-2 px-4 rounded-lg transition-colors">
            Continuar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPages',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    handleLogin() {
      // Aquí iría la lógica del login, como enviar credenciales al backend.
      console.log('Correo:', this.email, 'Clave:', this.password);
    },
  },
};
</script>

<style scoped>
/* Estilo adicional para asegurar el fondo */
</style>