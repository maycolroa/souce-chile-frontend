<template>
  <div class="flex h-[calc(100vh-4rem)] mt-16">
    <div @mouseover="expandSidebar" @mouseleave="collapseSidebar"
      class="bg-[#213741] text-white transition-all duration-300 h-full fixed z-40"
      :class="[isExpanded ? 'w-64' : 'w-20']">
      <div class="flex flex-col h-full">
        <nav class="flex-grow mt-10">
          <ul class="flex flex-col space-y-2">
            <li v-for="item in menuItems" :key="item.name">
              <router-link :to="item.path"
                class="flex items-center px-6 py-3 text-gray-300 hover:bg-[#0E1A22] hover:text-white transition-colors duration-200"
                :class="{ 'justify-center': !isExpanded }">
                <i :class="[item.icon, 'text-2xl']"></i>
                <span v-if="isExpanded" class="ml-4 whitespace-nowrap transition-opacity duration-200">
                  {{ item.name }}
                </span>
              </router-link>
            </li>
          </ul>
        </nav>

        <div class="mt-auto mb-4">
          <router-link to="/configuraciones"
            class="flex items-center px-6 py-3 text-gray-300 hover:bg-[#0E1A22] hover:text-white transition-colors duration-200"
            :class="{ 'justify-center': !isExpanded }">
            <i class="fas fa-cog text-2xl"></i>
            <span v-if="isExpanded" class="ml-4 whitespace-nowrap transition-opacity duration-200">
              Configuraciones
            </span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Espaciador para el contenido principal -->
    <div :class="[isExpanded ? 'w-64' : 'w-20']" aria-hidden="true"></div>

    <!-- Contenido principal -->
    <div class="flex-1 overflow-auto">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'SidebarMenu',
  setup() {
    const isExpanded = ref(false);
    const menuItems = [
      { name: 'Home', icon: 'fas fa-home', path: '/' },
      { name: 'Buscar', icon: 'fas fa-search', path: '/buscar' },
      { name: 'Matriz legal', icon: 'fas fa-balance-scale', path: '/matriz-legal' },
    ];

    const expandSidebar = () => {
      isExpanded.value = true;
    };

    const collapseSidebar = () => {
      isExpanded.value = false;
    };

    return {
      isExpanded,
      menuItems,
      expandSidebar,
      collapseSidebar,
    };
  },
});
</script>

<style scoped>
.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}

.mt-10 {
  margin-top: 2.5rem;
}
</style>