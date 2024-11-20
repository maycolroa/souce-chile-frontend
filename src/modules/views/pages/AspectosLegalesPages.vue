<template>
  <div class="h-screen w-screen flex flex-col overflow-hidden">
    <!-- Encabezado centrado -->
    <div class="flex justify-center items-center py-12">
      <h1 class="text-4xl font-bold text-black">Intereses</h1>
    </div>

    <!-- Menú de pestañas -->
    <div class="flex justify-center py-4 px-12">
      <div class="flex rounded-full overflow-hidden bg-gray-300 w-full max-w-6xl">
        <router-link v-for="item in menuItems" :key="item.name" :to="item.path" class="tab-link flex-grow text-center"
          :class="{ active: $route.path === item.path }">
          {{ item.name }}
        </router-link>
      </div>
    </div>

    <!-- Filtros -->
    <div class="px-12 py-2 flex justify-center">
      <div class="flex items-center space-x-4 bg-blue-100 p-0 px-4 rounded-full shadow-md w-full max-w-6xl">
        <span class="text-gray-500">Filtrar por intereses o tema</span>
        <input type="text" placeholder="Escribe tus intereses o tema" v-model="searchTerm"
          class="flex-grow p-3 rounded-full bg-blue-100 border-none focus:outline-none" />
        <button @click="toggleSeleccionarTodo" class="btn-transparent rounded-full px-2 py-1">Seleccionar todo</button>
        <i v-if="seleccionarTodo" class="fas fa-check text-green-500"></i>
      </div>
    </div>

    <!-- Tabla de intereses -->
    <div class="flex-grow overflow-auto px-12 py-4">
      <table class="w-full table-auto border-collapse">
        <thead>
          <tr class="bg-yellow-300 rounded-t-lg">
            <th class="p-4 text-left rounded-tl-lg">Interés</th>
            <th class="p-4 text-left">Resumen</th>
            <th class="p-4 text-left">Tema</th>
            <th class="p-4 text-center rounded-tr-lg">Selección</th>
          </tr>
        </thead>
        <tbody>
          <!-- Iteración por cada ley -->
          <template v-for="(law, index) in filteredLaws" :key="index">
            <!-- Iteración por cada interés dentro de una ley -->
            <tr v-for="(interest, idx) in law.interests" :key="`law-${index}-interest-${idx}`"
              class="hover:bg-gray-100 cursor-pointer">
              <td class="p-4">{{ interest.name }}</td>
              <td class="p-4">{{ interest.summary }}</td>
              <td class="p-4">{{ law.tema }}</td> <!-- Columna de tema -->
              <td class="p-4 text-center">
                <label class="custom-checkbox">
                  <input type="checkbox" :checked="law.selected" @change="toggleSelection(index)" />
                  <span class="checkmark"></span>
                </label>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <!-- Paginación y Total de Leyes -->
    <div class="flex justify-between items-center mt-1 px-12">
      <button @click="previousPage" :disabled="currentPage === 1"
        class="btn-transparent rounded-full px-4 py-2 text-gray-500">
        Anterior
      </button>
      <span>Página {{ currentPage }} de {{ totalPages }} (Total de leyes: {{ interestStore.total }})</span>
      <button @click="nextPage" :disabled="currentPage === totalPages"
        class="btn-transparent rounded-full px-4 py-2 text-gray-500">
        Siguiente
      </button>
    </div>

    <!-- Botón de Guardar -->
    <div class="flex justify-center mt-1 mb-4">
      <button @click="guardarSeleccion"
        class="btn-transparent text-green-500 font-bold rounded-full hover:bg-green-100 px-4 py-2">
        Guardar
      </button>
    </div>
  </div>
</template>

<script>
import { useInterestStore } from '../store/interests.store';
import { computed, onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

export default {
  name: 'InteresesPage',
  setup() {
    const interestStore = useInterestStore();
    const toast = useToast();
    const router = useRouter();
    const searchTerm = ref('');
    const currentPage = ref(1);
    const seleccionarTodo = ref(false);
    const companyId = '5aec7f15-aba3-4e84-b5f4-95ab6e45ee77';

    onMounted(() => {
      interestStore.fetchAllLaws(currentPage.value);
    });

    const filteredLaws = computed(() => {
      if (searchTerm.value.trim() === '') {
        return interestStore.interests;
      }
      const term = searchTerm.value.toLowerCase();
      return interestStore.interests.filter(
        (law) =>
          law.tema?.toLowerCase().includes(term) ||
          law.interests?.some((interest) => interest.name.toLowerCase().includes(term))
      );
    });

    const totalPages = computed(() => Math.ceil(interestStore.total / interestStore.limit));

    const toggleSelection = (index) => {
      interestStore.interests[index].selected = !interestStore.interests[index].selected;
    };

    const toggleSeleccionarTodo = () => {
      seleccionarTodo.value = !seleccionarTodo.value;
      interestStore.interests.forEach((law) => {
        law.selected = seleccionarTodo.value;
      });
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
        interestStore.fetchAllLaws(currentPage.value);
      }
    };

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        interestStore.fetchAllLaws(currentPage.value);
      }
    };

    const guardarSeleccion = async () => {
      const seleccionados = interestStore.interests
        .filter((law) => law.selected)
        .map((law) => law.id);

      if (seleccionados.length === 0) {
        toast.warning('No has seleccionado ningún interés.');
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/api/company/${companyId}/assign-laws`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lawIds: seleccionados }),
          }
        );

        if (!response.ok) {
          throw new Error('Error al asignar los intereses a la empresa.');
        }

        toast.success('Intereses asignados a la empresa exitosamente.');
        router.push({ name: 'intereses-pages' });
      } catch (error) {
        console.error('Error al guardar intereses:', error);
        toast.error('Hubo un error al asignar los intereses.');
      }
    };

    return {
      searchTerm,
      filteredLaws,
      currentPage,
      totalPages,
      nextPage,
      previousPage,
      toggleSeleccionarTodo,
      toggleSelection,
      guardarSeleccion,
      interestStore,
      seleccionarTodo,
      menuItems: [
        { name: 'Intereses', path: '/intereses' },
        { name: 'Mi matriz', path: '/mi-matriz' },
        { name: 'Reporte', path: '/reporte' },
        { name: 'Crear Intereses', path: '/crear-intereses' },
        { name: 'Normas', path: '/normas' },
        { name: 'Entidades', path: '/entidades' },
        { name: 'Tipos de normas', path: '/tipos-normas' },
      ],
    };
  },
};
</script>

<style scoped>
/* Estilo personalizado para checkbox */
.custom-checkbox {
  display: inline-block;
  position: relative;
  cursor: pointer;
  width: 20px;
  height: 20px;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: transparent;
  border-radius: 50%;
  border: 2px solid #ccc;
}

.custom-checkbox input:checked~.checkmark {
  background-color: #e0f7e0;
  border-color: #4CAF50;
}

.checkmark::after {
  content: "✓";
  position: absolute;
  display: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #4CAF50;
  font-size: 14px;
}

.custom-checkbox input:checked~.checkmark::after {
  display: block;
}

/* Estilo para los botones transparentes */
.btn-transparent {
  background-color: transparent;
  padding: 0.5rem 1rem;
  border: none;
  outline: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-transparent:hover {
  background-color: rgba(128, 128, 128, 0.2);
}

button.btn-transparent.text-green-500:hover {
  background-color: #d4f4d2;
}
</style>
