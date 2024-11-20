import { defineStore } from 'pinia';
import { reserApi } from '@/api/reserApi';

export const useInterestStore = defineStore('interest', {
  state: () => ({
    interests: [] as { id: string; name: string }[],
    selectedInterests: [] as { id: string; name: string }[],
    total: 0,
    limit: 50,
  }),

  actions: {
    // Nueva acción para obtener todas las leyes con paginación y filtro
    async fetchAllLaws(page = 1, searchTerm = '') {
      try {
        const response = await reserApi.get(`/law?page=${page}&limit=${this.limit}&search=${encodeURIComponent(searchTerm)}`);
        this.interests = response.data.laws || [];
        this.total = response.data.total || 0;
      } catch (error) {
        console.error('Error fetching laws:', error);
      }
    },

    async fetchInterests(interest: string) {
      try {
        const response = await reserApi.get(`/law/interest/${encodeURIComponent(interest)}`);
        this.interests = response.data || [];
      } catch (error) {
        console.error('Error fetching interests:', error);
      }
    },

    toggleInterest(interest: { id: string; name: string }) {
      const index = this.selectedInterests.findIndex(i => i.id === interest.id);
      if (index === -1) {
        this.selectedInterests.push(interest);
      } else {
        this.selectedInterests.splice(index, 1);
      }
    },

    selectAllInterests(selectAll: boolean) {
      if (selectAll) {
        this.selectedInterests = [...this.interests];
      } else {
        this.selectedInterests = [];
      }
    }
  },

  getters: {
    areAllSelected: (state) => state.selectedInterests.length === state.interests.length && state.interests.length > 0,
  }
});
