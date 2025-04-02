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
          class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Se connecter
        </button>

        <p v-if="error" class="mt-4 text-center text-red-500 text-sm">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '@/services/axios';

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('/login', this.form);
        localStorage.setItem('token', response.data.token); // Sauvegarder le token dans le localStorage
        this.$router.push('/activite'); // Rediriger vers le dashboard après la connexion
      } catch (err) {
        this.error = err.response?.data?.message || 'Une erreur est survenue';
      }
    }
  }
};
</script>

<style scoped>
/* Aucun style supplémentaire nécessaire, car Tailwind gère toute la mise en page */
</style>
