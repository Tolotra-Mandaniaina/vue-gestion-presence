<template>
    <div class="container mx-auto p-6" shadow-md>
      <h3 class="text-xl font-bold mb-6">Fiche de présence : </h3>
      
      <div v-if="loading" class="flex justify-center items-center text-xl text-gray-500">Chargement...</div>
      
      <div v-if="error" class="text-red-500 text-center">
        <p>Une erreur s'est produite lors du chargement des données.</p>
      </div>
      
      <div v-if="!loading && personnes.length > 0" class="overflow-x-auto">
        <table class="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-100">
              <th class="px-4 py-2 border border-gray-300 text-left font-semibold">Nom</th>
              <th class="px-4 py-2 border border-gray-300 text-left font-semibold">Âge</th>
              <th class="px-4 py-2 border border-gray-300 text-left font-semibold">Téléphone</th>
              <th class="px-4 py-2 border border-gray-300 text-left font-semibold">PSH</th>
              <th class="px-4 py-2 border border-gray-300 text-left font-semibold">Fonction</th>
              <th class="px-4 py-2 border border-gray-300 text-left font-semibold">Organisation</th>
              <th class="px-4 py-2 border border-gray-300 text-left font-semibold">Région</th>
              <th class="px-4 py-2 border border-gray-300 text-left font-semibold">District</th>
              <th class="px-4 py-2 border border-gray-300 text-left font-semibold">Commune</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="personne in personnes" :key="personne.id">
              <td class="px-4 py-2 border border-gray-300">{{ personne.nom }}</td>
              <td class="px-4 py-2 border border-gray-300">{{ personne.age }}</td>
              <td class="px-4 py-2 border border-gray-300">{{ personne.tel }}</td>
              <td class="px-4 py-2 border border-gray-300">
                {{ personne.psh === 1 ? 'Oui' : 'Non' }}
                </td>
              <td class="px-4 py-2 border border-gray-300">{{ personne.fonction_fiche }}</td>
              <td class="px-4 py-2 border border-gray-300">{{ personne.organisation }}</td>

              <td class="px-4 py-2 border border-gray-300">{{ personne.region }}</td>
              <td class="px-4 py-2 border border-gray-300">{{ personne.district }}</td>
              <td class="px-4 py-2 border border-gray-300">{{ personne.commune }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-else class="text-center text-gray-600">
        <p>Aucune personne trouvée pour cette activité.</p>
      </div>
    </div>
</template>
  
  <script>
  import { ref, watch } from 'vue';
  import axios from 'axios'; // ✅ Ajout de l'import d'axios
  
  import { usePersonneStore } from '@/stores/usePersonneStore';


  export default {
    props: {
        activityId: {
            type: String,
            required: true,
        },
        key: {
            type: [String, Number],  // Vous pouvez définir le type comme String ou Number si vous attendez une clé
            required: true,
        },
    },


      watch: {
    key(newKey, oldKey) {
      // Logique de rechargement si nécessaire (par exemple, récupérer de nouvelles données)
      console.log(`Le composant PersonneActivite a été rechargé avec la nouvelle clé : ${newKey}`);
    }
  },
  
    setup(props) {
      const personnes = ref([]);
      const loading = ref(false);
      const error = ref(null);
  
      // Fonction pour récupérer les personnes associées à une activité
      const fetchPersonnes = async () => {
        if (!props.activityId) return;
  
        loading.value = true;
        error.value = null;
  
        try {
          console.log("🔍 Chargement des personnes pour l'activité :", props.activityId);
          const response = await axios.get(`http://127.0.0.1:8000/api/personnes/activite/${props.activityId}`);
          personnes.value = response.data.personnes;
          console.log("📋 Liste des personnes :", personnes.value);
        } catch (err) {
          error.value = err.response?.data?.message || err.message || "Erreur lors du chargement des personnes";
          console.error("❌ Erreur lors du chargement des personnes:", err);
        } finally {
          loading.value = false;
        }
      };
  
      // Surveiller les changements d'ID d'activité
      watch(
        () => props.activityId,
        (newId) => {
          if (newId) {
            fetchPersonnes();
          }
        },
        { immediate: true }
      );
  
      return {
        personnes,
        loading,
        error,
      };
    },
  };
  </script>
  
  
  <style scoped>
  /* Aucune règle CSS supplémentaire, tout est pris en charge par Tailwind */
  </style>
  