<template>
  <div class="h-screen w-screen flex bg-gray-50 mt-2">
    <!-- Formulaire d'ajout de personne (1/4) -->
    <div class="w-1/4 min-h-[85vh] bg-white  rounded-lg p-6 flex flex-col">
      <PersonneCreate 
        @personne-creee="handlePersonneCree" 
        :refreshKey="componentKey" 
        @formSubmitted="reloadPersonneActivite"
      />


    </div>

    <!-- Activité + Personnes assignées (3/4) -->
    <div class="w-3/4 min-h-[85vh] bg-white shadow-lg rounded-lg p-8 flex flex-col overflow-y-auto mx-4">
      <h2 class="text-2xl font-semibold text-gray-800">{{ activite.nom }}</h2>

      <p class="text-gray-600 mt-2">{{ activite.description }}</p>
      <div v-if="activityId" class="mt-6 flex-grow">
        <PersonneActivite :key="componentKey" :activityId="activityId"/>
      </div>
    </div>
  </div>


</template>
  
  <script>
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  import PersonneCreate from '@/components/PersonneCreate.vue';
  import PersonneActivite from '@/components/PersonneActivite.vue';

  export default {
    components: {
      PersonneCreate,
      PersonneActivite,
    },

    data() {
    return {
        componentKey: 0, // La clé du composant PersonneActivite
        };
    },
    methods: {
    reloadPersonneActivite() {
      // Lorsque le formulaire est soumis, on incrémente la clé pour forcer le rechargement du composant PersonneActivite
      this.componentKey += 1;
      console.log("Nouvelle clé du composant PersonneActivite :", this.componentKey);
    }
  },
  
    setup() {
      const route = useRoute();
      const activite = ref(null);
      const activityId = ref(null);
      const loading = ref(true);
      const error = ref(null);

   
     
   

      // Watch pour récupérer l'ID de l'activité depuis l'URL
      watch(
        () => route.params.id,
        async (newId) => {
          if (newId) {
            activityId.value = String(newId);
            console.log("ID de l'activité mis à jour :", activityId.value);
            
            // Charger les détails de l'activité
            try {
              loading.value = true;
              const response = await axios.get(`http://127.0.0.1:8000/api/activites/${activityId.value}`);
              console.log("Données de l'activité :", response.data);
              activite.value = response.data.activite || response.data;
            } catch (err) {
              error.value = err.response?.data?.message || err.message || "Erreur lors du chargement de l'activité";
              console.error("Erreur API:", err);
            } finally {
              loading.value = false;
            }
          } else {
            console.error("ID d'activité non défini dans la route.");
          }
        },
        { immediate: true }
      );
  
      // Méthodes
      const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
      };
  
      const handlePersonneCree = (personne) => {
        console.log("📥 Personne reçue dans FichePresence.vue :", personne);
        assignerPersonne(personne);
      };
  
      const assignerPersonne = async (personne) => {
        console.log("Assignation en cours pour :", personne);
  
        if (!activite.value || !activite.value.id) {
          console.error("Erreur : l'activité n'est pas chargée.");
          return;
        }
  
        if (!personne || !personne.id) {
          console.error("Erreur : la personne créée n'a pas d'ID.");
          return;
        }
  
        try {
          const payload = {
            personnes: [personne.id],
            est_present: true,
          };
          console.log("Données envoyées à l'API :", payload);
  
          const response = await axios.post(
            `http://127.0.0.1:8000/api/activites/${activite.value.id}/presences`,
            payload
          );
          console.log("Personne assignée avec succès :", response.data);

         

        } catch (error) {
          console.error("Erreur lors de l'assignation :", error.response?.data || error);
        }
      };

      
  
      return {
        activite,
        activityId,
        loading,
        error,


        formatDate,
        handlePersonneCree,
        assignerPersonne,
        
      };
    },
  };
  </script>
  