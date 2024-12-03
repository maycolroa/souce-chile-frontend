<template>
  <div class="container mx-auto p-24 bg-white h-screen overflow-hidden">
    <!-- Cabecera -->
    <div class="flex justify-center items-center mb-1">
      <h1 class="text-4xl font-bold mt-2">Mi Matriz Legal</h1>
    </div>

    <!-- Menú de pestañas -->
    <div class="flex justify-center py-4 px-1">
      <div class="flex rounded-full overflow-hidden bg-gray-300 w-full max-w-8xl">
        <router-link v-for="item in menuItems" :key="item.name" :to="item.path"
          class="tab-link flex-grow text-center py-2" :class="{ active: $route.path === item.path }">
          {{ item.name }}
        </router-link>
      </div>
    </div>

    <!-- Métricas -->
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6 bg-white p-2 rounded-lg shadow-md">
      <div class="metric-card flex items-center space-x-4">
        <img :src="casaNormas" alt="Icono normas" class="icon-style" />
        <div class="text-left">
          <h2 class="text-4xl font-semibold text-primary">{{ totalLaws }}</h2>
          <p class="text-secondary">Total de normas aplicables</p>
        </div>
      </div>
      <div class="metric-card flex items-center space-x-4">
        <img :src="reporteArticulos" alt="Icono artículos" class="icon-style" />
        <div class="text-left">
          <h2 class="text-4xl font-semibold text-primary">{{ totalArticles }}</h2>
          <p class="text-secondary">Total artículos aplicables</p>
        </div>
      </div>
    </div>

    <!-- Tabla con scroll -->
    <div class="table-container bg-white rounded-lg shadow-md overflow-y-auto max-h-[300px]">
      <table class="table-auto w-full">
        <thead>
          <tr class="table-header">
            <th class="p-4">Título</th>
            <th class="p-4">Tema</th>
            <th class="p-4">Intereses seleccionados</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="law in selectedLaws" :key="law.id" class="hover:bg-gray-100 cursor-pointer">
            <td class="p-4">{{ law.title }}</td>
            <td class="p-4">{{ law.tema }}</td>
            <td class="p-4">
              <ul>
                <li v-for="interest in law.interests" :key="interest.name">
                  {{ interest.name }}: {{ interest.summary }}
                </li>
              </ul>
            </td>
          </tr>
          <tr v-if="!selectedLaws.length">
            <td colspan="3" class="text-center">No hay normas seleccionadas.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { useInterestStore } from "../store/interests.store"; // Ajusta el path según tu proyecto
import { computed, onMounted } from "vue";
import casaNormas from "@/assets/casaNormas.png";
import reporteArticulos from "@/assets/reporteArticulos.png";

export default {
  name: "InteresesPages",
  setup() {
    const interestStore = useInterestStore();
    const companyId = "5aec7f15-aba3-4e84-b5f4-95ab6e45ee77"; // ID estático para pruebas (ajústalo para obtenerlo dinámicamente)

    onMounted(async () => {
      try {
        await interestStore.fetchAssignedLaws(companyId); // Cargar las normas asignadas
      } catch (error) {
        console.error("Error al cargar las leyes asignadas:", error);
      }
    });

    const selectedLaws = computed(() => interestStore.assignedLaws || []);
    const totalLaws = computed(() => selectedLaws.value.length || 0);
    const totalArticles = computed(() =>
      selectedLaws.value.reduce(
        (acc, law) => acc + (law.interests?.length || 0),
        0
      )
    );

    const menuItems = [
      { name: "Intereses", path: "/aspectos-legales" },
      { name: "Mi matriz", path: "/intereses-pages" },
      { name: "Reporte", path: "/reporte" },
      { name: "Crear Intereses", path: "/crear-intereses" },
      { name: "Normas", path: "/normas" },
      { name: "Entidades", path: "/entidades" },
      { name: "Tipos de normas", path: "/tipos-normas" },
    ];

    return {
      casaNormas,
      reporteArticulos,
      selectedLaws,
      totalLaws,
      totalArticles,
      menuItems,
    };
  },
};
</script>

<style scoped>
.tab-link {
  text-decoration: none;
  font-weight: bold;
  color: #000;
  transition: background-color 0.3s, color 0.3s;
  padding: 0.5rem 1rem;
}

.tab-link:hover {
  background-color: #e2e8f0;
  color: #000;
}

.tab-link.active {
  background-color: #213741;
  /* Color oscuro para la página activa */
  color: #fff;
  /* Texto blanco */
  border-radius: 50px;
}

.table-container {
  overflow-y: auto;
  max-height: 300px;
}

.table-header {
  background-color: #f9fafb;
  text-align: left;
  color: #374151;
}

.icon-style {
  width: 40px;
  height: 40px;
}

.text-primary {
  color: #213741;
}

.text-secondary {
  color: #6b7280;
}
</style>
