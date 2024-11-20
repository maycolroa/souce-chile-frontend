<template>
  <div class="visualizador-container mx-auto bg-gray-100 min-h-screen h-screen flex flex-col">
    <!-- Encabezado -->
    <div class="flex items-center mb-8 p-11">
      <h1 class="text-5xl font-bold text-primary mr-4">Ley 100</h1>
      <span class="text-2xl text-gray-400">👁️</span>
    </div>

    <!-- Métricas -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 p-0">
      <div class="metric-card flex items-center justify-center bg-white p-6 rounded-lg shadow-md space-x-4">
        <img :src="casaNormas" alt="Icono normas" class="icon-style" />
        <div class="text-center">
          <h2 class="text-4xl font-semibold text-primary">6</h2>
          <p class="text-secondary">Total artículos aplicables</p>
        </div>
      </div>
      <div class="metric-card flex items-center justify-center bg-white p-6 rounded-lg shadow-md space-x-4">
        <img :src="reporteArticulos" alt="Icono artículos" class="icon-style" />
        <div class="text-center">
          <h2 class="text-4xl font-semibold text-primary">5%</h2>
          <p class="text-secondary">Porcentaje de artículos calificados</p>
        </div>
      </div>
      <div class="metric-card flex items-center justify-center bg-white p-6 rounded-lg shadow-md space-x-4">
        <img :src="porcentajeArticulos" alt="Icono porcentaje cumplido" class="icon-style" />
        <div class="text-center">
          <h2 class="text-4xl font-semibold text-primary">60%</h2>
          <p class="text-secondary">Porcentaje de artículos cumplidos</p>
        </div>
      </div>
    </div>

    <!-- Filtros y búsqueda -->
    <div class="flex items-center space-x-4 mb-4 px-6">
      <button class="filter-btn">Artículos</button>
      <button class="filter-btn">Calificación</button>
      <button class="filter-btn">Derogado</button>
      <button class="filter-btn">Intereses</button>
      <input type="text" placeholder="Buscar Artículo" class="search-input" />
    </div>
    <p class="text-gray-500 text-sm mb-6 px-6">IMPORTANTE: Si tiene un filtro aplicado sobre los artículos, se aplicará
      la evaluación solo en los artículos filtrados.</p>

    <!-- Contenido principal con scroll interno -->
    <div class="content-container bg-white p-6 rounded-lg shadow-md flex-grow overflow-auto">
      <!-- Lista de Artículos -->
      <div class="article-card mb-4 p-4 rounded-lg bg-teal-100">
        <h3 class="text-xl font-bold text-primary">Artículo 19:</h3>
        <p class="text-gray-700 mb-2">
          A raíz de la expedición del Decreto No. 1609 del 31/07/2002 "Por el cual se reglamenta el manejo y
          transporte terrestre automotor de mercancías peligrosas por carretera" y en especial lo señalado en...
        </p>
        <p class="text-sm text-gray-500">
          Última modificación: 2024-10-30 16:33:28<br />
          Derogado: Sí<br />
          Intereses: SECTOR TRANSPORTE, TRANSPORTE DE MERCANCÍAS PELIGROSAS
        </p>
      </div>

      <!-- Formulario de Evaluación -->
      <div class="evaluation-form mt-8">
        <h4 class="text-lg font-semibold mb-4">Evaluación del artículo 19</h4>
        <div class="flex flex-wrap gap-4 mb-4">
          <button class="evaluation-btn">Sin calificar</button>
          <button class="evaluation-btn">Cumple</button>
          <button class="evaluation-btn">No Cumple</button>
          <button class="evaluation-btn">En estudio</button>
          <button class="evaluation-btn">Parcial</button>
          <button class="evaluation-btn">No Aplica</button>
          <button class="evaluation-btn">Informativo</button>
          <button class="evaluation-btn">No vigente</button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-gray-700">Centro de trabajo</label>
            <input type="text" class="input-field" />
          </div>
          <div>
            <label class="block text-gray-700">Responsable</label>
            <input type="text" class="input-field" />
          </div>
          <div class="sm:col-span-2">
            <label class="block text-gray-700">Observaciones</label>
            <input type="text" class="input-field" />
          </div>
          <div class="sm:col-span-2">
            <label class="block text-gray-700">Archivo (*.pdf)</label>
            <input type="file" class="input-field" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import casaNormas from '@/assets/casaNormas.png';
import reporteArticulos from '@/assets/reporteArticulos.png';
import medalla from '@/assets/medalla.png';
import porcentajeArticulos from '@/assets/porcentajeArticulos.png';

export default {
  name: 'VisualizadorGeneral',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      casaNormas,
      reporteArticulos,
      medalla,
      porcentajeArticulos,
    };
  },
};
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
