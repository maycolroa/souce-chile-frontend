<template>
  <div class="bg-white min-h-screen">
    <!-- Título con ícono de ojo -->
    <div class="p-20">
      <div class="flex items-center mb-6">
        <h1 class="text-3xl font-bold text-[#20485a]">{{ currentLaw?.title }}</h1>
        <button class="ml-2 text-gray-400">
          <span class="text-xl">👁️</span>
        </button>
      </div>

      <!-- Métricas en tarjetas -->
      <div class="grid grid-cols-3 gap-8 mb-8">
        <div class="flex items-center bg-white rounded-lg p-4 shadow-sm">
          <img :src="casaNormas" alt="Total artículos" class="w-8 h-8 mr-4" />
          <div>
            <div class="text-2xl font-bold text-[#20485a]">{{ currentLaw?.articles?.length || 0 }}</div>
            <div class="text-sm text-gray-500">Total artículos aplicables</div>
          </div>
        </div>
        <div class="flex items-center bg-white rounded-lg p-4 shadow-sm">
          <img :src="reporteArticulos" alt="Porcentaje calificados" class="w-8 h-8 mr-4" />
          <div>
            <div class="text-2xl font-bold text-[#20485a]">5%</div>
            <div class="text-sm text-gray-500">Porcentaje de artículos calificados</div>
          </div>
        </div>
        <div class="flex items-center bg-white rounded-lg p-4 shadow-sm">
          <img :src="porcentajeArticulos" alt="Porcentaje cumplidos" class="w-8 h-8 mr-4" />
          <div>
            <div class="text-2xl font-bold text-[#20485a]">60%</div>
            <div class="text-sm text-gray-500">Porcentaje de artículos cumplidos</div>
          </div>
        </div>
      </div>

      <!-- Filtros y búsqueda -->
      <div class="flex items-center gap-2 mb-4">
        <button class="px-4 py-2 bg-[#20485a] text-white rounded-full flex items-center gap-2 text-sm">
          Artículos
        </button>
        <button class="px-4 py-2 bg-[#20485a] text-white rounded-full flex items-center gap-2 text-sm">
          Calificación
        </button>
        <button class="px-4 py-2 bg-[#20485a] text-white rounded-full flex items-center gap-2 text-sm">
          Derogado
        </button>
        <button class="px-4 py-2 bg-[#20485a] text-white rounded-full flex items-center gap-2 text-sm">
          Intereses
        </button>
        <input type="text" placeholder="Buscar Artículo" class="flex-grow px-4 py-2 border rounded-full text-sm" />
      </div>

      <p class="text-sm text-gray-500 mb-6">
        IMPORTANTE: Si tiene un filtro aplicado sobre los artículos, se aplicará la evaluación solo en los artículos
        filtrados.
      </p>

      <!-- Lista de artículos con evaluación -->
      <div class="space-y-4">
        <div v-for="article in filteredArticles" :key="article.article" class="bg-[#E5F6F6] p-4 rounded-lg">
          <div class="mb-4">
            <h3 class="text-[#20485a] font-bold mb-2">Artículo {{ article.article }}:</h3>
            <p class="text-gray-700">{{ article.summary }}</p>
          </div>

          <!-- Formulario de evaluación -->
          <div class="mt-4">
            <h4 class="font-semibold mb-2">Evaluación del artículo {{ article.article }}</h4>
            <div class="flex flex-wrap gap-2 mb-4">
              <button class="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200">Sin calificar</button>
              <button class="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200">Cumple</button>
              <button class="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200">No Cumple</button>
              <button class="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200">En estudio</button>
              <button class="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200">Parcial</button>
              <button class="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200">No Aplica</button>
              <button class="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200">Informativo</button>
              <button class="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200">No vigente</button>
            </div>

            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm text-gray-600 mb-1">Centro de trabajo</label>
                <input type="text" class="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Responsable</label>
                <input type="text" class="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
            </div>

            <div class="mb-4">
              <label class="block text-sm text-gray-600 mb-1">Observaciones</label>
              <textarea class="w-full px-3 py-2 border rounded-lg text-sm" rows="3"></textarea>
            </div>

            <div>
              <label class="block text-sm text-gray-600 mb-1">Archivo (*.pdf)</label>
              <input type="file" class="w-full px-3 py-2 border rounded-lg text-sm" accept=".pdf" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useInterestStore } from '../store/interests.store';
import { useRoute } from 'vue-router';
import casaNormas from '@/assets/casaNormas.png';
import reporteArticulos from '@/assets/reporteArticulos.png';
import porcentajeArticulos from '@/assets/porcentajeArticulos.png';

export default defineComponent({
  name: 'VisualizadorGeneral',

  setup() {
    const interestStore = useInterestStore();
    const route = useRoute();
    const searchQuery = ref('');
    const activeFilters = ref([]);  // Removida la anotación de tipo
    const currentLaw = ref(null);   // Removida la anotación de tipo

    const filterOptions = ['Artículos', 'Intereses', 'Estado'];

    onMounted(async () => {
      const lawId = route.params.id;
      if (lawId) {
        try {
          const lawData = await interestStore.fetchLawDetails(lawId);
          currentLaw.value = lawData;
        } catch (error) {
          console.error('Error al cargar la ley:', error);
        }
      }
    });

    const filteredArticles = computed(() => {
      if (!currentLaw.value?.articles) return [];

      return currentLaw.value.articles.filter(article => {
        const matchesSearch = searchQuery.value === '' ||
          article.summary.toLowerCase().includes(searchQuery.value.toLowerCase());

        return matchesSearch;
      });
    });

    const toggleFilter = (filter) => {  // Removida la anotación de tipo
      const index = activeFilters.value.indexOf(filter);
      if (index === -1) {
        activeFilters.value.push(filter);
      } else {
        activeFilters.value.splice(index, 1);
      }
    };

    return {
      currentLaw,
      searchQuery,
      activeFilters,
      filterOptions,
      filteredArticles,
      toggleFilter,
      casaNormas,
      reporteArticulos,
      porcentajeArticulos,
    };
  },
});

</script>

<style scoped>
.visualizador-container {
  max-width: 1200px;
  margin: 0 auto;
  height: 100vh;
}

.text-primary {
  color: #20485a;
}

.text-secondary {
  color: #8a8a8a;
}

.icon-style {
  width: 48px;
  height: 48px;
}

.metric-card {
  border: 1px solid #e5e7eb;
}

.filter-btn {
  padding: 0.5rem 1rem;
  background-color: #20485a;
  color: white;
  border-radius: 9999px;
  font-weight: 600;
  cursor: pointer;
}

.filter-btn:hover {
  background-color: #1a3b4c;
}

.search-input {
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 9999px;
  flex-grow: 1;
  max-width: 200px;
}

.content-container {
  overflow-y: auto;
  max-height: calc(100vh - 240px);
  /* Ajusta este valor según el espacio que ocupan los elementos superiores */
}

.article-card {
  border-left: 4px solid #20485a;
}

.evaluation-btn {
  padding: 0.5rem 1rem;
  background-color: #e5e7eb;
  color: #333;
  border-radius: 9999px;
  font-weight: 600;
  cursor: pointer;
}

.evaluation-btn:hover {
  background-color: #cbd5e1;
}

.input-field {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  margin-top: 0.5rem;
}
</style>
