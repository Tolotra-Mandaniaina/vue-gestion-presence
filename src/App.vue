<template>
  <nav class="bg-white text-black shadow-lg px-4 py-3 mt-3 mx-3 rounded-lg">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo -->
      <RouterLink to="/" class="text-xl font-semibold text-blue-600 hover:text-blue-700 transition-colors">GRH</RouterLink>

      <!-- Menu de navigation -->
      <ul class="hidden sm:flex space-x-6">
        <li>
          <RouterLink to="/" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">Accueil</RouterLink>
        </li>
        <li>
          <RouterLink to="/activite" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">Gestion des activités</RouterLink>
        </li>
        <li>
          <RouterLink to="/about" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">Création Organisation</RouterLink>
        </li>
      </ul>

      <!-- Affichage utilisateur connecté -->
      <div class="flex items-center space-x-4">
        <div v-if="user" class="text-sm text-gray-700 flex items-center space-x-2">
          <span class="text-green-600">🟢</span>
          <span class="font-semibold text-blue-600">{{ user.name }}</span>
          
          <button
            class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors focus:outline-none"
            @click="logout"
          >
            Déconnexion
          </button>
       </div>

        <!-- Loading / Erreur / Message utilisateur non connecté -->
        <div v-else-if="loading" class="text-sm text-gray-500">Chargement...</div>
        <div v-else-if="error" class="text-sm text-red-600">🔴 Aucun utilisateur connecté</div>
      </div>
    </div>
  </nav>

  <RouterView />
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const { user, loading, error } = storeToRefs(userStore);

const router = useRouter();

// Appel de fetchUser pour récupérer les informations utilisateur lors de l'initialisation
onMounted(() => {
  console.log("Appel à fetchUser pour récupérer l'utilisateur...");
  userStore.fetchUser();
});

// Fonction de déconnexion
const logout = () => {
  userStore.logout(); // Réinitialise l'état de l'utilisateur
  localStorage.removeItem('token'); // Supprime le token du localStorage

  // Redirige vers la page de connexion après déconnexion
  if (router.currentRoute.value.path !== '/login') {
    router.push('/login');
  } else {
    // Forcer un refresh si déjà sur la page de login
    router.replace({ path: '/login', query: { refresh: Date.now() } });
  }
};
</script>

<style scoped>
/* Responsive design */
@media (max-width: 640px) {
  .sm\:flex {
    display: none;
  }
}

.container {
  max-width: 1200px;
}

nav {
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

nav a {
  font-weight: 500;
}

nav button {
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

nav button:hover {
  background-color: #e53e3e; /* Couleur rouge plus foncée */
}

nav .text-right {
  text-align: right;
}

.text-green-600 {
  color: #38a169;
}
</style>
