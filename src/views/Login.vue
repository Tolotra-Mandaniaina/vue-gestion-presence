<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">Connexion</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            v-model="form.email"
            required
            class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez votre email"
          />
        </div>

        <div class="mb-6">
          <label for="password" class="block text-gray-700 font-medium">Mot de passe</label>
          <input
            type="password"
            v-model="form.password"
            required
            class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez votre mot de passe"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg flex justify-center items-center hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <svg v-if="loading" class="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          <span>{{ loading ? 'Connexion...' : 'Se connecter' }}</span>
        </button>

        <p v-if="error" class="mt-4 text-center text-red-500 text-sm">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '@/services/axios';
import { useUserStore } from '@/stores/user'

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      error: null,
      loading: false,
    };
  },
  methods: {
    async login() {
      this.error = null;
      this.loading = true;
      try {
        const userStore = useUserStore() // 👈 instanciation ici

        await axios.get('https://safidy-observatoire.net/BO/public/sanctum/csrf-cookie'); // initialise la session (obligatoire)
        const response = await axios.post('/login', this.form);
        localStorage.setItem('token', response.data.token);

        // 🔁 Mettre à jour le store Pinia directement après login
        await userStore.fetchUser()

        this.$router.push('/activite');
      } catch (err) {
        this.error = err.response?.data?.message || 'Une erreur est survenue';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
/* Pas de styles supplémentaires nécessaires grâce à Tailwind */
</style>
