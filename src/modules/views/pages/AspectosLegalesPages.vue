<template>
  <div class="h-screen w-screen flex flex-col overflow-hidden">
    <!-- Encabezado -->
    <div class="flex justify-center items-center py-14">
      <h1 class="text-4xl font-bold text-black">Intereses</h1>
    </div>

    <!-- Mensaje dinámico -->
    <div class="px-12 py-0 flex justify-center">
      <div v-if="selectedCount > 0" class="bg-green-100 text-green-700 p-4 rounded-lg shadow-md">
        {{ selectedCount }} seleccionados
      </div>
    </div>

    <!-- Menú de pestañas -->
    <div class="flex justify-center py-4 px-20">
      <div class="flex rounded-full overflow-hidden bg-gray-300 w-full max-w-8xl">
        <router-link v-for="item in menuItems" :key="item.name" :to="item.path"
          class="tab-link flex-grow text-center py-2" :class="{ active: $route.path === item.path }">
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
        <button @click="selectedCount === totalInterests ? deseleccionarTodos() : seleccionarTodos()"
          class="text-blue-500 font-bold hover:underline">
          {{ selectedCount === totalInterests ? 'Deseleccionar todo' : 'Seleccionar todo' }}
        </button>
      </div>
    </div>

    <!-- Tabla de intereses -->
    <div class="flex-grow overflow-auto px-12 py-4">
      <table class="w-full table-auto border-collapse">
        <thead>
          <tr class="bg-yellow-300 rounded-t-lg">
            <th class="p-4 text-left">Interés</th>
            <th class="p-4 text-left">Resumen</th>
            <th class="p-4 text-left">Tema</th>
            <th class="p-4 text-center">Selección</th>
          </tr>
        </thead>
        <tbody>
          <!-- Intereses filtrados -->
          <template v-if="filteredLaws.length">
            <template v-for="law in filteredLaws" :key="law.id">
              <tr v-for="interest in law.interests" :key="interest.id" class="hover:bg-gray-100">
                <td class="p-4">{{ interest.name }}</td>
                <td class="p-4">{{ interest.summary }}</td>
                <td class="p-4">{{ law.tema }}</td>
                <td class="p-4 text-center">
                  <label class="custom-checkbox">
                    <input type="checkbox" :checked="interest.selected" @change="toggleSelection(interest)" />
                    <span class="checkmark"></span>
                  </label>
                </td>
              </tr>
            </template>
          </template>
          <!-- Sin resultados -->
          <tr v-else>
            <td colspan="4" class="text-center">No se encontraron intereses</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Paginación -->
    <div class="flex justify-between items-center mt-1 px-12">
      <button @click="previousPage" :disabled="currentPage === 1"
        class="btn-transparent rounded-full px-4 py-2 text-gray-500">
        Anterior
      </button>
      <span>Página {{ currentPage }} de {{ totalPages }} (Total de leyes: {{ interestStore.total || 0 }})</span>
      <button @click="nextPage" :disabled="currentPage === totalPages"
        class="btn-transparent rounded-full px-4 py-2 text-gray-500">
        Siguiente
      </button>
    </div>

    <!-- Guardar -->
    <div class="flex justify-center mt-1 mb-4">
      <button @click="guardarSeleccion"
        class="btn-transparent text-green-500 font-bold rounded-full hover:bg-green-100 px-4 py-2">
        Guardar
      </button>
    </div>
  </div>
</template>

