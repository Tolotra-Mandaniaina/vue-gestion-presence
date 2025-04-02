<template>
    <div class="auth-container">
      <h2>Inscription</h2>
      <form @submit.prevent="register">
        <div>
          <label for="name">Nom</label>
          <input type="text" v-model="form.name" required />
        </div>
        <div>
          <label for="email">Email</label>
          <input type="email" v-model="form.email" required />
        </div>
        <div>
          <label for="password">Mot de passe</label>
          <input type="password" v-model="form.password" required />
        </div>
        <div>
          <label for="password_confirmation">Confirmer le mot de passe</label>
          <input type="password" v-model="form.password_confirmation" required />
        </div>
        <button type="submit">S'inscrire</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import axios from '@/services/axios';
  
  export default {
    data() {
      return {
        form: {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
        },
        error: null,
      };
    },
    methods: {
      async register() {
        try {
          const response = await axios.post('/register', this.form);
          localStorage.setItem('token', response.data.token); // Sauvegarder le token dans le localStorage
          this.$router.push('/dashboard'); // Rediriger vers le dashboard après l'inscription
        } catch (err) {
          this.error = err.response?.data?.message || 'Une erreur est survenue';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .auth-container {
    max-width: 400px;
    margin: 0 auto;
  }
  
  .error {
    color: red;
  }
  </style>
  