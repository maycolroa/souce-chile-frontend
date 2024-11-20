<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Barra superior azul oscuro -->
    <div class="bg-[#213741] w-full h-16 fixed top-0 left-0 flex items-center justify-between px-8 z-10">
      <div></div> <!-- Espacio vacío -->
      <img src="@/assets/logo_rigs_blanco_R 1.png" alt="RIGS Logo" class="w-7 h-auto" />
    </div>

    <div class="flex w-full h-full mt-16 relative">
      <!-- Left: Imagen -->
      <div class="hidden lg:flex items-center justify-center w-1/2 bg-gray-100 relative">
        <img src="@/assets/login-image.jpg" alt="Placeholder Image" class="object-cover w-full h-full" />

      </div>

      <!-- Right: Login Form -->
      <div class="flex items-center justify-center w-full lg:w-1/2 p-8 bg-white">
        <div class="w-full max-w-md flex flex-col items-center">
          <!-- Contenedor para centrar logo y título -->
          <div class="text-center mb-8">
            <img src="@/assets/logo_ia.png" alt="Logo IA" class="w-20 h-auto mx-auto mb-4" />
            <h1 class="text-2xl font-semibold text-[#213741]">Matriz legal</h1>
          </div>

          <p class="text-center text-gray-500 mb-8">Iniciar sesión</p>

          <form @submit.prevent="onLogin" class="w-full flex flex-col items-center">
            <!-- Contenedor de Correo -->
            <div class="input-container mb-6 w-full">
              <div class="input-label">Correo</div>
              <input v-model="myForm.email" ref="emailInputRef" type="text" id="email" name="email" class="input-field"
                autocomplete="off" />
            </div>

            <!-- Contenedor de Clave -->
            <div class="input-container mb-6 w-full">
              <div class="input-label">Clave</div>
              <input v-model="myForm.password" ref="passwordInputRef" type="password" id="password" name="password"
                class="input-field" autocomplete="off" />
            </div>

            <!-- Botón de Ingresar centrado -->
            <button type="submit"
              class="bg-[#213741] hover:bg-[#0c4d55] text-white font-semibold rounded-2xl py-2 px-3 w-48">
              Ingresar
            </button>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useAuthStore } from "../store/auth.store";
import { useToast } from "vue-toastification";
import router from "@/router";

const authStore = useAuthStore();
const toast = useToast();

const emailInputRef = ref<HTMLInputElement | null>(null);
const passwordInputRef = ref<HTMLInputElement | null>(null);

const myForm = reactive({
  email: '',
  password: '',
  rememberme: false,
});

const onLogin = async () => {
  if (myForm.email === '') {
    return emailInputRef.value?.focus();
  }

  if (myForm.password.length < 5) {
    return passwordInputRef.value?.focus();
  }

  const ok = await authStore.login(myForm.email, myForm.password);

  if (ok) {
    router.push({ name: 'home' });
  } else {
    toast.error('Usuario o Contraseña no son correctos');
  }
};
</script>

<style scoped>
/* Contenedor de entrada */
.input-container {
  display: flex;
  align-items: center;
  background-color: #e0e4e7;
  border-radius: 50px;
  height: 3.5rem;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  overflow: hidden;
}

.input-label {
  background-color: #213741;
  color: white;
  padding: 0.75rem 3rem;
  border-radius: 50px 50px 50px 50px;
  font-weight: bold;
  white-space: nowrap;
  flex-shrink: 0;
}

.input-field {
  flex-grow: 1;
  border: none;
  background-color: transparent;
  padding: 0.75rem 1rem;
  border-radius: 0 50px 50px 0;
  outline: none;
  font-size: 1rem;
}

.input-container:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

.object-cover {
  object-fit: cover;
}

.mt-16 {
  margin-top: 4rem;
}

.etiqueta-lateral {
  background-color: #213741;
  color: white;
  padding: 1rem 2rem;
  font-size: 1.5rem;
  border-radius: 20px 0 0 20px;
  height: 3.5rem;
  min-width: 10rem;
  margin-right: -1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
