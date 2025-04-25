import { defineStore } from 'pinia'
import axios from '@/services/axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    loading: false,
    error: null
  }),

  actions: {
    async fetchUser() {
      this.loading = true
      this.error = null

      try {
        const response = await axios.get("/user");
        console.log("Utilisateur récupéré :", response.data);

        this.user = response.data
      } catch (error) {
        this.error = error.response?.data?.message || error.message
      } finally {
        this.loading = false
      }
    },
    logout() {
        this.user = null;  // Réinitialise l'utilisateur
        this.error = null; // Réinitialise l'erreur
      }
  }
})
