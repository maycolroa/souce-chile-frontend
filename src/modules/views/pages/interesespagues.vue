<template>
  <div class="container mx-auto p-20 bg-white h-screen overflow-hidden">
    <!-- Barra de filtros con checks -->
    <div class="filter-bar flex justify-center items-center rounded-full p-1 mb-8 bg-white">
      <button v-for="filter in filters" :key="filter.label" @click="toggleFilter(filter)"
        :class="['filter-item', { 'active': filter.active }]">
        {{ filter.label }}
        <i v-if="filter.active" class="fas fa-check ml-2"></i>
      </button>
    </div>

    <!-- Cabecera -->
    <div class="flex justify-center items-center mb-5">
      <h1 class="text-4xl font-bold mt-8">Mi Matriz Legal</h1>
    </div>

    <!-- Métricas con íconos y estilos personalizados -->
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8 bg-white p-4 rounded-lg shadow-md">
      <div class="metric-card flex items-center space-x-4">
        <img :src="casaNormas" alt="Icono normas" class="icon-style" />
        <div class="text-left">
          <h2 class="text-4xl font-semibold text-primary">450</h2>
          <p class="text-secondary">Total de normas aplicables</p>
        </div>
      </div>
      <div class="metric-card flex items-center space-x-4">
        <img :src="reporteArticulos" alt="Icono artículos" class="icon-style" />
        <div class="text-left">
          <h2 class="text-4xl font-semibold text-primary">23,456</h2>
          <p class="text-secondary">Total artículos aplicables</p>
        </div>
      </div>
      <div class="metric-card flex items-center space-x-4">
        <img :src="medalla" alt="Icono porcentaje calificado" class="icon-style" />
        <div class="text-left">
          <h2 class="text-4xl font-semibold text-primary">20%</h2>
          <p class="text-secondary">Porcentaje de artículos calificados</p>
        </div>
      </div>
      <div class="metric-card flex items-center space-x-4">
        <img :src="porcentajeArticulos" alt="Icono artículos cumplidos" class="icon-style" />
        <div class="text-left">
          <h2 class="text-4xl font-semibold text-primary">60%</h2>
          <p class="text-secondary">Porcentaje de artículos cumplidos</p>
        </div>
      </div>
    </div>

    <!-- Tabla con encabezado amarillo -->
    <div class="table-container bg-white rounded-lg shadow-md">
      <table class="table-auto w-full">
        <thead>
          <tr class="table-header">
            <th class="p-4">Tipo Norma</th>
            <th class="p-4">Número</th>
            <th class="p-4">Año</th>
            <th class="p-4">Descripción</th>
            <th class="p-4">Ente</th>
            <th class="p-4">Sistema</th>
            <th class="p-4">Derogada</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableData" :key="index" class="hover:bg-gray-100 cursor-pointer"
            @click="navigateToVisualizador(row)">
            <td class="p-4">{{ row.tipoNorma }}</td>
            <td class="p-4">{{ row.numero }}</td>
            <td class="p-4">{{ row.ano }}</td>
            <td class="p-4">{{ row.descripcion }}</td>
            <td class="p-4">{{ row.ente }}</td>
            <td class="p-4">{{ row.sistema }}</td>
            <td class="p-4">{{ row.derogada }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'; // Importa useRouter
import casaNormas from '@/assets/casaNormas.png';
import reporteArticulos from '@/assets/reporteArticulos.png';
import medalla from '@/assets/medalla.png';
import porcentajeArticulos from '@/assets/porcentajeArticulos.png';

export default {
  name: 'InteresesPages',
  setup() {
    const router = useRouter(); // Obtiene el enrutador

    const filters = [
      { label: 'Tipo Norma', active: false },
      { label: 'Número', active: false },
      { label: 'Año', active: false },
      { label: 'Descripción', active: false },
      { label: 'Tema ambiental', active: false },
      { label: 'Tema SST', active: false },
      { label: 'Ente', active: false },
      { label: 'Sistema', active: false },
      { label: 'Derogada', active: false },
    ];

    const navigateToVisualizador = (row) => {
      router.push({ name: 'VisualizadorGeneral', params: { id: row.numero } });
    };

    const toggleFilter = (filter) => {
      filter.active = !filter.active;
    };

    const tableData = [
      { tipoNorma: 'Decreto', numero: '1023', ano: '2023', descripcion: 'Por el cual se adiciona la subsección', ente: 'Ministerio de Salud', sistema: 'Nacional', derogada: 'No' },
      { tipoNorma: 'Ley', numero: '1031', ano: '2024', descripcion: 'Por el cual se adiciona la subsección', ente: 'Ministerio de Ambiente', sistema: 'Regional', derogada: 'Sí' },
      { tipoNorma: 'Resolución', numero: '130', ano: '2021', descripcion: 'Por el cual se adiciona la subsección', ente: 'Gobernación', sistema: 'Local', derogada: 'No' },
    ];

    return {
      filters,
      tableData,
      casaNormas,
      reporteArticulos,
      medalla,
      porcentajeArticulos,
      toggleFilter,
      navigateToVisualizador,
    };
  }
};
</script>

<style scoped>
/* Asegura que la página y el contenedor no tengan scroll y ocupen toda la altura de la pantalla */
html,
body {
  height: 100%;
  margin: 0;
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  height: 100vh;
  overflow-y: hidden;
}

.table-container {
  overflow-y: auto;
  max-height: calc(100vh - 300px);
}

.filter-bar {
  background-color: white;
}

.filter-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background-color: transparent;
  color: #6b7280;
  font-weight: 600;
  transition: background-color 0.3s, color 0.3s;
}

.filter-item.active,
.filter-item:hover {
  background-color: #20485a;
  color: white;
}

.icon-style {
  width: 48px;
  height: 48px;
  background-color: #e0e0e0;
  padding: 8px;
  border-radius: 50%;
}

.text-primary {
  color: #20485a;
}

.text-secondary {
  color: #8a8a8a;
  font-size: 0.875rem;
}

.table-container {
  overflow-x: auto;
}

.table-header {
  background-color: #fef08a !important;
  color: #000 !important;
}

.table-auto th,
.table-auto td {
  padding: 1rem;
  text-align: left;
}

.table-auto tbody tr:hover {
  background-color: #f9f9f9;
}
</style>