<script>
import { useInterestStore } from "../store/interests.store";
import { computed, onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

export default {
  name: "AspectosLegalesPages",
  setup() {
    const interestStore = useInterestStore();
    const toast = useToast();
    const router = useRouter();
    const searchTerm = ref("");
    const currentPage = ref(1);
    const companyId = "5aec7f15-aba3-4e84-b5f4-95ab6e45ee77"; // Reemplaza con el ID dinámico si es necesario

    onMounted(() => {
      interestStore.fetchAllLaws(currentPage.value);
    });

    const filteredLaws = computed(() => {
      if (!Array.isArray(interestStore.laws)) return [];
      if (!searchTerm.value.trim()) return interestStore.laws;

      const term = searchTerm.value.toLowerCase();
      return interestStore.laws.filter(
        (law) =>
          law.title.toLowerCase().includes(term) ||
          (Array.isArray(law.interests) &&
            law.interests.some((interest) => interest.name.toLowerCase().includes(term)))
      );
    });

    const totalPages = computed(() =>
      Math.ceil(interestStore.total / interestStore.limit)
    );

    const totalInterests = computed(() =>
      filteredLaws.value.reduce((total, law) => total + law.interests.length, 0)
    );

    const selectedCount = computed(() =>
      interestStore.interests.filter((interest) => interest.selected).length
    );

    const toggleSelection = (interest) => {
      interestStore.toggleInterestSelection(interest.id); // Actualiza el estado seleccionado
    };

    const seleccionarTodos = () => {
      filteredLaws.value.forEach((law) => {
        law.interests.forEach((interest) => {
          if (!interest.selected) {
            interest.selected = true;
            interestStore.toggleInterestSelection(interest.id);
          }
        });
      });
    };

    const deseleccionarTodos = () => {
      filteredLaws.value.forEach((law) => {
        law.interests.forEach((interest) => {
          if (interest.selected) {
            interest.selected = false;
            interestStore.toggleInterestSelection(interest.id);
          }
        });
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
      const selectedLaws = interestStore.selectedInterests().map((interest) => interest.lawId);
      if (!selectedLaws.length) {
        toast.warning("No has seleccionado ningún interés.");
        return;
      }

      try {
        const success = await interestStore.assignLawsToCompany(companyId, [...new Set(selectedLaws)]); // Evitar duplicados
        if (success) {
          toast.success("Intereses guardados correctamente.");
          router.push("/intereses-pages");
        } else {
          toast.error("Hubo un error al guardar los intereses.");
        }
      } catch (error) {
        console.error("Error al guardar intereses:", error);
        toast.error("Hubo un error al guardar los intereses.");
      }
    };

    return {
      searchTerm,
      filteredLaws,
      totalPages,
      totalInterests,
      currentPage,
      selectedCount,
      toggleSelection,
      seleccionarTodos,
      deseleccionarTodos,
      nextPage,
      previousPage,
      guardarSeleccion,
      interestStore,
      menuItems: [
        { name: "Intereses", path: "/aspectos-legales" },
        { name: "Mi matriz", path: "/intereses-pages" },
        { name: "Reporte", path: "/reporte" },
        { name: "Crear Intereses", path: "/crear-intereses" },
        { name: "Normas", path: "/normas" },
        { name: "Entidades", path: "/entidades" },
        { name: "Tipos de normas", path: "/tipos-normas" },
      ],
    };
  },
};
</script>

<style scoped>
.tab-link.active {
  background-color: #3a3a3a;
  /* Gris más oscuro */
  color: white;
  /* Texto blanco */
  border-radius: 50px;
  /* Opcional */
}

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

/* Estilo para enlaces de pestañas */
.tab-link {
  text-decoration: none;
  color: #000;
  font-weight: bold;
  transition: background-color 0.2s, color 0.2s;
}

.tab-link:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.tab-link.active {
  background-color: #213741;
  /* Azul oscuro */
  color: white;
  border-radius: 50px;
  /* Opcional para darle más estilo */
}

/* Estilo para el mensaje dinámico de selección */
.bg-green-100 {
  background-color: #e6f7e6;
}

.text-green-700 {
  color: #2e7d32;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.shadow-md {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

/* Estilo para la tabla */
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  text-align: left;
  padding: 8px;
}

th {
  background-color: #f3f3f3;
  font-weight: bold;
}

tr:hover {
  background-color: #f9f9f9;
}

/* Paginación */
button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

button {
  transition: all 0.2s ease;
}

button:hover:not(:disabled) {
  background-color: rgba(128, 128, 128, 0.1);
}

/* Input de filtro */
input {
  border: none;
  outline: none;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  background-color: #e0f7ff;
  transition: box-shadow 0.2s ease;
}

input:focus {
  box-shadow: 0 0 4px rgba(0, 128, 255, 0.5);
}

/* Fondo del contenedor de filtros */
.bg-blue-100 {
  background-color: #d8e9f3;
}

.text-gray-500 {
  color: #6b7280;
}

.text-gray-700 {
  color: #374151;
}

/* Encabezado */
.text-black {
  color: #000000;
}

.font-bold {
  font-weight: bold;
}

/* Botón de guardar */
.text-green-500 {
  color: #4CAF50;
}
</style>
