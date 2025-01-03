// stores/law.store.ts
import { defineStore } from 'pinia';
import axios from 'axios';
import type { Law, ArticleEvaluation, EvaluationStats } from '../store/law.interface';

export const useLawStore = defineStore('law', {
  state: () => ({
    currentLaw: null as Law | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchLawById(id: string) {
      this.loading = true;
      try {
        const response = await axios.get(`/api/law/${id}`);
        this.currentLaw = response.data;
      } catch (error) {
        this.error = 'Error al cargar la ley';
        console.error('Error:', error);
      } finally {
        this.loading = false;
      }
    },

    async updateArticleEvaluation(lawId: string, articleData: ArticleEvaluation) {
      try {
        const updateDto = {
          articles: [{
            article: articleData.article,
            evaluation: articleData.evaluation
          }]
        };
        const response = await axios.patch(`/api/law/${lawId}`, updateDto);
        
        if (this.currentLaw) {
          const articleIndex = this.currentLaw.articles.findIndex(
            a => a.article === articleData.article
          );
          if (articleIndex !== -1) {
            this.currentLaw.articles[articleIndex].evaluation = articleData.evaluation;
          }
        }
        return response.data;
      } catch (error) {
        this.error = 'Error al actualizar la evaluación';
        throw error;
      }
    },

    getEvaluationStats(): EvaluationStats {
      if (!this.currentLaw?.articles) {
        return { evaluatedPercentage: 0, compliantPercentage: 0 };
      }
      
      const total = this.currentLaw.articles.length;
      const evaluated = this.currentLaw.articles.filter(
        a => a.evaluation && a.evaluation !== 'Sin calificar'
      ).length;
      const compliant = this.currentLaw.articles.filter(
        a => a.evaluation === 'Cumple'
      ).length;

      return {
        evaluatedPercentage: Math.round((evaluated / total) * 100),
        compliantPercentage: Math.round((compliant / total) * 100)
      };
    }
  }
});
