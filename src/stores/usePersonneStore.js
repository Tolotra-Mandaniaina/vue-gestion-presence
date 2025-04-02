// src/stores/usePersonneStore.js
import { ref } from 'vue';
import axios from 'axios';

const personnes = ref([]);  // Stockage global de la liste

export function usePersonneStore() {
  const fetchPersonnes = async (activityId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/activites/${activityId}/personnes`);
      personnes.value = response.data;
    } catch (error) {
      console.error("Erreur de chargement :", error);
    }
  };

  const ajouterPersonne = async (activityId, personne) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/activites/${activityId}/presences`, { personnes: [personne.id] });
      await fetchPersonnes(activityId); // Mise à jour auto après ajout
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  };

  return { personnes, fetchPersonnes, ajouterPersonne };
}
