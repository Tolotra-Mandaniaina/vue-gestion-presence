=<template>
  <nav class="bg-white text-black p-4 mt-3 ml-3 mr-3 shadow-lg">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo -->
      <RouterLink to="/" class="text-xl font-bold">GRH</RouterLink>

      <!-- Menu -->
      <ul class="flex space-x-4">
        <li>
          <RouterLink to="/" class="hover:text-blue-600 font-bold">Accueil</RouterLink>
        </li>
        <li>
          <RouterLink to="/activite" class="hover:text-blue-600 font-bold">Gestion des activités</RouterLink>
        </li>
      </ul>
    
      <!-- Bouton de déconnexion -->
      <button
        class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        @click="logout"
      >
        Déconnexion
      </button>
    </div>
  </nav>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterLink, useRouter } from "vue-router";
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const { user, loading, error } = storeToRefs(userStore)

const router = useRouter();

// Appeler fetchUser pour récupérer les informations utilisateur
onMounted(() => {
  console.log("Appel à fetchUser pour récupérer l'utilisateur...");

  userStore.fetchUser()
})

// Fonction de déconnexion
const logout = () => {
  // Supprimer le token du localStorage
  localStorage.removeItem('token');

  // Rediriger vers la page de connexion ou la page d'accueil
  router.push('/login'); // ou router.push('/') si vous voulez rediriger vers l'accueil
};
</script>


<style scoped>
/* Vous pouvez ajouter des styles spécifiques ici */
</style>
