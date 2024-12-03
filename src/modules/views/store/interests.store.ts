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
        console.log("Iniciando fetchAllLaws, página:", page);

        const response = await reserApi.get<ApiResponse>(
          `/law?page=${page}&limit=${this.limit}`
        );
        console.log("Respuesta de la API:", response.data);

        if (response.data && Array.isArray(response.data.laws)) {
          this.laws = response.data.laws;

          this.interests = response.data.laws.flatMap((law) =>
            law.interests.map((interest) => ({
              ...interest,
              lawId: law.id,
              selected: false, // Inicializamos como no seleccionado
            }))
          );

          this.total = typeof response.data.total === "number" ? response.data.total : 0;

          console.log("Leyes guardadas:", this.laws);
          console.log("Intereses procesados:", this.interests);
        } else {
          console.warn("Respuesta de la API no contiene datos válidos.");
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

      console.log("Estado final del store:", {
        laws: this.laws,
        interests: this.interests,
        total: this.total,
      });
    },

    // Acción para asignar leyes a una empresa
    async assignLawsToCompany(companyId: string, lawIds: string[]) {
      try {
        console.log("Iniciando asignación de leyes, Company ID:", companyId, "Law IDs:", lawIds);

        const response = await reserApi.post(`/company/${companyId}/assign-laws`, { lawIds });

        if (response && response.data) {
          console.log("Leyes asignadas correctamente:", response.data);

          // Guardar leyes asignadas en el estado
          this.assignedLaws = response.data.laws || [];
          return true; // Indica éxito
        } else {
          console.error("Respuesta inválida del backend al asignar leyes:", response);
          return false; // Indica fallo
        }
      } catch (error) {
        console.error("Error al asignar leyes:", error);
        return false; // Indica fallo
      }
    },

    // Acción para obtener las leyes asignadas a una empresa
    async fetchAssignedLaws(companyId: string) {
      try {
        console.log("Iniciando fetchAssignedLaws para la empresa con ID:", companyId);

        const response = await reserApi.get(`/company/${companyId}`);
        if (response && response.data && Array.isArray(response.data.laws)) {
          console.log("Leyes asignadas recuperadas:", response.data.laws);

          // Guardar las leyes asignadas en el estado
          this.assignedLaws = response.data.laws;
        } else {
          console.warn("No se encontraron leyes asignadas para esta empresa.");
          this.assignedLaws = [];
        }
      } catch (error) {
        console.error("Error al obtener las leyes asignadas:", error);
        this.assignedLaws = [];
      }
    },

    // Alterna la selección de un interés
    toggleInterestSelection(interestId: string) {
      const interest = this.interests.find((i) => i.id === interestId);
      if (interest) {
        interest.selected = !interest.selected; // Alterna el estado seleccionado
        console.log("Intereses seleccionados:", this.selectedInterests());
      }
    },

    // Devuelve los intereses seleccionados
    selectedInterests() {
      return this.interests.filter((interest) => interest.selected); // Retorna solo los intereses seleccionados
    },
  },
});
