<template>
  <div class="min-h-[calc(100vh-4rem)] bg-gray-50 pt-20">
    <div class="container mx-auto px-4 py-8 flex flex-col gap-6">
      <!-- Cabecera -->
      <div class="flex justify-center items-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900">Mi Matriz Legal</h1>
      </div>

      <!-- Menú de pestañas -->
      <div class="flex justify-center mb-8">
        <div class="flex rounded-full overflow-hidden bg-gray-300 w-full max-w-4xl overflow-x-auto">
          <router-link v-for="item in menuItems" :key="item.name" :to="item.path"
            class="tab-link flex-shrink-0 text-center py-4 px-6 whitespace-nowrap"
            :class="{ active: $route.path === item.path }">
            {{ item.name }}
          </router-link>
        </div>
      </div>

      <!-- Métricas -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 bg-white p-6 rounded-lg shadow-sm">
        <div class="metric-card flex items-center gap-4">
          <img :src="casaNormas" alt="Icono normas" class="w-10 h-10" />
          <div>
            <h2 class="text-3xl font-semibold text-primary">{{ totalLaws }}</h2>
            <p class="text-sm text-secondary">Total de normas aplicables</p>
          </div>
        </div>
        <div class="metric-card flex items-center gap-4">
          <img :src="reporteArticulos" alt="Icono artículos" class="w-10 h-10" />
          <div>
            <h2 class="text-3xl font-semibold text-primary">{{ totalArticles }}</h2>
            <p class="text-sm text-secondary">Total artículos aplicables</p>
          </div>
        </div>
        <div class="metric-card flex items-center gap-4">
          <img :src="reporteCalificados" alt="Icono artículos calificados" class="w-10 h-10" />
          <div>
            <h2 class="text-3xl font-semibold text-primary">{{ percentageQualified }}%</h2>
            <p class="text-sm text-secondary">Porcentaje de artículos calificados</p>
          </div>
        </div>
        <div class="metric-card flex items-center gap-4">
          <img :src="reporteCumplidos" alt="Icono artículos cumplidos" class="w-10 h-10" />
          <div>
            <h2 class="text-3xl font-semibold text-primary">{{ percentageCompleted }}%</h2>
            <p class="text-sm text-secondary">Porcentaje de artículos cumplidos</p>
          </div>
        </div>
        <div class="metric-card flex items-center gap-4">
          <img :src="reporteIntereses" alt="Icono intereses seleccionados" class="w-10 h-10" />
          <div>
            <h2 class="text-3xl font-semibold text-primary">{{ totalSelectedInterests }}</h2>
            <p class="text-sm text-secondary">Intereses seleccionados</p>
          </div>
        </div>
      </div>

      <!-- Tabla -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50 border-b">
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-700">Título</th>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-700">Tema</th>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-700">Tipo de Norma</th>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-700">Número</th>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-700">Año</th>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-700">Ente</th>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-700">Intereses Seleccionados</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="law in selectedLaws" :key="law.id" class="hover:bg-gray-50 transition-colors cursor-pointer"
                @click="navigateToLaw(law.id)">
                <td class="px-6 py-4 text-sm text-gray-900">{{ law.title }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ law.tema }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ law.tipo_norma }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ law.numero }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ law.año }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ law.ente }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  <ul class="space-y-1">
                    <li v-for="interest in law.interests.filter(i => i.selected)" :key="interest.name">
                      {{ interest.name }}
                    </li>
                  </ul>
                </td>
              </tr>
              <tr v-if="!selectedLaws.length">
                <td colspan="7" class="px-6 py-4 text-center text-sm text-gray-500">
                  No hay normas seleccionadas.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
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
  font-weight: 500;
  color: #374151;
  transition: background-color 0.3s, color 0.3s;
}

.tab-link:hover {
  background-color: #e5e7eb;
}

.tab-link.active {
  background-color: #111827;
  color: white;
  border-radius: 9999px;
}

.text-primary {
  color: #111827;
}

.text-secondary {
  color: #4B5563;
}
</style>