import { defineStore } from "pinia";
import { reserApi } from "@/api/reserApi";
import type { ApiResponse, Interest, Law } from "@/modules/views/store/interest.interfaces";

export const useInterestStore = defineStore("interest", {
  state: () => ({
    interests: [] as Interest[], // Aquí guardaremos los intereses procesados
    laws: [] as Law[], // Guardamos las leyes completas
    assignedLaws: [] as Law[], // Guardamos las leyes asignadas a una empresa
    total: 0,
    limit: 50,
  }),

  actions: {
    // Acción para obtener todas las leyes desde la API
    async fetchAllLaws(page = 1) {
      try {
        const response = await reserApi.get<ApiResponse>(
          `/law?page=${page}&limit=${this.limit}`
        );

        if (response.data && Array.isArray(response.data.laws)) {
          this.laws = response.data.laws;

          // Procesar intereses
          this.interests = response.data.laws.flatMap((law) =>
            law.interests.map((interest) => ({
              ...interest,
              lawId: law.id,
              selected: false, // Inicializamos como no seleccionado
            }))
          );

          this.total = response.data.total || 0;
        } else {
          console.warn("Respuesta inválida: No contiene leyes válidas.");
          this.laws = [];
          this.interests = [];
          this.total = 0;
        }
      } catch (error) {
        console.error("Error al obtener las leyes:", error);
        this.laws = [];
        this.interests = [];
        this.total = 0;
      }
    },

    // Acción para asignar leyes a una empresa
    async assignLawsToCompany(companyId: string, lawIds: string[]) {
      try {
        const response = await reserApi.post(`/company/${companyId}/assign-laws`, { lawIds });

        if (response && response.data) {
          this.assignedLaws = response.data.laws || [];
          this.syncSelectedInterests(); // Sincroniza los intereses seleccionados
          return true;
        } else {
          console.error("Error en la respuesta al asignar leyes.");
          return false;
        }
      } catch (error) {
        console.error("Error al asignar leyes:", error);
        return false;
      }
    },

    // Acción para obtener las leyes asignadas a una empresa
    async fetchAssignedLaws(companyId: string) {
      try {
        const response = await reserApi.get(`/company/${companyId}`);
        if (response && response.data && Array.isArray(response.data.laws)) {
          this.assignedLaws = response.data.laws.map((law: Law) => ({
            ...law,
            interests: law.interests.map((interest: Interest) => ({
              ...interest,
              selected: true, // Marcamos los intereses como seleccionados
            })),
          }));
          this.syncSelectedInterests(); // Sincroniza los intereses seleccionados
        } else {
          console.warn("No se encontraron leyes asignadas para la empresa.");
          this.assignedLaws = [];
        }
      } catch (error) {
        console.error("Error al obtener las leyes asignadas:", error);
        this.assignedLaws = [];
      }
    },

    // Sincroniza los intereses seleccionados con las leyes asignadas
    syncSelectedInterests() {
      this.interests.forEach((interest) => {
        const isAssigned = this.assignedLaws.some((law) =>
          law.interests.some(
            (assignedInterest) =>
              assignedInterest.name === interest.name && interest.lawId === law.id
          )
        );
        interest.selected = isAssigned; // Sincroniza el estado seleccionado
      });
    },

    // Alterna la selección de un interés
    toggleInterestSelection(interestId: string) {
      const interest = this.interests.find((i) => i.id === interestId);
      if (interest) {
        interest.selected = !interest.selected;
        console.log("Intereses actualizados:", this.selectedInterests());
      }
    },

    // Devuelve los intereses seleccionados
    selectedInterests() {
      return this.interests.filter((interest) => interest.selected);
    },
  },
});
