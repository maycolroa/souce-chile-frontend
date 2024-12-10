<template>
  <div class="container mx-auto p-24 bg-white h-screen overflow-hidden">
    <!-- Cabecera -->
    <div class="flex justify-center items-center mb-2">
      <h1 class="text-4xl font-bold mt-2">Mi Matriz Legal</h1>
    </div>

    <!-- Menú de pestañas -->
    <div class="flex justify-center py-2 px-1">
      <div class="flex rounded-full overflow-hidden bg-gray-300 w-full max-w-8xl">
        <router-link v-for="item in menuItems" :key="item.name" :to="item.path"
          class="tab-link flex-grow text-center py-2" :class="{ active: $route.path === item.path }">
          {{ item.name }}
        </router-link>
      </div>
    </div>

    <!-- Métricas -->
    <div class="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-4 bg-white p-2 rounded-lg shadow-md">
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
      <div class="metric-card flex items-center space-x-4">
        <img :src="reporteCalificados" alt="Icono artículos calificados" class="icon-style" />
        <div class="text-left">
          <h2 class="text-4xl font-semibold text-primary">{{ percentageQualified }}%</h2>
          <p class="text-secondary">Porcentaje de artículos calificados</p>
        </div>
      </div>
      <div class="metric-card flex items-center space-x-4">
        <img :src="reporteCumplidos" alt="Icono artículos cumplidos" class="icon-style" />
        <div class="text-left">
          <h2 class="text-4xl font-semibold text-primary">{{ percentageCompleted }}%</h2>
          <p class="text-secondary">Porcentaje de artículos cumplidos</p>
        </div>
      </div>
      <div class="metric-card flex items-center space-x-4">
        <img :src="reporteIntereses" alt="Icono intereses seleccionados" class="icon-style" />
        <div class="text-left">
          <h2 class="text-4xl font-semibold text-primary">{{ totalSelectedInterests }}</h2>
          <p class="text-secondary">Intereses seleccionados</p>
        </div>
      </div>
    </div>

    <!-- Tabla -->
    <div class="table-container bg-white rounded-lg shadow-sm">
      <table class="table-auto w-full">
        <thead>
          <tr class="table-header">
            <th class="p-2">Título</th>
            <th class="p-2">Tema</th>
            <th class="p-2">Tipo de Norma</th>
            <th class="p-2">Número</th>
            <th class="p-2">Año</th>
            <th class="p-2">Ente</th>
            <th class="p-2">Intereses Seleccionados</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="law in selectedLaws" :key="law.id" class="hover:bg-gray-100 cursor-pointer"
            @click="navigateToLaw(law.id)">
            <td class="p-2">{{ law.title }}</td>
            <td class="p-2">{{ law.tema }}</td>
            <td class="p-2">{{ law.tipo_norma }}</td>
            <td class="p-2">{{ law.numero }}</td>
            <td class="p-2">{{ law.año }}</td>
            <td class="p-2">{{ law.ente }}</td>
            <td class="p-2">
              <ul>
                <li v-for="interest in law.interests.filter(i => i.selected)" :key="interest.name">
                  {{ interest.name }}
                </li>
              </ul>
            </td>
          </tr>
          <tr v-if="!selectedLaws.length">
            <td colspan="7" class="text-center">No hay normas seleccionadas.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>



<script>
import { useInterestStore } from "../store/interests.store";
import { computed, onMounted } from "vue";
import casaNormas from "@/assets/casaNormas.png";
import reporteArticulos from "@/assets/reporteArticulos.png";
import reporteCalificados from "@/assets/reporteCalificados.png";
import reporteCumplidos from "@/assets/reporteCumplidos.png";
import reporteIntereses from "@/assets/reporteIntereses.png";
import { useRouter } from "vue-router";

export default {
  name: "InteresesPages",
  setup() {
    const router = useRouter();
    const interestStore = useInterestStore();
    const companyId = "5aec7f15-aba3-4e84-b5f4-95ab6e45ee77";

    onMounted(async () => {
      try {
        await interestStore.fetchAssignedLaws(companyId);
      } catch (error) {
        console.error("Error al cargar las leyes asignadas:", error);
      }
    });

    const navigateToLaw = (lawId) => {
      router.push({ name: "VisualizadorGeneral", params: { id: lawId } });
    };

    const selectedLaws = computed(() => interestStore.assignedLaws || []);
    const totalLaws = computed(() => selectedLaws.value.length || 0);
    const totalArticles = computed(() =>
      selectedLaws.value.reduce((acc, law) => acc + (law.articles?.length || 0), 0)
    );
    const percentageQualified = computed(() => Math.round((totalArticles.value * 20) / 100));
    const percentageCompleted = computed(() => Math.round((totalArticles.value * 60) / 100));
    const totalSelectedInterests = computed(() =>
      selectedLaws.value.reduce(
        (acc, law) => acc + (law.interests?.filter((i) => i.selected).length || 0),
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
      reporteCalificados,
      reporteCumplidos,
      reporteIntereses,
      selectedLaws,
      totalLaws,
      totalArticles,
      percentageQualified,
      percentageCompleted,
      totalSelectedInterests,
      menuItems,
      navigateToLaw,
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
  color: #fff;
  border-radius: 50px;
}

.table-container {
  overflow-y: auto;
  max-height: 400px;
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
